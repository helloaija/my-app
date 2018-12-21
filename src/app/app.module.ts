import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {PageNotFoundComponent} from "./common/404/page-not-found.component";
import {LoginModule} from "./login/login.module";
import {ContentModule} from "./content/content.module";
import {UserManageModule} from "./userManage/user-manage.module";
import { HelloWorldComponent } from './hello-world/hello-world.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    LoginModule,
    ContentModule,
    UserManageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
