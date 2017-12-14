import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Book} from '../../books/book.model';
import {BooksService} from "../../books/books.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-author-detail',
  templateUrl: './author-detail.component.html',
  styleUrls: ['./author-detail.component.css']
})
export class AuthorDetailComponent implements OnInit {
  private subscription: Subscription;
  book: Book[];
  id: number;

  constructor(private booksService: BooksService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
        .subscribe(
          (params: Params) => {
            this.id = +params['id'];
            this.booksService.getAuthorBooks(this.id)
              .then(books => this.book = books)
              .catch(error => console.log(error));
            this.subscription = this.booksService.booksChanged
              .subscribe(
                (books: Book[]) => {
                  this.book = books;
                }
              );
          });
    //     );

  }


}
