export interface IAuthentication {
  IsAuthenticated: boolean;
  Message: string | null;
  Token: string;
  TokenExpiration: string;
  RefreshToken: string;
  RefreshTokenExpiration: string;
  Id: string;
  Email: string;
}
