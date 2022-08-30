import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {FilmDetailComponent} from "./film-detail/film-detail.component";
import {FilmListComponent} from "./film-list/film-list.component";

const router: Routes = [
  {path: '', component: FilmListComponent},
  {path: ':id', component: FilmDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class FilmsRoutingModule {
}
