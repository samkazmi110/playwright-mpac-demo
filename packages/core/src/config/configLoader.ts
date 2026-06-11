import { Environment, EnvironmentConfig, FrameworkConfig } from './config.types';

const DEFAULT_TIMEOUT = 30_000;
const DEFAULT_RETRIES = 0;

export function loadConfig(
  environments: Record<Environment, EnvironmentConfig>,
  overrides?: Partial<FrameworkConfig>
): FrameworkConfig {
  const env = (process.env['TEST_ENV'] as Environment) ?? 'local';
  const envConfig = environments[env];

  if (!envConfig) {
    throw new Error(`No configuration found for environment: ${env}`);
  }

  return {
    env,
    baseUrl: process.env['BASE_URL'] ?? envConfig.baseUrl,
    apiBaseUrl: process.env['API_BASE_URL'] ?? envConfig.apiBaseUrl,
    timeout: Number(process.env['TIMEOUT']) || (envConfig.timeout ?? DEFAULT_TIMEOUT),
    retries: Number(process.env['RETRIES']) || (envConfig.retries ?? DEFAULT_RETRIES),
    headless: process.env['HEADED'] !== 'true',
    browser: (process.env['BROWSER'] as FrameworkConfig['browser']) ?? 'chromium',
    ...overrides,
  };
}
