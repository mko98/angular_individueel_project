import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {Book} from '../../books/book.model';
import {BooksService} from '../../books/books.service';


@Component({
  selector: 'app-publisher-detail',
  templateUrl: './publisher-detail.component.html',
  styleUrls: ['./publisher-detail.component.css']
})
export class PublisherDetailComponent implements OnInit {
  book: Book;
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
          this.book = this.booksService.getBook(this.id);
        }
      );
  }



  onEditBook() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteBook() {
    this.booksService.deleteBook(this.id);
    this.router.navigate(['../']);
  }
}
