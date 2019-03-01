import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {SellProductMonthService} from "./sellProductMonth.service";
import {formatDate} from "@angular/common";

@Component({
    selector: 'view-stat-sell-product-month',
    templateUrl: './sellProductMonth.component.html',
    styleUrls: ['./sellProductMonth.component.less']
})

export class SellProductMonthComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    table = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        dataSet: [],
        loading: true,
        filterParams: {},
        totalPrice: 0
    };

    // 遮罩
    isSpinning = false;

    constructor(private sellProductMonthService: SellProductMonthService, private commonUtils: CommonUtils, private fb: FormBuilder) {
        this.queryForm = this.fb.group({
            year: [formatDate(new Date(), 'yyyy', 'zh-Hans'), []],
            month: [formatDate(new Date(), 'MM', 'zh-Hans'), []]
        });
    }

    // 查询按钮
    query(): void {
        let params = this.queryForm.value;
        this.table.filterParams = this.commonUtils.nullTrim(params);
        this.searchData(true);
    }


    ngOnInit(): void {
        this.query();
    }

    // 加载数据
    searchData(reset: boolean = false): void {
        if (reset) {
            this.table.pageIndex = 1;
        }

        this.table.loading = true;

        this.table.filterParams['currentPage'] = this.table.pageIndex;
        this.table.filterParams['pageSize'] = this.table.pageSize;

        // 请求产品数据
        this.sellProductMonthService.getSellProductMonths(this.table.filterParams).pipe(
            finalize(() => {
                this.table.loading = false;
            })
        ).subscribe(data => {
            this.table.loading = false;
            if ('0000' == data['resultCode']) {
                let result = data['result'];
                this.table.totalPrice = result['totalPrice'];
                this.table.total = result['pageBean']['totalCount'];
                this.table.dataSet = result['pageBean']['recordList'] ? result['pageBean']['recordList'] : [];
            }
        });
    }
}
