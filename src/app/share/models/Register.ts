export class Register {
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;

  constructor(FirstName: string, LastName: string, Email: string, Password: string) {
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.Password = Password;
  }
}
