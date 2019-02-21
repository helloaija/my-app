import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from "../../common/CommonUtils";
import {formatDate} from "@angular/common";
import {NzMessageService} from "ng-zorro-antd";
import {BuyerEditComponent} from "./buyer-edit.component";
import {BuyerService} from "./buyer.service";
import {p} from "@angular/core/src/render3";

@Component({
    selector: 'view-buyer',
    templateUrl: './buyer.component.html',
    styleUrls: ['./buyer.component.less']
})

export class BuyerComponent implements OnInit {
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

    // 编辑表单窗口
    editModel = {
        isVisible: false,
        isOkLoading: false,
        title: ''
    };

    @ViewChild('buyerEditComponent')
    buyerEditComponent: BuyerEditComponent;

    // 遮罩
    isSpinning = false;

    constructor(private fb: FormBuilder, private sellerService: BuyerService,
                private commonUtils: CommonUtils, private messageBar: NzMessageService) {
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

        this.table.filterParams = this.commonUtils.nullTrim(params);

        this.searchData(true);
    }

    // 重置查询表单
    resetForm(): void {
        this.queryForm.reset();
    }


    ngOnInit(): void {
        this.queryForm = this.fb.group({
            userName: [null, []],
            mobilePhone: [null, []],
            createTimeBegin: [null, []],
            createTimeEnd: [null, []]
        });

        this.searchData(true);
    }

    /**
     * 加载数据
     * @param reset
     */
    searchData(reset: boolean = false): void {
        if (reset) {
            this.table.pageIndex = 1;
        }

        this.table.loading = true;
        this.table.filterParams['currentPage'] = this.table.pageIndex;
        this.table.filterParams['pageSize'] = this.table.pageSize;
        // 请求产品数据
        this.sellerService.listBuyer(this.table.filterParams).pipe(
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

    /**
     * 打开编辑表单-添加
     */
    addFormShow(): void {
        this.editModel.title = "添加买家";
        this.editModel.isVisible = true;
        this.buyerEditComponent.resetForm();
    }

    /**
     * 打开编辑表单-更新
     * @param userId
     */
    updateFormShow(record): void {
        this.isSpinning = true;
        this.editModel.title = `更新买家[${record.userName}]`;
        this.buyerEditComponent.resetForm();

        this.sellerService.getBuyer(record.id).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.buyerEditComponent.setValues(data['result']);
                this.editModel.isVisible = true;
            } else {
                this.messageBar.create('error', data['resultMessage']);
            }
        });
    }

    /**
     * 编辑表单弹窗-取消关闭
     */
    editFormHandleCancel(): void {
        this.editModel.isVisible = false;
    }

    /**
     * 编辑表单弹窗-确定
     */
    editFormHandleOk(): void {
        this.editModel.isOkLoading = true;
        if (this.buyerEditComponent.validForm()) {
            let params = this.buyerEditComponent.getValues();
            if (params['id']) {
                this.sellerService.updateBuyer(params).pipe(
                    finalize(() => {
                        this.editModel.isOkLoading = false;
                    })
                ).subscribe(data => {
                    if ('0000' == data['resultCode']) {
                        this.searchData(true);
                        this.editModel.isVisible = false;
                    } else {
                        this.messageBar.create('error', data['resultMessage']);
                    }
                });
            } else {
                this.sellerService.insertBuyer(params).pipe(
                    finalize(() => {
                        this.editModel.isOkLoading = false;
                    })
                ).subscribe(data => {
                    if ('0000' == data['resultCode']) {
                        this.searchData(true);
                        this.editModel.isVisible = false;
                    } else {
                        this.messageBar.create('error', data['resultMessage']);
                    }
                });
            }
        }
    }
}
