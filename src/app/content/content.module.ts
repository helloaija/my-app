import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContentService} from "./content.service";
import {ContentRoutingModule} from "./content-routing.module";
import {ContentComponent} from './content.component';
import {ContentHomeComponent} from "./content-home.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContentRoutingModule
  ],
  declarations: [
    ContentHomeComponent,
    ContentComponent
  ],
  providers: [ContentService]
})
export class ContentModule {
}
