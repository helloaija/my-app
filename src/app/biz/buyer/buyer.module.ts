import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BuyerEditComponent} from "./buyer-edit.component";
import {BuyerComponent} from "./buyer.component";
import {BuyerService} from "./buyer.service";
import {BuyerRoutingModule} from "./buyer-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        BuyerRoutingModule
    ],
    declarations: [
        BuyerComponent, BuyerEditComponent
    ],
    exports: [BuyerComponent],
    providers: [BuyerService]
})
export class BuyerModule {
    mainConponent: Type<any> = BuyerComponent;
}
