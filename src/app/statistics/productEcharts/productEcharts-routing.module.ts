import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductEchartsComponent} from "./productEcharts.component";


const productEchartsRoutes: Routes = [
  {path: '', component: ProductEchartsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(productEchartsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProductEchartsRoutingModule {
}
