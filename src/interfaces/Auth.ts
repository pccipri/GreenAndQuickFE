export type LoginRequest = {
    usernameOrEmail: string;
    password: string;
}

export type LoginResponse = {
    accessToken: string
    message: string
}