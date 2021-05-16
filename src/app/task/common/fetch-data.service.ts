import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'

import { ITask } from '../common/task.model'


@Injectable({
  providedIn: 'root'
})
export class FetchDataService {
  tasks: Observable<ITask[]>
  drupalTasks: any


  constructor(private http: HttpClient) { }

  getTasksDrupal(): Observable<ITask[]> {
    const tasksUrl = "http://localhost/ng-test/task"
    return this.http.get<ITask[]>(tasksUrl)
  }

  private handleError<T>(opertaion = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error)
      return of(result as T)
    }
  }

  getTasks(): ITask[] {
    return TASKS
  }
  // getTask(): Observable<ITask[]> {
  //   let subject = new Subject<ITask[]>()
  //   setTimeout(() => { subject.next(EVENTS); subject.complete(); }, 100)
  //   return subject
  // }
}

const TASKS: ITask[] = [
  {
    id: 1,
    title: '#Task 1',
    body: 'Test'
  },
  {
    id: 2,
    title: '#Task 2',
    body: 'Test'
  }
]