import { Component, OnInit, Input } from '@angular/core';

// import {Author} from '../../../shared/author.model';
import {Book} from '../../../books/book.model';

@Component({
  selector: 'app-publisher-item',
  templateUrl: './publisher-item.component.html',
  styleUrls: ['./publisher-item.component.css']
})
export class PublisherItemComponent implements OnInit {
  @Input() book: Book;
  @Input() index: number;

  ngOnInit() {
  }
}
