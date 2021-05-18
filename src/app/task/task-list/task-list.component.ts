import { Component, OnInit } from '@angular/core';

import { FetchDataService } from '../common/fetch-data.service'
import { HttpClient } from '@angular/common/http'
import { DrupalTask } from '../common/task'



@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  drupalTasks = new Array<DrupalTask>()

  constructor(private fetchData: FetchDataService, private http: HttpClient) {
    fetchData.getTasksDrupal().subscribe(response => {
      this.drupalTasks = response.map(item => {
        return new DrupalTask(
          item.id,
          item.title,
          item.body
        );
      });
    });
  }

  ngOnInit(): void {

  }

}
