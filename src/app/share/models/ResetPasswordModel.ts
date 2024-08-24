export class ResetPasswordModel {

  constructor(
    public Token: string,
    public Password: string,
    public Email: string

  ) {

  }
}
