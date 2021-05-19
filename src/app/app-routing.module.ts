import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './task/task-list/task-list.component';
import { CreateTaskComponent } from './task/create-task/create-task.component'

const routes: Routes = [
  { path: 'tasks', component: TaskListComponent },
  { path: 'create-tasks', component: CreateTaskComponent },
  // { path: 'tasks/:id', component: TaskDetailsComponent }
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
