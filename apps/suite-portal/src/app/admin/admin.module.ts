import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RequestListComponent } from './request-list/request-list.component';
import { SharedModule } from '../shared.module';
import { RequestDialogComponent } from './request-dialog/request-dialog.component';

@NgModule({
  declarations: [LoginComponent, RequestListComponent, RequestDialogComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent, RequestListComponent],
})
export class AdminModule {}
