import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {ProductService} from './product.service';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductAddComponent} from './product-add.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule,
        ProductRoutingModule
    ],
    declarations: [
        ProductComponent, ProductAddComponent
    ],
    exports: [ProductComponent],
    providers: [ProductService]
})
export class ProductManageModule {
}
