import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MenuManageComponent} from "./nenu-manage.component";


const userManageRoutes: Routes = [
  {path: '', component: MenuManageComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(userManageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class MenuManageRoutingModule {
}
