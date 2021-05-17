import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataService } from './task/common/fetch-data.service';
import { TaskListComponent } from './task/task-list/task-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';

// Committing to pushing-data-to-drupal branch
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent,
    NavbarComponent,
    CreateTaskComponent
  ],
  providers: [
    FetchDataService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
