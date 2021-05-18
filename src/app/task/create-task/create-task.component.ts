import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { FetchDataService } from '../common/fetch-data.service'

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {
  taskTitle
  taskBody
  postId: any;
  usr = btoa("admin:12qwaszx")
  session

  constructor(private router: Router, private http: HttpClient, private fetchData: FetchDataService) { }

  ngOnInit(): void {
  }

  createTask(formValues) {
    const headers = {
      'Content-Type': 'application/hal+json',
      'Authorization': 'Basic ' + this.usr,
    };
    const body = {
      "_links": {
        "type": {
          "href": "http://localhost/ng-test/rest/type/node/task"
        }
      },
      "title": [{ "value": formValues.taskTitle }],
      "body": [{ "value": formValues.taskBody }]
    }
    this.http.post<any>('http://localhost/ng-test/node?_format=hal_json', body, { headers }).subscribe(data => {
      this.postId = data.id;
    });

    this.router.navigate(['tasks'])
  }

  onCancel() {
    // this.session = this.fetchData.getSessionToken()
    // this.session.subscribe(session => this.session = session)

    const tasksUrl = "http://localhost/ng-test/session/token?_format=json"
    this.session = this.fetchData.getSessionToken().subscribe(data => {
      this.session = data;
    });

    console.log(this.session)
    //this.router.navigate(['tasks'])
  }
}
