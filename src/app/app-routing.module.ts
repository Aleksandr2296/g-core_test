import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {FavoritesComponent} from "./favorites/favorites.component";
import {PageNotFoundModule} from "./page-not-found/page-not-found.module";
// import {FilmsComponent} from "../films/films.component";
// import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const router: Routes = [
  {path: 'films', loadChildren: () => import('./films/films.module').then(m => m.FilmsModule)},
  {path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule)},
  {path: '', redirectTo: '/films', pathMatch: 'full'},
  {path: '**', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(router)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
