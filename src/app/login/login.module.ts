import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {LoginComponent} from '../login/login.component';
import {LoginService} from "./login.service";
import {LoginRoutingModule} from "./login-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [LoginService]
})
export class LoginModule {
}
