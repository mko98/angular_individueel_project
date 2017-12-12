import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

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
    let bookAuthorFirstName = '';
    let bookAuthorLastName = '';
    let bookAuthorBirthYear = 2017;

    if (this.editMode) {
      const book = this.booksService.getBook(this.id);
      bookTitle = book.title;
      bookImagePath = book.imageURL;
      bookLength = book.length;
      bookLanguage = book.language;
      bookAuthorFirstName = book.author.firstName;
      bookAuthorLastName = book.author.lastName;
      bookAuthorBirthYear = book.author.birthYear;
    }

    this.bookForm = new FormGroup({
      'title': new FormControl(bookTitle, Validators.required),
      'length': new FormControl(bookLength, Validators.required),
      'language': new FormControl(bookLanguage, Validators.required),
      'imageURL': new FormControl(bookImagePath, Validators.required),
      'firstName': new FormControl(bookAuthorFirstName, Validators.required),
      'lastName': new FormControl(bookAuthorLastName, Validators.required),
      'birthYear': new FormControl(bookAuthorBirthYear, Validators.required)
    });
  }

}
