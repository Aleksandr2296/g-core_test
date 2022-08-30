import {Component, OnInit} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FilmsService, GenreInterface, MovieDetailsInterface} from "../services/films.service";
import {ActivatedRoute, Route, Router} from '@angular/router';
import {MatChipInputEvent} from "@angular/material/chips";
import {combineLatest, map, startWith, tap, timer} from "rxjs";
import {LocalStorageServices} from "../services/localStorage.services";

export interface TagsInterface {
  name: string;
}

export interface FavoritesInterface {
  id: number;
  title: string;
  tags: Array<TagsInterface>;
}


@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  public idMovie: number = Number(this.route.snapshot.paramMap.get('id'));
  public film!: MovieDetailsInterface<GenreInterface>;
  public tags: TagsInterface[] = [];
  public addOnBlur: boolean = true;
  public favorite: any = {};
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  public isLoadingResults: boolean = true;

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute,
    private local: LocalStorageServices) {
  }

  remove(tag: TagsInterface): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.favorite.tags.splice(index, 1);
      // this.favorite.tags = this.tags;
    }
    console.log(this.favorite);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.favorite.tags.push({name: value});
      this.local.addFavorites(this.favorite);
    }
    event.chipInput!.clear();
  }

  ngOnInit(): void {
    this.filmsService.getDetails(this.idMovie)
      .pipe(
        tap(() => this.isLoadingResults = true),
        tap(() => this.favorite.tags = this.local.getFavorite(this.idMovie))
      )
      .subscribe((requests: MovieDetailsInterface<GenreInterface>) => {
        this.film = requests;
        this.favorite.id = requests.id;
        this.favorite.title = requests.title;
        console.log(this.favorite);
        this.isLoadingResults = false;
      });
  }
}
