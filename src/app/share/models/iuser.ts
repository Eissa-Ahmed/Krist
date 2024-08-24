export interface IUser {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  UserName: string;
  PhoneNumber: string | null;
  ImageUrl: string | null;
  DateCreated: string;
  Cart: ICart;
  Wishlist: IWishlist;
  Address: IAddress[];
}
export interface ICart {
  Id: string;
  UserId: string;
  DateCreated: string;
  CartItems: ICartItem[];
}
export interface ICartItem {
  Id: string;
  Quantity: number;
  CartId: string;
  Product: IUser_Product;
}
export interface IUser_Product {
  Id: string;
  Name: string;
  Description: string;
  MainImage: string;
  Price: number;
}
export interface IWishlist {
  Id: string;
  UserId: string;
  WishlistItems: IWishlistItem[];
}
export interface IWishlistItem {
  Id: string;
  WishlistId: string;
  Product: IUser_Product;
}
export interface IAddress {
  Id: string;
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Country: string;
  ZipCode: string;
  IsDefault: boolean;
  UserId: string;
}
