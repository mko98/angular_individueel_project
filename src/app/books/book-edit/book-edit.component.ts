import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import {BooksService} from '../books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookForm: FormGroup;
  bookAuthor: FormGroup;
  bookPublisher: FormGroup;

  constructor(private route: ActivatedRoute,
              private booksService: BooksService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    console.log(this.bookForm.value);
    if (this.editMode) {
      this.booksService.updateBook(this.id, this.bookForm.value);
    } else {
      this.booksService.addBook(this.bookForm.value);
    }
    this.onCancel();
  }


  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let bookTitle = '';
    let bookLength = 0;
    let bookLanguage = '';
    let bookImagePath = '';
    let bookIsbn = '';
    let bookAuthorFirstName = '';
    let bookAuthorLastName = '';
    let bookAuthorDateOfBirth = '';
    let bookAuthorImageURL = '';
    let bookPublisherName = '';
    let bookPublisherabbreviation = '';
    let bookPublisherlocation = '';
    let bookPublisherkvkNumber = '';

    if (this.editMode) {
      const book = this.booksService.getBook(this.id);
      bookTitle = book.title;
      bookImagePath = book.imageURL;
      bookLength = book.length;
      bookLanguage = book.language;
      bookIsbn = book.isbn;
      bookAuthorFirstName = book.author.firstName;
      bookAuthorLastName = book.author.lastName;
      bookAuthorDateOfBirth = book.author.dateOfBirth;
      bookAuthorImageURL = book.author.authorImageURL;
      bookPublisherName = book.publisher.name;
      bookPublisherabbreviation = book.publisher.abbreviation;
      bookPublisherlocation = book.publisher.location;
      bookPublisherkvkNumber = book.publisher.kvkNumber;
    }

    this.bookForm = new FormGroup({
      'title': new FormControl(bookTitle, Validators.required),
      'length': new FormControl(bookLength, Validators.required),
      'language': new FormControl(bookLanguage, Validators.required),
      'isbn': new FormControl(bookIsbn, Validators.required),
      'imageURL': new FormControl(bookImagePath, Validators.required),
      'author': this.bookAuthor = new FormGroup({
          'firstName': new FormControl(bookAuthorFirstName, Validators.required),
          'lastName': new FormControl(bookAuthorLastName, Validators.required),
          'dateOfBirth': new FormControl(bookAuthorDateOfBirth, Validators.required),
          'authorImageURL': new FormControl(bookAuthorImageURL, Validators.required)
        }),
      'publisher': this.bookPublisher = new FormGroup({
        'name': new FormControl(bookPublisherName, Validators.required),
        'abbreviation': new FormControl(bookPublisherabbreviation, Validators.required),
        'location': new FormControl(bookPublisherlocation, Validators.required),
        'kvkNumber': new FormControl(bookPublisherkvkNumber, Validators.required)
      })
    });
  }

}
