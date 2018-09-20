import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { PeekABooComponent } from "./peek-a-boo.component";
import { PeekABooParentComponent } from "./peek-a-boo-parent.component";
import { OnChangeComponent, OnChangeParentComponent } from "./on-change.component";

@NgModule({
  declarations: [
    AppComponent,
    PeekABooComponent,
    PeekABooParentComponent,
    OnChangeComponent,
    OnChangeParentComponent
  ],
  imports: [
    FormsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
