import UserAddress from "./Address";

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'shopOwner';
  firstName: string;
  lastName: string;
  addresses: UserAddress[];
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string;
}

export interface AddUserDTO {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'shopOwner';
  firstName: string;
  lastName: string;
  addresses: UserAddress[];
  phoneNumber: string;
}