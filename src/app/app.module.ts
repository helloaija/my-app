import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from "./common/404/page-not-found.component";
import {LoginModule} from "./login/login.module";
import {ContentModule} from "./content/content.module";
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {AuthInterceptor} from "./AuthInterceptor";
import {CommonUtils} from "./common/CommonUtils";



registerLocaleData(zh);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    ContentModule,
    AppRoutingModule,
    NgZorroAntdModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, CommonUtils,
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AppModule {
}
