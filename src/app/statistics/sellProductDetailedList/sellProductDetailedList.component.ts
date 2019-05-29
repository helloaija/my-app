import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SellProductDetailedListService} from './sellProductDetailedList.service';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';

@Component({
    selector: 'view-stat-sell_product_detailed',
    templateUrl: './sellProductDetailedList.component.html',
    styleUrls: ['./sellproductdetailedlist.component.less']
})

/**
 * 销售产品详细列表
 */
export class SellProductDetailedListComponent implements OnInit {
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

    constructor(private sellProductDetailedListService: SellProductDetailedListService, private commonUtils: CommonUtils, private fb: FormBuilder) {
        this.queryForm = this.fb.group({
            userName: ['', []],
            productTitle: ['', []],
            orderTimeBegin: ['', []],
            orderTimeEnd: ['', []]
        });
    }

    // 查询按钮
    query(): void {
        let params = this.queryForm.value;
        if (params['orderTimeBegin']) {
            params['orderTimeBegin'] = formatDate(params['orderTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['orderTimeEnd']) {
            params['orderTimeEnd'] = formatDate(params['orderTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
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
        this.sellProductDetailedListService.getSellProductPage(this.commonUtils.nullTrim(this.table.filterParams)).pipe(
            finalize(() => {
                this.table.loading = false;
            })
        ).subscribe(data => {
            this.table.loading = false;
            if ('0000' == data['resultCode']) {
                let result = data['result']['pageBean'];
                this.table.total = result['totalCount'];
                this.table.dataSet = result['recordList'] ? result['recordList'] : [];
            }
        });
    }

    /**
     * 导出
     */
    export(): void {
        this.sellProductDetailedListService.exportSellProductDetailFile(this.commonUtils.nullTrim(this.table.filterParams)).subscribe(data => {
            const blob = new Blob([data['body']], {type: 'application/vnd.ms-excel'});
            const objectUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', objectUrl);
            link.setAttribute('download', '销售产品明细表.xlsx');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(objectUrl);
            document.body.removeChild(link);
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
