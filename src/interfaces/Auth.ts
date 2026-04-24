import { User } from "./User";

export type LoginRequest = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    message: string;
    accessToken: string;
    user: User; // includes userSettings with preferredLanguage
}

export type RegisterResponse = {
    id: string;
    message: string;
    preferredLanguage: 'en' | 'ro';
}

export type EmailTokenVerificationResponse =  {
    message: string
}

export type ForgotPasswordRequest = {
    email: string;
}

export type ResetPasswordRequest = {
    token: string;
    password: string;
}

export type ForgotPasswordResponse = {
    message: string;
}

export type ResetPasswordResponse = {
    message: string;
}