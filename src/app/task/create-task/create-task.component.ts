import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators'

import { FetchDataService } from '../common/fetch-data.service'
import { FetchSessionService } from '../../common/fetch-session.service'

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
  task: any
  csrf

  constructor(private router: Router, private http: HttpClient, private fetchData: FetchDataService, private session: FetchSessionService) { }

  ngOnInit(): void {
  }

  createTask(formValues) {
    this.task = {
      "_links": {
        "type": {
          "href": "http://localhost/ng-test/rest/type/node/task"
        }
      },
      "title": [{ "value": formValues.taskTitle }],
      "body": [{ "value": formValues.taskBody }]
    }

    this.fetchData.saveTask(this.task).subscribe(data => {
      this.router.navigate(['tasks']);
    })
  }

  onCancel() {
    this.fetchData.getSessionid
    // console.log(this.fetchData.getSessionid())
    //this.router.navigate(['tasks'])
  }
}
