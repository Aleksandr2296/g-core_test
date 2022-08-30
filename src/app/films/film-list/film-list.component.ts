import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl} from '@angular/forms';
import {FilmsService, GenreInterface} from "../services/films.service";
import {
  merge,
  combineLatest,
  map,
  startWith,
  switchMap,
  tap, debounceTime, BehaviorSubject, filter
} from "rxjs";
import {PageEvent} from "@angular/material/paginator/paginator";
import {enrichFilm} from "../services/helpers";

interface TableColumns {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit, AfterViewInit {
  public genres: Array<GenreInterface> = [];
  public searchGenre: Array<number> = [];
  public tableColumns: Array<TableColumns> = [
    {value: 'poster_path', viewValue: 'Постер'},
    {value: 'title', viewValue: 'Название'},
    {value: 'release_date', viewValue: 'Дата публикации'},
    {value: 'genre', viewValue: 'Жанр'},
    {value: 'overview', viewValue: 'Описание'},
  ];
  public resultsLength: number = 0;
  public isLoadingResults: boolean = true;

  public shownTableColumns = new FormControl();
  public search = new FormControl('');
  public genre = new FormControl([]);

  @ViewChild(MatPaginator) private paginator!: MatPaginator;

  public page: BehaviorSubject<number> = new BehaviorSubject(0)

  public films$ = combineLatest([
      this.search.valueChanges.pipe(startWith('')),
      this.genre.valueChanges.pipe(startWith([])),
      this.page,
      this.filmsService.cachedGenres.pipe(filter((list) => list.length > 0)),
    ]
  )
    .pipe(
      debounceTime(500),
      tap(() => this.isLoadingResults = true),
      map(() =>[this.search.value,this.genre.value, this.page.getValue()+1]),
      switchMap(([search, genres, pageIndex]) => {
        if (genres.length) return this.filmsService.getByGenres(genres, pageIndex);
        if (search.length) return this.filmsService.getByName(search, pageIndex);
        return this.filmsService.getPopularFilms(pageIndex);
      }),
      tap((data) => this.resultsLength = data.total_pages),
      tap(() => this.isLoadingResults = false),
      map((data) => data.results),
      enrichFilm(this.genres),
    )

  constructor(private filmsService: FilmsService) {

  }

  columnTableDefault(): void {
    let tableColumnsDefault: any = [];
    this.tableColumns.forEach((el) => tableColumnsDefault.push(el.value));
    this.shownTableColumns.setValue(tableColumnsDefault);
  }

  ngAfterViewInit(): void {
    merge(
      this.search.valueChanges.pipe(tap(() => this.genre.setValue([], {emitEvent: false}))),
      this.genre.valueChanges.pipe(tap(() => this.search.setValue('', {emitEvent: false}))),
    ).subscribe(() => this.paginator.firstPage());

    this.paginator.page.subscribe((e: PageEvent) => this.page.next(e.pageIndex));
  }

  ngOnInit(): void {
    this.filmsService.getListGenre()
      .subscribe((listGenre) => {
        this.genres.push(...listGenre);
      });
    this.columnTableDefault()
  }
}
