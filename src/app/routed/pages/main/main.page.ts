import { Component, OnInit } from '@angular/core';
import {CategoryApiService} from "../../../features/services/category-api.service";
import {Category} from "../../../features/models/category.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss']
})
export class MainPage implements OnInit {

  imageSize = 250
  categories: Category[] = []
  searchText: string = '';

  constructor(private readonly categoryService: CategoryApiService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe(
      (c) => this.categories = c,
      (error) => console.log(error)
    );
  }

  searchCategories(): void {
    if (this.searchText.trim() === '') {
      this.loadCategories();
    }else {
      this.categoryService.search(this.searchText).subscribe(
        (c) => this.categories = c,
        (error) => console.log(error)
      );
    }
  }

}
