import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UserRoutingModule} from "./user-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        UserRoutingModule
    ],
    declarations: [
        UserComponent
    ],
    exports: [UserComponent],
    providers: [UserService]
})
export class UserModule {
    mainConponent: Type<any> = UserComponent;
}
