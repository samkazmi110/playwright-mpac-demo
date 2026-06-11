import { APIRequestContext, APIResponse } from '@playwright/test';
import { ILogger } from '@opg/pw-core';
import { ApiResponse, RequestOptions, RetryOptions } from '../types/index.js';

const DEFAULT_RETRY: RetryOptions = {
  maxAttempts: 3,
  delayMs: 1000,
  retryOn: [429, 500, 502, 503],
};

export abstract class BaseApiClient {
  protected readonly logger?: ILogger;

  constructor(
    protected readonly request: APIRequestContext,
    protected readonly baseUrl: string,
    logger?: ILogger
  ) {
    this.logger = logger;
  }

  protected buildUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  protected async get<T>(path: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.executeWithRetry('GET', path, undefined, options);
  }

  protected async post<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.executeWithRetry('POST', path, body, options);
  }

  protected async put<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.executeWithRetry('PUT', path, body, options);
  }

  protected async patch<T>(path: string, body: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.executeWithRetry('PATCH', path, body, options);
  }

  protected async delete(path: string, options?: RequestOptions): Promise<ApiResponse<void>> {
    return this.executeWithRetry<void>('DELETE', path, undefined, options);
  }

  protected expectStatus(response: ApiResponse<unknown>, expected: number): void {
    if (response.status !== expected) {
      throw new Error(`Expected status ${expected} but got ${response.status} for request`);
    }
  }

  private async executeWithRetry<T>(
    method: string,
    path: string,
    body?: unknown,
    options?: RequestOptions,
    retryOptions: RetryOptions = DEFAULT_RETRY
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(path);
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= retryOptions.maxAttempts; attempt++) {
      const start = Date.now();
      try {
        const response = await this.sendRequest(method, url, body, options);
        const durationMs = Date.now() - start;
        const status = response.status();

        this.logger?.info(`${method} ${path} → ${status} (${durationMs}ms)`);

        if (retryOptions.retryOn.includes(status) && attempt < retryOptions.maxAttempts) {
          this.logger?.warn(`Retrying ${method} ${path} (attempt ${attempt}/${retryOptions.maxAttempts})`);
          await this.delay(retryOptions.delayMs * attempt);
          continue;
        }

        const data = status !== 204 ? await this.parseJson<T>(response) : (undefined as T);
        const headers = await this.extractHeaders(response);

        return { status, data, headers, durationMs };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        if (attempt < retryOptions.maxAttempts) {
          this.logger?.warn(`Request failed, retrying (attempt ${attempt}/${retryOptions.maxAttempts}): ${lastError.message}`);
          await this.delay(retryOptions.delayMs * attempt);
        }
      }
    }

    throw lastError ?? new Error(`Request failed after ${retryOptions.maxAttempts} attempts`);
  }

  private async sendRequest(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<APIResponse> {
    const requestOptions = {
      headers: options?.headers,
      params: options?.params,
      timeout: options?.timeout,
      data: body,
    };

    switch (method) {
      case 'GET': return await this.request.get(url, requestOptions);
      case 'POST': return await this.request.post(url, requestOptions);
      case 'PUT': return await this.request.put(url, requestOptions);
      case 'PATCH': return await this.request.patch(url, requestOptions);
      case 'DELETE': return await this.request.delete(url, requestOptions);
      default: throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private async parseJson<T>(response: APIResponse): Promise<T> {
    return (await response.json()) as T;
  }

  private async extractHeaders(response: APIResponse): Promise<Record<string, string>> {
    return response.headers();
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
