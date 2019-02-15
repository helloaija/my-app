import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UserService} from './user.service';
import {UserComponent} from './user.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgZorroAntdModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserComponent
    ],
    exports: [UserComponent],
    providers: [UserService]
})
export class UserModule {
}
