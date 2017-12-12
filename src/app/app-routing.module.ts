import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookComponent } from './books/book.component';
import { BookStartComponent } from './books/book-start/book-start.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import {AuthorComponent} from './author/author.component';
import {AuthorStartComponent} from './author/author-start/author-start.component';
import {AuthorDetailComponent} from './author/author-detail/author-detail.component';
import {PublisherComponent} from './publisher/publisher.component';
import {PublisherStartComponent} from './publisher/publisher-start/publisher-start.component';
import {PublisherDetailComponent} from './publisher/publisher-detail/publisher-detail.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'books', component: BookComponent, children: [
    { path: '', component: BookStartComponent },
    { path: 'new', component: BookEditComponent },
    { path: ':id', component: BookDetailComponent },
    { path: ':id/edit', component: BookEditComponent },
  ] },
  { path: 'authors', component: AuthorComponent, children: [
    { path: '', component: AuthorStartComponent },
    { path: ':id', component: AuthorDetailComponent }
  ]},
  { path: 'publisher', component: PublisherComponent, children: [
    { path: '', component: PublisherStartComponent },
    { path: ':id', component: PublisherDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
