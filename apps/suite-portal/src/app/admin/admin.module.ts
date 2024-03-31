import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [LoginComponent, RequestListComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent, RequestListComponent],
})
export class AdminModule {}
