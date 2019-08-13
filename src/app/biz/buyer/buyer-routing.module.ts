import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BuyerComponent} from "./buyer.component";


const buyerRoutes: Routes = [
  {path: '', component: BuyerComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(buyerRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class BuyerRoutingModule {
}
