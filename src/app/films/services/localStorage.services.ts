import {Injectable} from "@angular/core";
import {FavoritesInterface, TagsInterface} from "../film-detail/film-detail.component";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServices {

  public favoriteList: FavoritesInterface[] | any[] = this.createFavorite();

  constructor() {
  }

  addFavorites(film: any): void {
    if (this.favoriteList.length) {
      let i = 0;
      for(let el of this.favoriteList){
        if(el.id === film.id) {
          el.tags = film.tags;
          localStorage.setItem('favorites', JSON.stringify(this.favoriteList));
        } else if(i >= this.favoriteList.length &&  el.id !== film.id) {
          this.favoriteList.push(film);
          localStorage.setItem('favorites', JSON.stringify(this.favoriteList));
        }
        console.log(this.favoriteList.length);
        console.log(i);
        i++;
      }
    } else {
      this.favoriteList.push(film);
      localStorage.setItem('favorites', JSON.stringify(this.favoriteList));
    }
  }

  removeFavorites(): void {
    let x = this.createFavorite();

  }

  getFavorite(id: number): Array<TagsInterface> | [] {
    if (this.favoriteList.length) {
      for(let el of this.favoriteList) {
        if(el.id === id) return el.tags;
      }
    }
    return [];
  }

  getListFavorite(): Array<TagsInterface> | [] {
    return []
  }

  createFavorite(): any {
    const local = localStorage.getItem('favorites');
    if(local === null) return []
    return JSON.parse(local)
  }
}
