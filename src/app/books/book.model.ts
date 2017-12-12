import { Author } from '../shared/author.model';
import {Publisher} from '../shared/publisher.model';

export class Book {
  public _id: string;
  public title: string;
  public length: number;
  public language: string;
  public imageURL: string;
  public author: Author;
  public publisher: Publisher;

  constructor(title: string, length: number, language: string, imagePath: string, authors: Author, publishers: Publisher) {
    this.title = title;
    this.length = length;
    this.language = language;
    this.imageURL = imagePath;
    this.author = authors;
    this.publisher = publishers;
  }
}
