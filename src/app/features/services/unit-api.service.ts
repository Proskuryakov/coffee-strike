import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Unit} from "../models/unit.model";

@Injectable({
  providedIn: 'root'
})
export class UnitApiService {

  unitURL = '/unit';

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitURL)
  }

}
