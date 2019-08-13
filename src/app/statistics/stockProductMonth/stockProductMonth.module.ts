import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StockProductMonthComponent} from "./stockProductMonth.component";
import {StockProductMonthService} from "./stockProductMonth.service";
import {StockProductMonthRoutingModule} from "./stockProductMonth-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        StockProductMonthRoutingModule
    ],
    declarations: [
        StockProductMonthComponent
    ],
    exports: [StockProductMonthComponent],
    providers: [StockProductMonthService]
})
export class StockProductMonthModule {
    mainConponent: Type<any> = StockProductMonthComponent;
}
