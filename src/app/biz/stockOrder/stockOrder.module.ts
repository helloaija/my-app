import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {StockOrderService} from './stockOrder.service';
import {OrderStatusPipe, StockOrderComponent} from './stockOrder.component';
import {StockOrderEditComponent} from './stockOrder-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        StockOrderComponent, StockOrderEditComponent, OrderStatusPipe
    ],
    exports: [StockOrderComponent],
    providers: [StockOrderService]
})
export class StockOrderModule {
}
