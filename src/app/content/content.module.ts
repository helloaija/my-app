import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {ContentService} from './content.service';
import {ContentRoutingModule} from './content-routing.module';
import {ContentComponent} from './content.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ContentIndexComponent} from './content-index.component';
import {LeftMenuComponent} from "./leftMenu.component";
import {ContentTabComponent} from "./content-tab.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ContentRoutingModule,
        NgZorroAntdModule,
    ],
    declarations: [
        ContentComponent, ContentIndexComponent, LeftMenuComponent, ContentTabComponent
    ],
    providers: [ContentService]
})
export class ContentModule {
}
