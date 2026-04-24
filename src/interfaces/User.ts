import UserAddress from "./Address";

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'shopOwner';
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
  userSettings?: UserSettingsDto;
}

export interface UserSettingsDto {
  userId: string;
  preferredLanguage: 'en' | 'ro';
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddUserDTO {
  username: string;
  email: string;
  password: string;
  preferredLanguage?: 'en' | 'ro';
}