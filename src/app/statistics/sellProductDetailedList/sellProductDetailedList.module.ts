import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductTypePipe, SellProductDetailedListComponent} from './sellProductDetailedList.component';
import {SellProductDetailedListService} from './sellProductDetailedList.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        SellProductDetailedListComponent, ProductTypePipe
    ],
    exports: [SellProductDetailedListComponent],
    providers: [SellProductDetailedListService]
})
export class SellProductDetailedListModule {
}
