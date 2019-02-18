import {Component, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {finalize} from 'rxjs/operators';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';
import {StockOrderService} from './stockOrder.service';
import {NzMessageService} from 'ng-zorro-antd';
import {StockOrderEditComponent} from './stockOrder-edit.component';

@Component({
    selector: 'view-stockOrder',
    templateUrl: './stockOrder.component.html',
    styleUrls: ['./stockOrder.component.less']
})

export class StockOrderComponent implements OnInit {
    // 查询框
    queryForm: FormGroup;

    // table属性
    table = {
        pageIndex: 1,
        pageSize: 10,
        total: 1,
        dataSet: [],
        loading: true,
        operationOrder: null
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

    @ViewChild('stockEditComponent')
    stockOrderEdit: StockOrderEditComponent;

    orderStatusOfOption = [{name: '未支付', value: 'UNPAY'}, {name: '已支付', value: 'HASPAY'}];

    constructor(private stockOrderService: StockOrderService, private commonUtils: CommonUtils, private fb: FormBuilder,
                private messageService: NzMessageService) {
        this.queryForm = this.fb.group({
            orderNumber: ['', []],
            orderStatus: ['', []],
            createTimeBegin: ['', []],
            createTimeEnd: ['', []]
        });
    }

    // 查询按钮
    query(): void {
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

        let params = this.queryForm.value;
        params['currentPage'] = this.table.pageIndex;
        params['pageSize'] = this.table.pageSize;
        if (params['createTimeBegin']) {
            params['createTimeBegin'] = formatDate(params['createTimeBegin'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (params['createTimeEnd']) {
            params['createTimeEnd'] = formatDate(params['createTimeEnd'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }

        // 请求订单数据
        this.stockOrderService.getStockOrders(this.commonUtils.nullTrim(params)).pipe(
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
        this.stockOrderEdit.resetEditForm();
        this.editModel.title = `新增进货单`;
        this.editModel.isVisible = true;
    }

    /**
     * 打开弹窗-新增
     * @param data
     */
    showUpdateForm(data): void {
        this.editModel.title = `编辑进货单[${data['orderNumber']}]`;

        this.isSpinning = true;
        this.stockOrderService.getStockOrder(data.id).pipe(
            finalize(() => {
                this.isSpinning = false;
            })
        ).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.stockOrderEdit.setValues(resp['result']);
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });

        this.editModel.isVisible = true;
    }

    /**
     * 编辑表单-确认
     */
    editFormHandleOk(): void {
        if (!this.stockOrderEdit.validForm()) {
            return;
        }

        let params = this.stockOrderEdit.getValues();
        console.log(params);

        if (params['id']) {
            // 更新
            this.editModel.isOkLoading = true;
            this.stockOrderService.updateStockOrder(params).pipe(
                finalize(() => {
                    this.editModel.isOkLoading = false;
                })
            ).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.editFormHandleCancel();
                    this.searchData(true);
                    this.messageService.create('info', '更新进货单成功！');
                } else {
                    this.messageService.create('error', resp['resultMessage']);
                }
            });
        } else {
            // 新增
            this.editModel.isOkLoading = true;
            this.stockOrderService.addStockOrder(params).pipe(
                finalize(() => {
                    this.editModel.isOkLoading = false;
                })
            ).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.editFormHandleCancel();
                    this.searchData(true);
                    this.messageService.create('info', '新增进货单成功！');
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
        this.stockOrderEdit.clearProductField();
        this.editModel.isVisible = false;
    }

    /**
     * 删除订单
     * @param order
     */
    delStockOrder(order): void {
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
        this.stockOrderService.deleteStockOrder(orderId).pipe(
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

@Pipe({name: 'orderStatusType'})
export class OrderStatusPipe implements PipeTransform {
    transform(value: string): string {
        let params = {UNPAY: '未支付', HASPAY: '已支付'};
        return params[value];
    }
}
