import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SellProductDetailedListComponent} from "./sellProductDetailedList.component";


const sellProductDetailedListRoutes: Routes = [
  {path: '', component: SellProductDetailedListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(sellProductDetailedListRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SellProductDetailedListRoutingModule {
}
