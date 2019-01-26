import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ProductRoutingModule} from "./product-routing.module";
import {ProductComponent} from "./product.component";
import {ProductService} from "./product.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductComponent
  ],
  exports: [ProductComponent],
  providers: [ProductService]
})
export class ProductManageModule {
}
