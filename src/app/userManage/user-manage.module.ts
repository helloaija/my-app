import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {UserManageService} from "./user-manage.service";
import {UserManageRoutingModule} from "./user-manage-routing.module";
import {UserManageComponent} from './user-manage.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserManageRoutingModule
  ],
  declarations: [
    UserManageComponent
  ],
  providers: [UserManageService]
})
export class UserManageModule {
}
