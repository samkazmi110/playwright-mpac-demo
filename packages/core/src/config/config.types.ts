export interface FrameworkConfig {
  readonly env: Environment;
  readonly baseUrl: string;
  readonly apiBaseUrl: string;
  readonly timeout: number;
  readonly retries: number;
  readonly headless: boolean;
  readonly browser: 'chromium' | 'firefox' | 'webkit';
}

export interface EnvironmentConfig {
  readonly baseUrl: string;
  readonly apiBaseUrl: string;
  readonly timeout?: number;
  readonly retries?: number;
}

export type Environment = 'local' | 'dev' | 'qa' | 'stage' | 'prod';
