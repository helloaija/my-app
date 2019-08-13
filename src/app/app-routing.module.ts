import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './common/404/page-not-found.component';

const appRoutes: Routes = [
    {path: '', redirectTo: '/toLogin', pathMatch: 'full'},
    {path: 'toLogin', loadChildren: './login/login.module#LoginModule'},
    {path: 'content', loadChildren: './content/content.module#ContentModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            {
                // debugging purposes only
                enableTracing: true,
                // 预加载模块
                // preloadingStrategy: PreloadAllModules
            }
        )
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
