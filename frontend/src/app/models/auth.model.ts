export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthTokens {
  tokenType: string;
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
}

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  initials: string;
}
