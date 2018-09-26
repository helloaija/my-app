import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserManageComponent} from "./user-manage.component";


const userManageRoutes: Routes = [
  {path: 'user-manage', component: UserManageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userManageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserManageRoutingModule {
}
