import {Injectable} from '@angular/core';
import {
  HttpClient, HttpContext, HttpHeaders, HttpParams
} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {
  PaginationInterface,
  MovieInterface,
  GenreInterface,
  GenresInterface,
  MovieDetailsInterface
} from "./films/services/films.service";

export enum HttpMethod {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
  Patch = 'PATCH',
}


export interface HttpOptions {
  body?: any;
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  reportProgress?: boolean;
  observe: 'body';
  params?: HttpParams | {
    [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = `https://api.themoviedb.org/3/`;
  api_key: string = 'dcfd0575d752e693348aec201a350147';
  language = 'ru';

  constructor(private http: HttpClient) {
  }

  public preparedRequest<T>(method: HttpMethod, path: string, body: any = {}, queryParams: any = {}): Observable<T> {
    let params = new HttpParams({fromObject: queryParams});

    params = params.append('api_key', this.api_key);
    params = params.append('language', this.language);

    const options = {
      body,
      params,
    } as HttpOptions;
    return this.request<T>(method, path, options);
  }

  public request<T>(method: string, path: string, options?: HttpOptions): Observable<T> {
    return this.http.request<any>(method, `${this.url + path}`, options);
  }

  public get<T>(path: string, params?: any): Observable<T> {
    return this.preparedRequest<T>(HttpMethod.Get, path, null, params);
  }

  public put<T>(path: string, body: any = {}): Observable<T> {
    return this.preparedRequest<T>(HttpMethod.Put, path, body);
  }

  public patch<T>(path: string, body: any = {}): Observable<T> {
    return this.preparedRequest<T>(HttpMethod.Patch, path, body);
  }

  public post<T>(path: string, body: any = {}): Observable<T> {
    return this.preparedRequest<T>(HttpMethod.Post, path, body);
  }

  public delete<T>(path: string, body?: any): Observable<T> {
    return this.preparedRequest<T>(HttpMethod.Delete, path, body);
  }
}
