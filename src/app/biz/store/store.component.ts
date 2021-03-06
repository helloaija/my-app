import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {StoreService} from './store.service';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';

@Component({
    selector: 'view-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.less']
})

export class StoreComponent implements OnInit {
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
        // 库存总值
        storeAmount: 0,
        // 库存不为0数量
        hasStoreNum: 0,
        // 库存为0数量
        noStoreNum:0
    };

    // 遮罩
    isSpinning = false;

    productTypeOfOption = [{value: 'PESTICIDE', label: '农药'}, {value: 'MANURE', label: '化肥'}];

    constructor(private storeService: StoreService, private commonUtils: CommonUtils, private fb: FormBuilder) {
        this.queryForm = this.fb.group({
            title: ['', []],
            productType: ['', []]
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
        this.storeService.getProducts(this.commonUtils.nullTrim(this.table.filterParams)).pipe(
            finalize(() => {
                this.table.loading = false;
            })
        ).subscribe(data => {
            this.table.loading = false;
            if ('0000' == data['resultCode']) {
                // 库存总值
                this.table.storeAmount = data['result']['storeAmount'] ? data['result']['storeAmount'] : 0;
                // 库存不为0数量
                this.table.hasStoreNum = data['result']['hasStoreNum'] ? data['result']['hasStoreNum'] : 0;
                // 库存为0数量
                this.table.noStoreNum = data['result']['noStoreNum'] ? data['result']['noStoreNum'] : 0;

                // table列表数据
                let pageBean = data['result']['pageBean'];
                this.table.total = pageBean['totalCount'];
                this.table.dataSet = pageBean['recordList'] ? pageBean['recordList'] : [];
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
