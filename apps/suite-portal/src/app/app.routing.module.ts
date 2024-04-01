import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomeModule } from './home/home.module';
import { RequestListComponent } from './admin/request-list/request-list.component';
import { LoginComponent } from './admin/login/login.component';
import { AdminModule } from './admin/admin.module';
import { CanActivateAdminGuard } from './guards/can-activate-admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'admin',
    component: RequestListComponent,
    canActivate: [CanActivateAdminGuard],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [
    HomeModule,
    AdminModule,
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: true,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
