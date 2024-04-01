import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared.module';
import { SubmitDialogComponent } from './submit-dialog/submit-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [HomeComponent, SubmitDialogComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
