import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataService } from './task/common/fetch-data.service';
import { TaskListComponent } from './task/task-list/task-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateTaskComponent } from './task/create-task/create-task.component';
import { FetchSessionService } from './common/fetch-session.service';
import { AuthService } from './shared/auth.service';

// Committing to pushing-data-to-drupal branch
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    TaskListComponent,
    NavbarComponent,
    CreateTaskComponent,
  ],
  providers: [
    FetchDataService,
    FetchSessionService,
    CookieService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
