import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SellOrderService} from './sellOrder.service';
import {SellOrderEditComponent} from "./sellOrder-edit.component";
import {SellOrderComponent, SellOrderStatusPipe} from "./sellOrder.component";
import {SellOrderRoutingModule} from "./sellOrder-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SellOrderRoutingModule
    ],
    declarations: [
        SellOrderComponent, SellOrderEditComponent, SellOrderStatusPipe
    ],
    exports: [SellOrderComponent],
    providers: [SellOrderService]
})
export class SellOrderModule {
    mainConponent: Type<any> = SellOrderComponent;
}
