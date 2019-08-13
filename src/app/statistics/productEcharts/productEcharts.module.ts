import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductEchartsComponent} from "./productEcharts.component";
import {ProductEchartsService} from "./productEcharts.service";
import {NgxEchartsModule} from "ngx-echarts";
import {ProductEchartsRoutingModule} from "./productEcharts-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        NgxEchartsModule,
        ProductEchartsRoutingModule
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
    mainConponent: Type<any> = ProductEchartsComponent;
}
