import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from "./content.component";


const contentRoutes: Routes = [
  {
    path: 'content', component: ContentComponent,
    // children: [{
    //   path: '', component: ContentHomeComponent,
    // }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(contentRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContentRoutingModule {
}
