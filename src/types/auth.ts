export interface LoginResponse {
  status: 1 | 2 | 3;
  token?: string;
  message?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  error: string | null;
}