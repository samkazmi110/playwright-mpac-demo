export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
}

export interface ApiResponse<T> {
  readonly status: number;
  readonly data: T;
  readonly headers: Record<string, string>;
  readonly durationMs: number;
}

export interface RetryOptions {
  maxAttempts: number;
  delayMs: number;
  retryOn: number[];
}

export interface IAuthProvider {
  getToken(role: string): Promise<string>;
  invalidateToken(role: string): Promise<void>;
}

export interface ITokenProvider {
  getAccessToken(): Promise<string>;
  refreshToken(): Promise<string>;
}
