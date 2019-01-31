import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProductService} from './product.service';
import {ProductAddComponent} from './product-add.component';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from "../../common/CommonUtils";
import {formatDate} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'view-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.less']
})

export class ProductComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    pageIndex = 1;
    pageSize = 10;
    total = 1;
    dataSet = [];
    loading = true;

    // 添加表单窗口
    isAddFormVisible = false;
    isAddFormOkLoading = false;
    // productaddcomponent驼峰命名会找不到组件
    @ViewChild('productaddcomponent')
    private productAddComponent: ProductAddComponent;

    // 确认框属性
    isConfirmVisible = false;

    // 当前操作产品
    currentOptProduct = {};
    productTypeOfOption = [{value: 'PESTICIDE', label: '农药'}, {value: 'MANURE', label: '化肥'}];

    constructor(private fb: FormBuilder, private productService: ProductService,
                private commonUtils: CommonUtils, private messageBar: NzMessageService) {
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
        this.queryForm = this.fb.group({
            title: [null, []],
            productType: [null, []],
            createTimeBegin: [null, []],
            createTimeEnd: [null, []]
        });

        this.searchData();
    }

    // 加载数据
    searchData(reset: boolean = false): void {
        if (reset) {
            this.pageIndex = 1;
        }

        this.loading = true;

        let params = this.queryForm.value;
        params['currentPage'] = this.pageIndex;
        params['pageSize'] = this.pageSize;
        if (params['createTimeBegin']) {
            params['createTimeBegin'] = formatDate(params['createTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['createTimeEnd']) {
            params['createTimeEnd'] = formatDate(params['createTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }

        // 请求产品数据
        this.productService.getProducts(this.commonUtils.nullTrim(params)).pipe(
            finalize(() => {
                this.loading = false;
            })
        ).subscribe(data => {
            this.loading = false;
            if ('0000' == data['resultCode']) {
                let result = data['result'];
                this.total = result['totalCount'];
                this.dataSet = result['recordList'] ? result['recordList'] : [];
            }
        });
    }

    // 打开添加表单弹窗
    showAddForm(): void {
        this.isAddFormVisible = true;

        // 重置表单
        this.productAddComponent.resetForm();
    }

    // 添加表单弹窗-取消关闭
    addFormHandleCancel(): void {
        this.isAddFormVisible = false;
    }

    // 添加表单弹窗-确定
    addFormHandleOk(): void {
        this.isAddFormOkLoading = true;
        if (this.productAddComponent.validForm()) {
            let params = this.productAddComponent.getValues();
            this.productService.saveProduct(params).pipe(
                finalize(() => {
                    this.isAddFormOkLoading = false;
                })
            ).subscribe(data => {
                if ('0000' == data['resultCode']) {
                    this.searchData(true);
                    this.isAddFormVisible = false;
                } else {
                    this.messageBar.create('error', data['resultMessage']);
                }
            });
        }
    }

    /**
     * 删除产品
     * @param productId
     */
    delProduct(product): void {
        this.isConfirmVisible = true;
        this.currentOptProduct = product;
    }

    /**
     * 确认对话框-关闭
     */
    confirmHandleCancel(): void {
        this.isConfirmVisible = false;
    }

    /**
     * 确认对话框-确认
     */
    confirmHandleOk(): void {
        this.isConfirmVisible = false;

        this.productService.delProduct(this.currentOptProduct['id']).subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.messageBar.create('info', '删除成功');
                this.searchData(true);
            } else {
                this.messageBar.create('error', data['resultMessage']);
            }
        });
    }

}

@Pipe({name: 'productType'})
export class ProductTypePipe implements PipeTransform {
    transform(value: string): string {
        let params = {PESTICIDE: "农药", MANURE: "化肥"};
        return params[value];
    }
}
