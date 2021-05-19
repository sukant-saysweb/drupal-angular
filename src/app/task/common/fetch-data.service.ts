import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'

import { ITask } from '../common/task.model'
import { AuthService } from 'src/app/shared/auth.service';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  tasks: Observable<ITask[]>
  usr = btoa("admin:12qwaszx")

  constructor(private http: HttpClient, private auth: AuthService, private cookie: CookieService) { }

  getSessionid() {
    const tasksUrl = "http://localhost/ng-test/session/token?_format=hal_json"
    let options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/hal+json',
          'Authorization': 'Basic ' + this.usr
        }
      )
    }

    return this.http.get(tasksUrl)
  }

  getTasksDrupal(): Observable<ITask[]> {
    const tasksUrl = "http://localhost/ng-test/task"
    return this.http.get<ITask[]>(tasksUrl).pipe(catchError(this.handleError<ITask[]>('getTasksDrupal', [])))
  }

  // method to get detail of a particular task
  getTaskDrupal(id: number): Observable<ITask> {
    const tasksUrl = "http://localhost/ng-test/task" + id
    return this.http.get<ITask>(tasksUrl).pipe(catchError(this.handleError<ITask>('getTasksDrupal')))
  }

  saveTask(task) {
    let userObject = JSON.parse(this.cookie.get('userCredentials'))
    this.auth.loggedUser = {
      uid: +userObject.uid,
      userName: userObject.userName,
      csrfToken: userObject.csrfToken,
      logoutToken: userObject.logoutToken,
      password: userObject.password
    }
    let usr = btoa(this.auth.loggedUser.userName + ":" + this.auth.loggedUser.password)
    const tasksUrl = "http://localhost/ng-test/node?_format=hal_json"
    let options = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/hal+json',
          'Authorization': 'Basic ' + usr
        }
      )
    }

    return this.http.post<ITask>(tasksUrl, task, options).pipe(catchError(this.handleError<ITask>('getTasksDrupal')))
  }

  private handleError<T>(opertaion = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }
}