import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {ContentService} from './content.service';
import {finalize} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.less']
})

export class ContentComponent implements OnInit {
    tabs = [{title: '首页', modulePath: ''}];
    selectedIndex = 0;
    isSpinning = false;

    userInfo = {userName: ''};
    menuTree = [];

    curTabTitle: string = '首页';

    menuMap: Map<string, string> = new Map<string, string>();

    constructor(private contentService: ContentService, private messageBar: NzMessageService,
                private router: Router) {
        this.initMenuMap();
    }

    ngOnInit(): void {
        this.isSpinning = true;
        this.contentService.getUserInfo().pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                // 加载菜单
                this.menuTree = data['result']['menu'];
                // 加载用户信息
                this.userInfo = data['result']['user'];
            } else {
                this.messageBar.create('error', data['resultMessage']);
            }
        });
    }

    /**
     * 关闭tab
     * @param tab
     */
    closeTab(title: string): void {
        this.tabs.splice(this.getTabIndex(title), 1);
    }

    getTabIndex(title: string): number {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].title == title) {
                return i;
            }
        }

        return -1;
    }

    /**
     * 打开tab
     * @param e
     */
    newTab(e: EventEmitter<any>): void {
        let menuTitle = e['title'];
        var tapIndex = this.getTabIndex(menuTitle);
        this.curTabTitle = e['title'];

        if (tapIndex == -1) {
            this.selectedIndex = this.tabs.length;

            this.tabs.push({title: e['title'], modulePath: this.menuMap.get(menuTitle)});
        } else {
            this.selectedIndex = tapIndex;
        }
    }

    /**
     * 退出登录
     */
    logout(): void {
        this.contentService.logout().subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.router.navigateByUrl('toLogin');
            } else {
                this.messageBar.create('error', data['resultMessage']);
            }
        });
    }

    private initMenuMap(): void {
        this.menuMap.set('产品管理', "../biz/product/product.module#ProductManageModule");
        this.menuMap.set('库存数据', "../biz/store/store.module#StoreModule");
        this.menuMap.set('进货单', "../biz/stockOrder/stockOrder.module#StockOrderModule");
        this.menuMap.set('销售单', "../biz/sellOrder/sellOrder.module#SellOrderModule");
        this.menuMap.set('买家信息', "../biz/buyer/buyer.module#BuyerModule");

        this.menuMap.set('用户管理', "../sys/user/user.module#UserModule");
        this.menuMap.set('菜单管理', "../sys/menuManage/nenu-manage.module#MenuManageModule");
        this.menuMap.set('角色管理', "../sys/role/role.module#RoleModule");

        this.menuMap.set('买家账单金额统计', "../statistics/userBill/userBill.module#UserBillModule");
        this.menuMap.set('销售产品按月统计', "../statistics/sellProductMonth/sellProductMonth.module#SellProductMonthModule");
        this.menuMap.set('进货产品按月统计', "../statistics/stockProductMonth/stockProductMonth.module#StockProductMonthModule");
        this.menuMap.set('进销图表统计', "../statistics/productEcharts/productEcharts.module#ProductEchartsModule");
        this.menuMap.set('销售产品明细列表', "../statistics/sellProductDetailedList/sellProductDetailedList.module#SellProductDetailedListModule");
    }
}
