import {Injectable} from '@angular/core';
import {Category} from "../models/category.model";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryApiService {

  categoryURL = '/category'

  constructor(private http: HttpClient) {}

  create(category: Category, image: File): Observable<Category> {
    const formData = new FormData();
    formData.append(
      'params',
      new Blob(
        [JSON.stringify(category)],
        {type: 'application/json'},
      ),
    );
    formData.append("file", image);
    return this.http.post<Category>(this.categoryURL, formData);
  }

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoryURL);
  }

  getById(id: string): Observable<Category> {
    return this.http.get<Category>(`${this.categoryURL}/${id}`);
  }

  update(id: string, category: Category, image?: File): Observable<Category> {
    const formData = new FormData();
    formData.append(
      'params',
      new Blob(
        [JSON.stringify(category)],
        {type: 'application/json'},
      ),
    );
    if (image) {
      formData.append('file', image,);
    }

    return this.http.put<Category>(`${this.categoryURL}/${id}`, formData);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.categoryURL}/${id}`);
  }

  search(name: string): Observable<Category[]> {
    const params = new HttpParams().set('name', name);
    return this.http.get<Category[]>(`${this.categoryURL}`, {params})
  }

}
