import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';
import {SellOrderService} from './sellOrder.service';

@Component({
    selector: 'view-sellOrder',
    templateUrl: './sellOrder.component.html',
    styleUrls: ['./sellOrder.component.less']
})

export class SellOrderComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    table = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        dataSet: [],
        loading: true
    };

    // 遮罩
    isSpinning = false;

    productTypeOfOption = [{value: 'PESTICIDE', label: '农药'}, {value: 'MANURE', label: '化肥'}];

    constructor(private sellOrderService: SellOrderService, private commonUtils: CommonUtils, private fb: FormBuilder) {
        this.queryForm = this.fb.group({
            title: ['', []],
            productType: ['', []]
        });
    }

    // 查询按钮
    query(): void {
        this.searchData();
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

        let params = this.queryForm.value;
        params['currentPage'] = this.table.pageIndex;
        params['pageSize'] = this.table.pageSize;
        if (params['createTimeBegin']) {
            params['createTimeBegin'] = formatDate(params['createTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['createTimeEnd']) {
            params['createTimeEnd'] = formatDate(params['createTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }

        // 请求产品数据
        this.sellOrderService.getProducts(this.commonUtils.nullTrim(params)).pipe(
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

@Pipe({name: 'productType'})
export class ProductTypePipe implements PipeTransform {
    transform(value: string): string {
        let params = {PESTICIDE: '农药', MANURE: '化肥'};
        return params[value];
    }
}
