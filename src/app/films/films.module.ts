import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {FilmsRoutingModule} from './films-routing.module';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {FilmListComponent} from './film-list/film-list.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    FilmDetailComponent,
    FilmListComponent,
  ],
  imports: [
    CommonModule,
    FilmsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatChipsModule
  ],
})
export class FilmsModule {
}
