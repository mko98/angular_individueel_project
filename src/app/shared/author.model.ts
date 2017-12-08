
export class Author {
  public _id: string;
  public firstName: string;
  public lastName: string;
  public birthYear: number;

  constructor(firstName: string, lastName: string, birthYear: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }
}
