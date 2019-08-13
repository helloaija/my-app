import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SellProductMonthComponent} from "./sellProductMonth.component";


const sellProductMonthRoutes: Routes = [
  {path: '', component: SellProductMonthComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(sellProductMonthRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SellProductMonthRoutingModule {
}
