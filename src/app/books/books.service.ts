import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Book } from './book.model';
import {environment} from '../../environments/environment.prod';
import {Http} from '@angular/http';
import {Headers} from '@angular/http';

@Injectable()
export class BooksService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '/'; // URL to web api
  private books: Book[] = [];
  private authorBooks: Book[] = [];

  booksChanged = new Subject<Book[]>();

  constructor(private http: Http) {}

  public getBooks(): Promise<Book[]> {
    console.log('books ophalen van server');
    return this.http.get(this.serverUrl + '/books', {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.books = response.json() as Book[];
        return response.json() as Book[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getBook(index: number) {
    return this.books[index];
  }



  addBook(book: Book): Promise<Book> {
    this.books.push(book);
    this.booksChanged.next(this.books.slice());

    console.log('Book toevoegen: ' + book.title);
    return this.http.post(this.serverUrl  + '/books',
      {
        title: book.title,
        length: book.length,
        language: book.language,
        isbn: book.isbn,
        imageURL: book.imageURL,
        author: {
          firstName: book.author.firstName,
          lastName: book.author.lastName,
          dateOfBirth: book.author.dateOfBirth,
          authorImageURL: book.author.authorImageURL
        },
        publisher: {
          name: book.publisher.name,
          abbreviation: book.publisher.abbreviation,
          location: book.publisher.location,
          kvkNumber: book.publisher.kvkNumber
        },
        headers: this.headers
      })
      .toPromise()
      .then(response => {
        console.log(response.json() as Book);
        return response.json() as Book;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateBook(index: number, newBook: Book): Promise<Book> {
    const title = this.books[index].title;

    this.books[index] = newBook;
    this.booksChanged.next(this.books.slice());

    console.log('Book updaten: ' + title);
    return this.http.put(this.serverUrl + '/books' + '/' + title, {
      title: newBook.title,
      length: newBook.length,
      language: newBook.language,
      isbn: newBook.isbn,
      imageURL: newBook.imageURL,
      author: {
        firstName: newBook.author.firstName,
        lastName: newBook.author.lastName,
        dateOfBirth: newBook.author.dateOfBirth,
        authorImageURL: newBook.author.authorImageURL
      },
      publisher: {
        name: newBook.publisher.name,
        abbreviation: newBook.publisher.abbreviation,
        location: newBook.publisher.location,
        kvkNumber: newBook.publisher.kvkNumber
      },
      headers: this.headers
    })
      .toPromise()
      .then(response => {
        return response.json() as Book;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  deleteBook(index: number): Promise<Book> {
    const bookToDelete = this.books[index];

    this.books.splice(index, 1);
    this.booksChanged.next(this.books.slice());

    console.log('Book verwijderen: ' + bookToDelete.title);
    return this.http.delete(this.serverUrl + '/books' + '/' + bookToDelete.title)
      .toPromise()
      .then(response => {
        return response.json() as Book;
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  public getAuthorBooks(index: number): Promise<Book[]> {
    console.log('' +
      'books ophalen van server');
    const firstName = this.books[index].author.firstName;
    console.log(firstName);
    return this.http.get(this.serverUrl + '/authors' + '/' + firstName, {headers: this.headers})
      .toPromise()
      .then(response => {
        console.dir(response.json());
        this.authorBooks = response.json() as Book[];
        return response.json() as Book[];
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
