import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {T} from "@angular/cdk/keycodes";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TableService {
  refreshObject = new Subject()
  public refreshObject$ = this.refreshObject.asObservable();

  constructor(private http: HttpClient) {
  }

  getData(url: string, page: number | undefined, limit: number | undefined) {
    return this.http.get<any>(`${url}?page=${page}&limit=${limit}`)
  }

  public refreshTable(value: any) {
    this.refreshObject.next(value)
  }
}
