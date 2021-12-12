import { Component, OnInit } from '@angular/core';
import {DrinkApiService} from "../../../features/services/drink-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Drink} from "../../../features/models/drink.model";
import {map, switchMap} from "rxjs";

class LocalIngredient {

  name: string;
  unit: string;
  amount: string;

  constructor(name: string, unit: string, amount: string) {
    this.name = name;
    this.unit = unit;
    this.amount = amount;
  }
}

@Component({
  selector: 'app-drink',
  templateUrl: './drink.page.html',
  styleUrls: ['./drink.page.scss']
})
export class DrinkPage implements OnInit {

  drink?: Drink;
  selectedVolume: string = '';

  constructor(
    private readonly drinkService: DrinkApiService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.checkDrink();
  }

  checkDrink(): void {
    this.activatedRoute.params.pipe(
      map((params) => {
        return params['id'] as string
      }),
      switchMap((id) => this.drinkService.getById(id))
    ).subscribe(
      (drink) => {
        this.drink = drink;
        this.selectedVolume = drink.volumes[0];
      },
      (ex) => {
        console.log(ex);
        this.router.navigate(['/']);
      }
    );
  }

  goToCategory() {
    this.router.navigate(['category', this.drink?.category.id])
  }

  getIngredients(): LocalIngredient[] {
    return this.drink!.ingredients.map((i) => {
      let map = new Map(Object.entries(i.amount));
      return new LocalIngredient(i.name, i.unit, map.get(this.selectedVolume));
    });
  }
}
