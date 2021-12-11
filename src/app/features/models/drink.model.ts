import {Category} from "./category.model";
import {Ingredient} from "./ingredient.model";

export interface Drink {
  id: string;
  name: string;
  category: Category;
  imageLink: string;
  description: string;
  recipe: string;
  volumes: string[];
  ingredients: Ingredient[];
  cookingTime: number;
}
