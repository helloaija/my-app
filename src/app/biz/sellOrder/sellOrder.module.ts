import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SellOrderService} from './sellOrder.service';
import {ProductTypePipe, SellOrderComponent} from './sellOrder.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        SellOrderComponent, ProductTypePipe
    ],
    exports: [SellOrderComponent],
    providers: [SellOrderService]
})
export class SellOrderModule {
}
