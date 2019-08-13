import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SellOrderComponent} from "./sellOrder.component";


const sellOrderRoutes: Routes = [
  {path: '', component: SellOrderComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(sellOrderRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SellOrderRoutingModule {
}
