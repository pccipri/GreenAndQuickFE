import UserAddress from "./Address";

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'customer' | 'admin' | 'shopOwner';
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  avatarPath?: string | null;
  phoneNumber?: string | null;
  isActive?: boolean;
  preferences?: Record<string, unknown> | null;
  userSettings?: UserSettingsDto;
  addresses?: UserAddress[];
  address?: UserAddress;
}

export interface UserSettingsDto {
  userId: string;
  preferredLanguage: 'en' | 'ro';
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AddUserDTO {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  preferredLanguage?: 'en' | 'ro';
}