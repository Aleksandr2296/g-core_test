import {Injectable} from '@angular/core';
import {ApiService} from "../../api.service";
import {Observable, map, BehaviorSubject, tap} from 'rxjs';

export interface MovieInterface {
  adult: boolean;
  backdrop_path: string;
  genre_ids: Array<number | string>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface PaginationInterface<ItemInterface> {
  page: number;
  results: Array<ItemInterface>;
  total_pages: number;
  total_results: number;
}

export interface GenreInterface {
  id: number;
  name: string;
}

export interface GenresInterface<ItemInterface> {
  genres: Array<ItemInterface>;
}

export interface MovieDetailsInterface<genresInterface> {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Array<genresInterface>;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Array<any>;
  production_countries: Array<any>;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Array<any>;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  private path = 'movie';

  public cachedGenres = new BehaviorSubject<Array<GenreInterface>>([])

  constructor(private apiService: ApiService) {
  }

  public genres: Observable<Array<GenreInterface>> | any;

  getPopularFilms(page: number = 1): Observable<PaginationInterface<MovieInterface>> {
    return this.apiService.get<PaginationInterface<MovieInterface>>(`${this.path}/popular`, {page})
  }

  getByGenres(genres: Array<number>, page: number = 1): Observable<PaginationInterface<MovieInterface>> {
    const params = {
      "sort_by": 'popularity.desc',
      "include_adult": false,
      "include_video": false,
      "with_genres": genres.join(','),
      "with_watch_monetization_types": "flatrate",
      "page": page
    };

    return this.apiService.get<PaginationInterface<MovieInterface>>(`discover/${this.path}`, params)
  }

  getListGenre(): Observable<Array<GenreInterface>> {
    return this.apiService.get(`genre/${this.path}/list`)
      .pipe(
        map((data: any) => data.genres),
        tap((list:Array<GenreInterface>) => this.cachedGenres.next(list))
      );
  }

  getDetails(movie_id: number): Observable<MovieDetailsInterface<GenreInterface>> {
    return this.apiService.get(`${this.path}/${movie_id}`);
  }

  getByName(query: string, page: number): Observable<PaginationInterface<MovieInterface>> {
    return this.apiService.get(`search/${this.path}`, {query, page});
  }
}
