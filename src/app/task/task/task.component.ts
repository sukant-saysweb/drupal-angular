import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { ITask } from '../common/task.model'
import { FetchDataService } from '../common/fetch-data.service'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  task: ITask

  constructor(fetchData: FetchDataService) { }

  ngOnInit(): void {
  }

}
