export interface IApplicationSettings {
  Id: string;
  Email: string;
  Address: string;
  PhoneNumber: string | null;
  MinimumFreeShipping: number;
  SocialMediaAccounts: ISocialMediaAccounts;
}
export interface ISocialMediaAccounts {
  Id: string;
  Facebook: string | null;
  Tiktok: string | null;
  LinkedIn: string | null;
  Instagram: string | null;
  X: string | null;
  Youtube: string | null;
}
