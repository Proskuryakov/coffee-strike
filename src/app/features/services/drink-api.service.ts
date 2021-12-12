import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Drink} from "../models/drink.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DrinkApiService {

  drinkURL = `${environment.api}/drink`

  constructor(private http: HttpClient) {}

  create(drink: Drink, image: File): Observable<Drink> {
    const formData = new FormData();
    formData.append(
      'params',
      new Blob(
        [JSON.stringify(drink)],
        {type: 'application/json'},
      ),
    );
    formData.append("file", image);
    return this.http.post<Drink>(this.drinkURL, formData);
  }

  getAll(): Observable<Drink[]> {
    return this.http.get<Drink[]>(this.drinkURL);
  }

  getAllByCategory(categoryId: string): Observable<Drink[]> {
    return this.http.get<Drink[]>(`${this.drinkURL}/category/${categoryId}`);
  }

  search(categoryId: string, name: string): Observable<Drink[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Drink[]>(`${this.drinkURL}/category/${categoryId}/search`, {params})
  }

  getById(id: string): Observable<Drink> {
    return this.http.get<Drink>(`${this.drinkURL}/${id}`);
  }

  update(id: string, drink: Drink, image?: File): Observable<Drink> {
    const formData = new FormData();
    formData.append(
      'params',
      new Blob(
        [JSON.stringify(drink)],
        {type: 'application/json'},
      ),
    );
    if (image) {
      formData.append('file', image);
    }

    return this.http.put<Drink>(`${this.drinkURL}/${id}`, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.drinkURL}/${id}`);
  }


}
