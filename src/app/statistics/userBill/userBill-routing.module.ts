import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserBillComponent} from "./userBill.component";


const userBillRoutes: Routes = [
  {path: '', component: UserBillComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userBillRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserBillRoutingModule {
}
