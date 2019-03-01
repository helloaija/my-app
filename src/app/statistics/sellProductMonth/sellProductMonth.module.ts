import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SellProductMonthComponent} from './sellProductMonth.component';
import {SellProductMonthService} from './sellProductMonth.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        SellProductMonthComponent
    ],
    exports: [SellProductMonthComponent],
    providers: [SellProductMonthService]
})
export class SellProductMonthModule {
}
