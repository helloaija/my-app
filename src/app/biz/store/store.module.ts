import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductTypePipe, StoreComponent} from './store.component';
import {StoreService} from './store.service';
import {StoreRoutingModule} from "./store-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        StoreRoutingModule
    ],
    declarations: [
        StoreComponent, ProductTypePipe
    ],
    exports: [StoreComponent],
    providers: [StoreService]
})
export class StoreModule {
    mainConponent: Type<any> = StoreComponent;
}
