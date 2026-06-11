import { ILogger } from './logger.types';

export class ConsoleLogger implements ILogger {
  constructor(private readonly prefix: string = '[PW]') {}

  info(message: string, context?: Record<string, unknown>): void {
    console.log(`${this.prefix} [INFO] ${message}`, context ?? '');
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`${this.prefix} [WARN] ${message}`, context ?? '');
  }

  error(message: string, error?: Error): void {
    console.error(`${this.prefix} [ERROR] ${message}`, error?.message ?? '');
  }

  debug(message: string, context?: Record<string, unknown>): void {
    if (process.env['DEBUG']) {
      console.debug(`${this.prefix} [DEBUG] ${message}`, context ?? '');
    }
  }
}
