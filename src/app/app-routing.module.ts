import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPage} from "./routed/pages/main/main.page";

const routes: Routes = [
  { path: '', component: MainPage},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
