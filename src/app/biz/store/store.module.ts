import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ProductTypePipe, StoreComponent} from './store.component';
import {StoreService} from './store.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgZorroAntdModule
    ],
    declarations: [
        StoreComponent, ProductTypePipe
    ],
    exports: [StoreComponent],
    providers: [StoreService]
})
export class StoreModule {
}
