import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {RoleService} from './role.service';
import {RoleComponent} from './role.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
    declarations: [
        RoleComponent
    ],
    exports: [RoleComponent],
    providers: [RoleService]
})
export class RoleModule {
}
