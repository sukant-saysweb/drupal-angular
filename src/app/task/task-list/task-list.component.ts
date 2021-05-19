import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { FetchDataService } from '../common/fetch-data.service'
import { DrupalTask } from '../common/drupalTask.model'



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
