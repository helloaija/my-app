import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserBillComponent} from './userBill.component';
import {UserBillService} from './userBill.service';
import {UserBillRoutingModule} from "./userBill-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        UserBillRoutingModule
    ],
    declarations: [
        UserBillComponent
    ],
    exports:
        [UserBillComponent],
    providers:
        [UserBillService],
})

export class UserBillModule {
    mainConponent: Type<any> = UserBillComponent;
}
