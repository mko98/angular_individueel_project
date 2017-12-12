import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {BooksService} from '../../books/books.service';
import {Book} from '../../books/book.model';


@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.css']
})
export class PublisherListComponent implements OnInit, OnDestroy {

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
