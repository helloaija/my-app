import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserManageService} from "./user-manage.service";
import {UserManageComponent} from './user-manage.component';
import {UserManageRoutingModule} from "./user-manage-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserManageRoutingModule
  ],
  declarations: [
    UserManageComponent
  ],
  exports: [UserManageComponent],
  providers: [UserManageService]
})
export class UserManageModule {
}
