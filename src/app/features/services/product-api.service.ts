import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Product} from "../models/product.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  productURL = '/product';

  constructor(private http: HttpClient) {}

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productURL, product);
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL);
  }

  search(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Product[]>(`${this.productURL}/search`, {params});
  }

}
