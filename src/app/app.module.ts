import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookComponent } from './books/book.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookItemComponent } from './books/book-list/book-item/book-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { BookStartComponent } from './books/book-start/book-start.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BooksService } from './books/books.service';
import {AuthorDetailComponent} from './author/author-detail/author-detail.component';
import {AuthorComponent} from './author/author.component';
import {AuthorListComponent} from './author/author-list/author-list.component';
import {AuthorItemComponent} from './author/author-list/author-item/author-item.component';
import {AuthorStartComponent} from './author/author-start/author-start.component';
import {PublisherComponent} from './publisher/publisher.component';
import {PublisherDetailComponent} from './publisher/publisher-detail/publisher-detail.component';
import {PublisherListComponent} from './publisher/publisher-list/publisher-list.component';
import {PublisherItemComponent} from './publisher/publisher-list/publisher-item/publisher-item.component';
import {PublisherStartComponent} from './publisher/publisher-start/publisher-start.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookComponent,
    BookListComponent,
    BookDetailComponent,
    BookItemComponent,
    DropdownDirective,
    BookStartComponent,
    BookEditComponent,
    AuthorComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    AuthorItemComponent,
    AuthorStartComponent,
    PublisherComponent,
    PublisherListComponent,
    PublisherDetailComponent,
    PublisherItemComponent,
    PublisherStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
