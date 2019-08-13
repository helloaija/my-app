import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContentComponent} from "./content.component";
import {ContentIndexComponent} from "./content-index.component";

/**
 * 利用路由来实现懒加载模块
 */
const contentRoutes: Routes = [
    {
        path: '', component: ContentComponent,
        children: [{
            path: '', redirectTo: 'index'
        }, {
            path: 'index', component: ContentIndexComponent
        }, {
            path: 'product', loadChildren: '../biz/product/product.module#ProductManageModule'
        }, {
            path: 'store', loadChildren: '../biz/store/store.module#StoreModule'
        }, {
            path: 'stockOrder', loadChildren: '../biz/stockOrder/stockOrder.module#StockOrderModule'
        }, {
            path: 'sellOrder', loadChildren: '../biz/sellOrder/sellOrder.module#SellOrderModule'
        }, {
            path: 'buyer', loadChildren: '../biz/buyer/buyer.module#BuyerModule'
        }, {
            path: 'userManage', loadChildren: '../sys/user/user.module#UserModule'
        }, {
            path: 'menuManage', loadChildren: '../sys/menuManage/nenu-manage.module#MenuManageModule'
        }, {
            path: 'roleManage', loadChildren: '../sys/role/role.module#RoleModule'
        }, {
            path: 'statUserBill', loadChildren: '../statistics/userBill/userBill.module#UserBillModule'
        }, {
            path: 'statSellProductMonth', loadChildren: '../statistics/sellProductMonth/sellProductMonth.module#SellProductMonthModule'
        }, {
            path: 'statStockProductMonth', loadChildren: '../statistics/stockProductMonth/stockProductMonth.module#StockProductMonthModule'
        }, {
            path: 'statProductEcharts', loadChildren: '../statistics/productEcharts/productEcharts.module#ProductEchartsModule'
        }, {
            path: 'statSellProductDetailed', loadChildren: '../statistics/sellProductDetailedList/sellProductDetailedList.module#SellProductDetailedListModule'
        }]
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

