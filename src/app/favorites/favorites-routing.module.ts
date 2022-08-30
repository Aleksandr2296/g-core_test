import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {FavoritesComponent} from "./favorites.component";

const router: Routes = [{path: '', component: FavoritesComponent}];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule {
}
