import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContentService} from './content.service';
import {ContentRoutingModule} from './content-routing.module';
import {ContentComponent} from './content.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MenuManageModule} from '../sys/menuManage/nenu-manage.module';
import {ContentIndexComponent} from './content-index.component';
import {ProductManageModule} from '../biz/product/product.module';
import {RoleModule} from '../sys/role/role.module';
import {UserModule} from "../sys/user/user.module";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        UserModule,
        ContentRoutingModule,
        NgZorroAntdModule,
        MenuManageModule,
        ProductManageModule,
        RoleModule
    ],
    declarations: [
        ContentComponent, ContentIndexComponent
    ],
    providers: [ContentService]
})
export class ContentModule {
}
