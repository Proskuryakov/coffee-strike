import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Unit} from "../models/unit.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UnitApiService {

  unitURL = `${environment.api}/unit`;

  constructor(private http: HttpClient) {}

  getUnits(): Observable<Unit[]> {
    return this.http.get<Unit[]>(this.unitURL)
  }

}
