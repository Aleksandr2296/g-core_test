import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesComponent} from "./favorites.component";
import {FavoritesRoutingModule} from "./favorites-routing.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    FormsModule,
    CommonModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule {
}
