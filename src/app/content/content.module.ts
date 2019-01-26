import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContentService} from "./content.service";
import {ContentRoutingModule} from "./content-routing.module";
import {ContentComponent} from './content.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {UserManageModule} from "../sys/userManage/user-manage.module";
import {MenuManageModule} from "../sys/menuManage/nenu-manage.module";
import {ContentIndexComponent} from "./content-index.component";
import {ProductManageModule} from "../biz/product/product.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserManageModule,
    ContentRoutingModule,
    NgZorroAntdModule,
    MenuManageModule,
    ProductManageModule
  ],
  declarations: [
    ContentComponent, ContentIndexComponent
  ],
  providers: [ContentService]
})
export class ContentModule {
}
