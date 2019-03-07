import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StockProductMonthComponent} from "./stockProductMonth.component";
import {StockProductMonthService} from "./stockProductMonth.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        StockProductMonthComponent
    ],
    exports: [StockProductMonthComponent],
    providers: [StockProductMonthService]
})
export class StockProductMonthModule {
}
