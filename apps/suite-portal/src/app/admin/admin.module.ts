import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';



@NgModule({
  declarations: [LoginComponent, RequestListComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
