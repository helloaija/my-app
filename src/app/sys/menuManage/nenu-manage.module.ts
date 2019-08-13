import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MenuManageComponent} from './nenu-manage.component';
import {MenuManageService} from './nenu-manage.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {MenuManageRoutingModule} from "./nenu-manage-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        MenuManageRoutingModule
    ],
    declarations: [
        MenuManageComponent
    ],
    exports: [MenuManageComponent],
    providers: [MenuManageService]
})
export class MenuManageModule {
    mainConponent: Type<any> = MenuManageComponent;
}
