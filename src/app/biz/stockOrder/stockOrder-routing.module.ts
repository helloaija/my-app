import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockOrderComponent} from "./stockOrder.component";


const stockOrderRoutes: Routes = [
  {path: '', component: StockOrderComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(stockOrderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StockOrderRoutingModule {
}
