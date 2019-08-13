import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductTypePipe, SellProductDetailedListComponent} from './sellProductDetailedList.component';
import {SellProductDetailedListService} from './sellProductDetailedList.service';
import {SellProductDetailedListRoutingModule} from "./sellProductDetailedList-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        SellProductDetailedListRoutingModule
    ],
    declarations: [
        SellProductDetailedListComponent, ProductTypePipe
    ],
    exports: [SellProductDetailedListComponent],
    providers: [SellProductDetailedListService]
})
export class SellProductDetailedListModule {
    mainConponent: Type<any> = SellProductDetailedListComponent;
}
