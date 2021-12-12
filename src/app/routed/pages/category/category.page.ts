import { Component, OnInit } from '@angular/core';
import {Category} from "../../../features/models/category.model";
import {Drink} from "../../../features/models/drink.model";
import {CategoryApiService} from "../../../features/services/category-api.service";
import {DrinkApiService} from "../../../features/services/drink-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'app-category',
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss']
})
export class CategoryPage implements OnInit {

  drinks: Drink[] = [];
  selectedCategory?: Category;
  searchText: string = '';

  constructor(
    private readonly categoryService: CategoryApiService,
    private readonly drinkService: DrinkApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.checkCategory();
  }

  checkCategory(): void {
    this.activatedRoute.params.pipe(
      map((params) => {
        return params['id'] as string
      }),
      switchMap((id) => this.categoryService.getById(id))
    ).subscribe(
      (category) => {
        this.selectedCategory = category
        this.loadDrinks();
      },
      (ex) => {
        console.log(ex);
        this.router.navigate(['/']);
      }
    );
  }

  loadDrinks(): void {
    this.drinkService.getAllByCategory(this.selectedCategory!.id).subscribe(
      (d) => this.drinks = d,
      (error) => console.log(error)
    );
  }

  searchDrink(): void {
    if (this.searchText.trim() === '') {
      this.loadDrinks();
    }else {
      this.drinkService.search(this.selectedCategory!.id, this.searchText).subscribe(
        (d) => this.drinks = d,
        (error) => console.log(error)
      );
    }
  }

  goToDrink(drink: Drink): void {
    this.router.navigate(['/drink', drink.id]);
  }
}
