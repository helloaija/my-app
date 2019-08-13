import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreComponent} from "./store.component";


const productRoutes: Routes = [
  {path: '', component: StoreComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(productRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StoreRoutingModule {
}
