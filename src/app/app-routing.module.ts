import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPage} from "./routed/pages/main/main.page";
import {CategoryPage} from "./routed/pages/category/category.page";
import {DrinkPage} from "./routed/pages/drink/drink.page";

const routes: Routes = [
  { path: '', component: MainPage, pathMatch: 'full'},
  { path: 'category', redirectTo: ''},
  { path: 'category/:id', component: CategoryPage},
  { path: 'drink', redirectTo: ''},
  { path: 'drink/:id', component: DrinkPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
