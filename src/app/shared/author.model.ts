
export class Author {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public imageURL: string;

  constructor(firstName: string, lastName: string, dateOfBirth: string, imageURL: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.imageURL = imageURL;
  }
}
