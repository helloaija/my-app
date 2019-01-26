import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {UserManageComponent} from './sys/userManage/user-manage.component';
import {PageNotFoundComponent} from "./common/404/page-not-found.component";

const appRoutes: Routes = [
  // {path: 'user-manage', component: UserManageComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '404', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
