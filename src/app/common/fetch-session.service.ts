import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchSessionService {

  constructor(private http: HttpClient) { }

  getSessionToken() {
    const tasksUrl = "http://localhost/ng-test/session/token?_format=hal_json"
    return this.http.get(tasksUrl)
  }
}
