import { isUndefined, omitBy, trimEnd, trimStart } from 'lodash';
import { config } from '../config';


interface RequestOptions {
    body?: unknown;
    query?: Record<string, string | undefined>;
  }

  class HttpError extends Error {
    public readonly status: number;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
    }
}

class HttpService {
    private readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async get<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('GET', path, options);
      }
    
      async post<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('POST', path, options);
      }
    
      async put<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('PUT', path, options);
      }
    
      async patch<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('PATCH', path, options);
      }
    
      async delete<T>(path: string, options: RequestOptions = {}) {
        return this.request<T>('DELETE', path, options);
      }

    private async request<T>(
        method: string,
        path: string,
        options: RequestOptions
      ): Promise<T> {
        const authToken = localStorage.getItem('token') ?? undefined;
        const queryWithoutUndefined = omitBy(options.query, isUndefined) as Record<
          string,
          string
        >;
        const queryParams = new URLSearchParams(queryWithoutUndefined).toString();
        const url = `${trimEnd(this.baseUrl, '/')}/${trimStart(
          path,
          '/'
        )}?${queryParams}`;
        const response = await fetch(url, {
          method,
          ...(options.body ? { body: JSON.stringify(options.body) } : {}),
          headers: {
            ...(options.body ? { 'Content-Type': 'application/json' } : {}),
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {})
          }
        });

        
        // TODO: check for known errors
    // try {
    //     await checkForKnownError(response);
    //   } catch (error) {
    //     if (error instanceof AuthenticationError) {
    //       this.authErrorHandler();
    //     }
    //     if (error instanceof BaseError) {
    //       throw error;
    //     }
    //     throw new GenericError('Unknown error');
    //   }
  
      try {
        return await response.json();
      } catch (error) {
        //empty
      }
  
      throw new HttpError('Something went wrong', response.status);
    }
}

export const httpService = new HttpService(config.serverUrl);