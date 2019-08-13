import {NgModule, Type} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RoleService} from './role.service';
import {RoleComponent} from './role.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {RoleRoutingModule} from "./role-routing.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule,
        RoleRoutingModule
    ],
    declarations: [
        RoleComponent
    ],
    exports: [RoleComponent],
    providers: [RoleService]
})
export class RoleModule {
    mainConponent: Type<any> = RoleComponent;
}
