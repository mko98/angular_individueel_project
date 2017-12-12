import { Component, OnInit, Input } from '@angular/core';

// import {Author} from '../../../shared/author.model';
import {Book} from '../../../books/book.model';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrls: ['./author-item.component.css']
})
export class AuthorItemComponent implements OnInit {
  @Input() book: Book;
  @Input() index: number;

  ngOnInit() {
  }
}
