import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserBillService} from './userBill.service';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';

@Component({
    selector: 'view-stat-user-bill',
    templateUrl: './userBill.component.html',
    styleUrls: ['./userBill.component.less']
})

export class UserBillComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    table = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        dataSet: [],
        loading: true,
        filterParams: {}
    };

    // 遮罩
    isSpinning = false;

    constructor(private userBillService: UserBillService, private commonUtils: CommonUtils, private fb: FormBuilder) {
        this.queryForm = this.fb.group({
            userName: ['', []],
            mobilePhone: ['', []],
            orderTimeBegin: ['', []],
            orderTimeEnd: ['', []]
        });
    }

    // 查询按钮
    query(): void {
        let params = this.queryForm.value;
        if (params['createTimeBegin']) {
            params['createTimeBegin'] = formatDate(params['createTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['createTimeEnd']) {
            params['createTimeEnd'] = formatDate(params['createTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        this.table.filterParams = params;
        this.searchData(true);
    }

    // 重置查询表单
    resetForm(): void {
        this.queryForm.reset();
    }


    ngOnInit(): void {
        this.searchData(true);
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
        this.userBillService.getUserBillAmounts(this.commonUtils.nullTrim(this.table.filterParams)).pipe(
            finalize(() => {
                this.table.loading = false;
            })
        ).subscribe(data => {
            this.table.loading = false;
            if ('0000' == data['resultCode']) {
                let result = data['result'];
                this.table.total = result['totalCount'];
                this.table.dataSet = result['recordList'] ? result['recordList'] : [];
            }
        });
    }
}
