import {Component, EventEmitter, OnInit} from '@angular/core';
import {ContentService} from './content.service';
import {finalize} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.less']
})

export class ContentComponent implements OnInit {
    tabs = ['首页'];
    selectedIndex = 0;
    isSpinning = false;

    userInfo = {userName: ''};
    menuTree = [];

    constructor(private contentService: ContentService, private messageBar: NzMessageService, private router: Router) {
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
    closeTab(tab: string): void {
        this.tabs.splice(this.tabs.indexOf(tab), 1);
    }

    /**
     * 打开tab
     * @param e
     */
    newTab(e: EventEmitter<any>): void {
        var tapIndex = this.tabs.indexOf(e['title']);
        if (tapIndex == -1) {
            this.tabs.push(e['title']);
            this.selectedIndex = this.tabs.length;
            return;
        }

        this.selectedIndex = tapIndex;
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
}

