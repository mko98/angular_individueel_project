
export class Publisher {
  public name: string;
  public abbreviation: string;
  public location: string;
  public kvkNumber: string;

  constructor(name: string, abbreviation: string, location: string, kvkNumber: string) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.location = location;
    this.kvkNumber = kvkNumber;
  }
}
