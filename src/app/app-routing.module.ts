import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPage} from "./routed/pages/main/main.page";
import {CategoryPage} from "./routed/pages/category/category.page";

const routes: Routes = [
  { path: '', component: MainPage, pathMatch: 'full'},
  { path: 'category', redirectTo: ''},
  { path: 'category/:id', component: CategoryPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
