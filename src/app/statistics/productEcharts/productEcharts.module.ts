import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductEchartsComponent} from "./productEcharts.component";
import {ProductEchartsService} from "./productEcharts.service";
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule
    ],
    declarations: [
        ProductEchartsComponent
    ],
    exports: [ProductEchartsComponent],
    providers: [ProductEchartsService]
})

/**
 * 进销图表统计
 */
export class ProductEchartsModule {
}
