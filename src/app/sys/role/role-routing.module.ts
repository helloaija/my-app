import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from "./role.component";


const roleRoutes: Routes = [
  {path: '', component: RoleComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(roleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoleRoutingModule {
}
