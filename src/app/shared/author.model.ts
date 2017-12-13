
export class Author {
  public firstName: string;
  public lastName: string;
  public dateOfBirth: string;
  public authorImageURL: string;

  constructor(firstName: string, lastName: string, dateOfBirth: string, authorImageURL: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.authorImageURL = authorImageURL;
  }
}
