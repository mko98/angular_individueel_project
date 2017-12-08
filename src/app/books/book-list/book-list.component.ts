import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Book } from '../book.model';
import {BooksService} from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  books: Book[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private booksService: BooksService
  ) { }


  ngOnInit() {
    this.booksService.getBooks()
      .then(books => this.books = books)
      .catch(error => console.log(error));
    this.subscription = this.booksService.booksChanged
      .subscribe(
        (books: Book[]) => {
          this.books = books;
        }
      );
  }

  onNewBook() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {

  }

}
