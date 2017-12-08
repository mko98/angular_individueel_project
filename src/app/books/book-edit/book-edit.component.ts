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

  onAddAuthor() {
    (<FormArray>this.bookForm.get('authors')).push(
      new FormGroup({
        'firstName': new FormControl(null, Validators.required),
        'lastName': new FormControl(null, Validators.required),
        'birthYear': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onAddPublisher() {
    (<FormArray>this.bookForm.get('publishers')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required)
      })
    );
  }

  onDeleteAuthor(index: number) {
    (<FormArray>this.bookForm.get('authors')).removeAt(index);
  }

  onDeletePublisher(index: number) {
    (<FormArray>this.bookForm.get('publishers')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let bookTitle = '';
    let bookLength = 0;
    let bookLanguage = '';
    let bookImagePath = '';
    let bookAuthors = new FormArray([]);
    let bookPublishers = new FormArray([]);

    if (this.editMode) {
      const book = this.booksService.getBook(this.id);
      bookTitle = book.title;
      bookImagePath = book.imageURL;
      bookLength = book.length;
      bookLanguage = book.language;
      if (book['authors']) {
        for (let author of book.authors) {
          bookAuthors.push(
            new FormGroup({
              'firstName': new FormControl(author.firstName, Validators.required),
              'lastName': new FormControl(author.firstName, Validators.required),
              'birthYear': new FormControl(author.birthYear, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
      if (book['publishers']) {
        for (let publisher of book.publishers) {
          bookPublishers.push(
            new FormGroup({
              'name': new FormControl(publisher.name, Validators.required)
            })
          );
        }

      }
    }

    this.bookForm = new FormGroup({
      'title': new FormControl(bookTitle, Validators.required),
      'length': new FormControl(bookLength, Validators.required),
      'language': new FormControl(bookLanguage, Validators.required),
      'imageURL': new FormControl(bookImagePath, Validators.required),
      'authors': bookAuthors,
      'publishers': bookPublishers
    });
  }

}
