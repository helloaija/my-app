import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from '../login/login.component';
import {LoginService} from "./login.service";
import {LoginRoutingModule} from "./login-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LoginRoutingModule,
    NgZorroAntdModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService]
})
export class LoginModule {
}
