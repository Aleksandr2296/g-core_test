import {GenreInterface, MovieInterface} from "./films.service";
import {map} from 'rxjs';

export const enrichFilm = (genres: Array<GenreInterface>) => map((films: Array<MovieInterface>) => {
  for (let film of films) {
    let filmGenres: string[] = [];
    for (let genreFilm of film.genre_ids) {
      for (let itemGenre of genres) {
        if (genreFilm == itemGenre.id) filmGenres.push(itemGenre.name);
      }
    }
    film.genre_ids = filmGenres;
  }

  return films;
})
