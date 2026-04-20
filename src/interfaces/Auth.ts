export type LoginRequest = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string
    message: string
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