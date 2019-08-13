import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StockProductMonthComponent} from "./stockProductMonth.component";


const stockProductMonthRoutes: Routes = [
  {path: '', component: StockProductMonthComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(stockProductMonthRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StockProductMonthRoutingModule {
}
