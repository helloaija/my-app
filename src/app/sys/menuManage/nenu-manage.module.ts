import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {MenuManageComponent} from "./nenu-manage.component";
import {MenuManageService} from "./nenu-manage.service";
import {MenuManageRoutingModule} from "./nenu-manage-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MenuManageRoutingModule
  ],
  declarations: [
    MenuManageComponent
  ],
  exports: [MenuManageComponent],
  providers: [MenuManageService]
})
export class MenuManageModule {
}
