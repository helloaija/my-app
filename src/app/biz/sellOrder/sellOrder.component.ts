import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';
import {NzMessageService} from 'ng-zorro-antd';
import {SellOrderEditComponent} from "./sellOrder-edit.component";
import {SellOrderService} from "./sellOrder.service";

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
        loading: true,
        operationOrder: null,
        filterParams: {}
    };

    // 遮罩
    isSpinning = false;

    editModel = {
        isVisible: false,
        title: '',
        isOkLoading: false
    };

    confirmModel = {
        isVisible: false,
        orderNumber: ''
    };

    @ViewChild('sellEditComponent')
    sellOrderEdit: SellOrderEditComponent;
    orderStatusOfOption = [{name: '未支付', value: 'UNPAY'}, {name: '未支付完', value: 'UNPAYALL'}, {name: '完成支付', value: 'HASPAYALL'}];

    constructor(private sellOrderService: SellOrderService, private commonUtils: CommonUtils, private fb: FormBuilder,
                private messageService: NzMessageService) {
        this.queryForm = this.fb.group({
            orderNumber: ['', []],
            orderStatus: ['', []],
            createTimeBegin: ['', []],
            createTimeEnd: ['', []],
            mobilePhone: ['', []],
            userName: ['', []],
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
        if (params['orderTimeBegin']) {
            params['orderTimeBegin'] = formatDate(params['orderTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['orderTimeEnd']) {
            params['orderTimeEnd'] = formatDate(params['orderTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }

        this.table.filterParams = this.commonUtils.nullTrim(params);

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

        this.table.filterParams['currentPage'] = this.table.pageIndex;
        this.table.filterParams['pageSize'] = this.table.pageSize;

        this.table.loading = true;
        // 请求订单数据
        this.sellOrderService.getSellOrders(this.table.filterParams).pipe(
            finalize(() => {
                this.table.loading = false;
            })
        ).subscribe(data => {
            if ('0000' == data['resultCode']) {
                let result = data['result'];
                this.table.total = result['totalCount'];
                this.table.dataSet = result['recordList'] ? result['recordList'] : [];
            }
        });
    }

    /**
     * 打开弹窗-新增
     */
    showAddForm(): void {
        this.sellOrderEdit.resetEditForm();
        this.editModel.title = `新增销售单`;
        this.editModel.isVisible = true;
    }

    /**
     * 打开弹窗-新增
     * @param data
     */
    showUpdateForm(data): void {
        this.editModel.title = `编辑销售单[${data['orderNumber']}]`;

        this.isSpinning = true;
        this.sellOrderService.getSellOrder(data.id).pipe(
            finalize(() => {
                this.isSpinning = false;
            })
        ).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.sellOrderEdit.setValues(resp['result']);
                this.editModel.isVisible = true;
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });
    }

    /**
     * 编辑表单-确认
     */
    editFormHandleOk(): void {
        if (!this.sellOrderEdit.validForm()) {
            return;
        }

        let params = this.sellOrderEdit.getValues();
        console.log(params);

        if (params['id']) {
            // 更新
            this.editModel.isOkLoading = true;
            this.sellOrderService.updateSellOrder(params).pipe(
                finalize(() => {
                    this.editModel.isOkLoading = false;
                })
            ).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.editFormHandleCancel();
                    this.searchData(true);
                    this.messageService.create('info', '更新销售单成功！');
                } else {
                    this.messageService.create('error', resp['resultMessage']);
                }
            });
        } else {
            // 新增
            this.editModel.isOkLoading = true;
            this.sellOrderService.addSellOrder(params).pipe(
                finalize(() => {
                    this.editModel.isOkLoading = false;
                })
            ).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.editFormHandleCancel();
                    this.searchData(true);
                    this.messageService.create('info', '新增销售单成功！');
                } else {
                    this.messageService.create('error', resp['resultMessage']);
                }
            });
        }
    }

    /**
     * 编辑表单-取消
     */
    editFormHandleCancel(): void {
        this.sellOrderEdit.clearProductField();
        this.editModel.isVisible = false;
    }

    /**
     * 删除订单
     * @param order
     */
    delSellOrder(order): void {
        this.table.operationOrder = order;
        this.confirmModel.orderNumber = order['orderNumber'];
        this.confirmModel.isVisible = true;
    }

    /**
     * 删除订单-取消
     */
    confirmHandleCancel(): void {
        this.confirmModel.isVisible = false;
    }

    /**
     * 删除订单-确认
     */
    confirmHandleOk(): void {
        this.confirmModel.isVisible = false;

        let orderId = this.table.operationOrder.id;
        this.isSpinning = true;
        this.sellOrderService.deleteSellOrder(orderId).pipe(
            finalize(() => {
                this.isSpinning = false;
            })
        ).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.messageService.create('info', '删除进货单成功！');
                this.searchData(true);
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });
    }
}

@Pipe({name: 'sellOrderStatusType'})
export class SellOrderStatusPipe implements PipeTransform {
    transform(value: string): string {
        let params = {UNPAY: '未支付', UNPAYALL: '未支付完', HASPAYALL: '完成支付'};
        return params[value];
    }
}
