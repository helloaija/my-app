import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SellProductMonthComponent} from './sellProductMonth.component';
import {SellProductMonthService} from './sellProductMonth.service';
import {SellProductMonthRoutingModule} from "./sellProductMonth-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SellProductMonthRoutingModule
    ],
    declarations: [
        SellProductMonthComponent
    ],
    exports: [SellProductMonthComponent],
    providers: [SellProductMonthService]
})
export class SellProductMonthModule {
    mainConponent: Type<any> = SellProductMonthComponent;
}
