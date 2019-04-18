import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from '../../common/CommonUtils';
import {formatDate} from '@angular/common';
import {SellOrderService} from './sellOrder.service';

@Component({
    selector: 'view-sell-order-edit',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="editForm">
            <input nz-input formControlName="id" type="hidden">
            <nz-form-item>
                <nz-form-label nzFor="orderAmount" nzRequired>订单价格</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-input-number formControlName="orderAmount" [nzMin]="0" [nzMax]="9999999" [nzStep]="0.1"
                                         [nzPlaceHolder]="'请输入订单价格'" [nzPrecision]="2" [nzDisabled]="true"
                                         style="width: 165px;">
                        </nz-input-number>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('orderAmount').dirty && editForm.get('orderAmount').errors">
                        请输入订单价格！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="hasPayAmount" nzRequired>已支付金额</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-input-number formControlName="hasPayAmount" [nzMin]="0" [nzMax]="9999999" [nzStep]="0.1"
                                         [nzPlaceHolder]="'请输入已支付金额'" [nzPrecision]="2" style="width: 165px;">
                        </nz-input-number>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('hasPayAmount').dirty && editForm.get('hasPayAmount').errors">
                        请输入已支付金额！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>

            <nz-form-item>
                <nz-form-label nzFor="userId">购买用户</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-select formControlName="userId"
                                   (nzScrollToBottom)="loadUserOptions(false)"
                                   (nzOnSearch)="searchUser($event)"
                                   (nzOpenChange)="userOpenChange($event)"
                                   nzPlaceHolder="请选择产品" nzAllowClear nzShowSearch nzServerSearch="true"
                                   style="width: 160px;">
                            <nz-option *ngFor="let opt of userIdCom.optionList" [nzValue]="opt.id"
                                       [nzLabel]="opt.userName"></nz-option>
                            <nz-option *ngIf="userIdCom.isLoading" nzDisabled nzCustomContent>
                                <i nz-icon type="loading" class="loading-icon"></i> Loading Data...
                            </nz-option>
                        </nz-select>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="payTime">支付时间</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-date-picker nzShowTime nzFormat="yyyy-MM-dd HH:mm:ss" nzPlaceHolder="请输入支付时间"
                                        formControlName="payTime" [nzStyle]="{width: '165px'}"></nz-date-picker>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('payTime').dirty && editForm.get('payTime').errors">
                        请输入支付时间！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="orderTime" nzRequired>销售时间</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-date-picker nzShowTime nzFormat="yyyy-MM-dd HH:mm:ss" nzPlaceHolder="请输入销售时间"
                                        formControlName="orderTime" [nzStyle]="{width: '165px'}"></nz-date-picker>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('orderTime').dirty && editForm.get('orderTime').errors">
                        请输入销售时间！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>

            <br/>

            <nz-form-item>
                <nz-form-label nzFor="remark">备注</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <textarea nz-input formControlName="remark" placeholder="备注说明" style="width: 647px;"
                                  [nzAutosize]="{minRows: 4, maxRows: 4}"></textarea>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>

            <br/>

            <div style="height: 30px;background: aliceblue; line-height: 30px;">
                <label style="margin-left: 10px;
                          font-weight: bold;">销售产品信息</label>
                <button nz-button nzSize="small" (click)="addProductField()"
                        style="float: right; right: 10px; top: 3px;">增加产品
                </button>
            </div>
            <div *ngFor="let control of productArray;let i = index">
                <input nz-input [formControlName]="control.idControl" type="hidden">
                <input nz-input [formControlName]="control.titleControl" type="hidden">

                <nz-form-item>
                    <nz-form-label class="product-label" [nzFor]="control.productIdControl" nzRequired>产品</nz-form-label>
                    <nz-form-control>
                        <nz-select [formControlName]="control.productIdControl"
                                   (nzScrollToBottom)="loadMore(control, false)"
                                   (nzOnSearch)="searchProduct(control, $event)"
                                   (nzOpenChange)="productOpenChange(control, $event)"
                                   (ngModelChange)="productSelectChange(control, $event)"
                                   nzPlaceHolder="请选择产品" nzAllowClear nzShowSearch nzServerSearch="true"
                                   style="width: 160px;">
                            <nz-option *ngFor="let product of control.selectData.optionList" [nzValue]="product.id"
                                       [nzLabel]="product.title"></nz-option>
                            <nz-option *ngIf="control.selectData.isLoading" nzDisabled nzCustomContent>
                                <i nz-icon type="loading" class="loading-icon"></i> Loading Data...
                            </nz-option>
                        </nz-select>
                        <nz-form-explain
                                *ngIf="editForm.get(control.titleControl).dirty && editForm.get(control.titleControl).errors">
                            请选择产品！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
                
                <nz-form-item>
                    <nz-form-label class="product-label">单位</nz-form-label>
                    <nz-form-control>
                        <input nz-input [formControlName]="control.unitControl"
                               style="width: 50px;border: none;" disabled>
                    </nz-form-control>
                </nz-form-item>

                <nz-form-item>
                    <nz-form-label class="product-label" [nzFor]="control.stockPriceControl" nzRequired>进价</nz-form-label>
                    <nz-form-control>
                        <nz-select [formControlName]="control.stockPriceControl"
                                   style="width: 100px;">
                            <nz-option *ngFor="let stockPrice of control.stockPriceOptionList" [nzValue]="stockPrice"
                                       [nzLabel]="stockPrice"></nz-option>
                        </nz-select>
                        <nz-form-explain
                                *ngIf="editForm.get(control.stockPriceControl).dirty && editForm.get(control.stockPriceControl).errors">
                            请选择进价！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
                
                <nz-form-item>
                    <nz-form-label class="product-label" [nzFor]="control.priceControl" nzRequired>售价</nz-form-label>
                    <nz-form-control>
                        <nz-input-number [formControlName]="control.priceControl" [nzMin]="0" [nzMax]="99999"
                                         [nzStep]="0.1"
                                         [nzPlaceHolder]="'请填写单价'" [nzPrecision]="2" [nzDisabled]="false"
                                         [attr.id]="control.index" (ngModelChange)="calcOrderAmount()"
                                         style="width: 100px;">
                        </nz-input-number>
                        <nz-form-explain
                                *ngIf="editForm.get(control.priceControl).dirty && editForm.get(control.priceControl).errors">
                            请填写单价！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
                <nz-form-item>
                    <nz-form-label class="product-label" [nzFor]="control.numberControl" nzRequired>数量</nz-form-label>
                    <nz-form-control>
                        <nz-input-number [formControlName]="control.numberControl" [nzMin]="0" [nzMax]="999"
                                         [nzStep]="1"
                                         [nzPlaceHolder]="'请填写数量'" [nzPrecision]="0" [nzDisabled]="false"
                                         [attr.id]="control.index" (ngModelChange)="calcOrderAmount()" style="width: 60px;">
                        </nz-input-number>
                        <i nz-icon type="minus-circle-o" class="dynamic-delete-button"
                           (click)="removeProductField(control, $event)"
                           style="margin-left: 15px;"></i>
                        <nz-form-explain
                                *ngIf="editForm.get(control.numberControl).dirty && editForm.get(control.numberControl).errors">
                            请填写数量！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
            </div>
        </form>
    `,
    styles: [
            `nz-form-label {
            width: 90px;
        }
        
        .product-label {
            width: 60px;
        }`
    ]
})

export class SellOrderEditComponent implements OnInit {
    editForm: FormGroup;
    // 产品列表属性
    productArray: Array<SellProduct> = [];
    // 用户选择属性
    userIdCom = {
        currentPage: 1, pageSize: 10, totalCount: 0, isLoading: false, isInit: false, queryName: '', optionList: []
    };

    constructor(private fb: FormBuilder, private commonUtils: CommonUtils, private sellOrderService: SellOrderService, private el: ElementRef) {
        this.editForm = this.fb.group({
            id: ['', []],
            orderAmount: ['0', [Validators.required]],
            // modifyAmount: ['', [Validators.required]],
            hasPayAmount: ['0', [Validators.required]],
            // orderStatus: ['', [Validators.required]],
            payTime: ['', []],
            orderTime: ['', [Validators.required]],
            remark: ['', []],
            userId: ['', []]
        });
    }

    ngOnInit(): void {
    }

    public validForm(): boolean {

        for (const i in this.editForm.controls) {
            this.editForm.controls[i].markAsDirty();
            this.editForm.controls[i].updateValueAndValidity();
        }

        if (this.editForm.invalid) {
            return false;
        }

        return true;
    }

    /**
     * 获取表单数据
     */
    public getValues(): any {
        let formValue = this.commonUtils.nullTrim(this.editForm.value);
        if (formValue['orderTime']) {
            formValue['orderTime'] = formatDate(formValue['orderTime'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }
        if (formValue['payTime']) {
            formValue['payTime'] = formatDate(formValue['payTime'], 'yyyy-MM-dd HH:mm:ss', 'zh-Hans');
        }

        let params = {};

        Object.keys(formValue).forEach(function (key) {
            if (key.startsWith('sellProductList')) {
                params[key.replace('_', '.')] = formValue[key];
            } else {
                params[key] = formValue[key];
            }
        });

        return params;
    }

    /**
     * 表单赋值
     * @param params
     */
    public setValues(params): void {
        // 重置表单
        this.editForm.reset();
        this.resetUserCom();
        var userOpt = {id: params['userId'], userName: params['userName']};
        this.userIdCom.optionList.push(userOpt);
        this.editForm.patchValue(params);
        this.setProductValues(params['sellProductList']);
    }

    public resetEditForm(): void {
        this.resetUserCom();
        this.editForm.reset({orderAmount: 0, hasPayAmount: 0});
        this.addProductField();
    }

    /**
     * 设置产品列表值
     * @param productList
     */
    setProductValues(productList: Array<any>): void {
        if (productList == null || productList.length == 0) {
            this.addProductField();
            return;
        }

        for (let i = 0; i < productList.length; i++) {
            const control = new SellProduct(i, `sellProductList[${i}]_id`, `sellProductList[${i}]_productId`, `sellProductList[${i}]_productTitle`,
                `sellProductList[${i}]_productUnit`, `sellProductList[${i}]_stockPrice`, `sellProductList[${i}]_price`, `sellProductList[${i}]_number`,
                {optionList: []}, []);
            this.productArray.push(control);
            this.addProductControl(control, productList[i]);
            control.selectData['optionList'].push({id: productList[i]['productId'], title: productList[i]["productTitle"]});
            control.stockPriceOptionList.push(productList[i]['stockPrice']);
        }
    }

    /**
     * 添加进货产品
     * @param e
     */
    addProductField(e?: MouseEvent): void {
        if (e) {
            e.preventDefault();
        }
        const idx = (this.productArray.length > 0) ? this.productArray[this.productArray.length - 1].index + 1 : 0;

        const control = new SellProduct(idx, `sellProductList[${idx}]_id`, `sellProductList[${idx}]_productId`, `sellProductList[${idx}]_productTitle`,
            `sellProductList[${idx}]_productUnit`, `sellProductList[${idx}]_stockPrice`, `sellProductList[${idx}]_price`, `sellProductList[${idx}]_number`,
            {searchStr: '', optionList: []}, []);

        const index = this.productArray.push(control);

        this.addProductControl(control);

        this.loadMore(control, true);
    }

    /**
     * 添加到FormGroup中
     * @param control
     */
    addProductControl(control: SellProduct,
                      values?: { id: number, productId: number, productTitle: string, productUnit: string, price: number, number: number }): void {
        this.editForm.addControl(control.idControl, new FormControl(values ? values['id'] : ''));
        this.editForm.addControl(control.productIdControl, new FormControl(values ? values['productId'] : '', Validators.required));
        this.editForm.addControl(control.titleControl, new FormControl(values ? values['productTitle'] : '', Validators.required));
        this.editForm.addControl(control.unitControl, new FormControl(values ? values['productUnit'] : '', Validators.required));
        this.editForm.addControl(control.priceControl, new FormControl(values ? values['price'] : '', Validators.required));
        this.editForm.addControl(control.numberControl, new FormControl(values ? values['number'] : '', Validators.required));
        this.editForm.addControl(control.stockPriceControl, new FormControl(values ? values['stockPrice'] : '', Validators.required));
    }

    /**
     * 删除进货产品
     * @param i
     * @param e
     */
    removeProductField(i: SellProduct, e?: MouseEvent): void {
        if (e) {
            e.preventDefault();
        }
        if (this.productArray.length > 1) {
            const index = this.productArray.indexOf(i);
            this.productArray.splice(index, 1);

            this.removeProductControl(i);
        }
    }

    /**
     * 移除出FormGroup
     * @param control
     */
    removeProductControl(control: SellProduct): void {
        this.editForm.removeControl(control.idControl);
        this.editForm.removeControl(control.productIdControl);
        this.editForm.removeControl(control.titleControl);
        this.editForm.removeControl(control.unitControl);
        this.editForm.removeControl(control.priceControl);
        this.editForm.removeControl(control.numberControl);
        this.editForm.removeControl(control.stockPriceControl);
    }

    clearProductField(): void {
        for (let i = 0; i < this.productArray.length; i++) {
            this.removeProductControl(this.productArray[i]);
        }

        this.productArray = [];
    }

    /**
     * 选择产品下拉框-下拉加载
     * @param control
     * @param searchStr 搜索文字
     */
    loadMore(control: any, reload: boolean = false, filterParams?: object): void {

        if (reload) {
            // 重新加载
            control.selectData['optionList'] = [];
            control.selectData['pageIndex'] = 1;
        } else {
            // 滚动加载
            control.selectData['pageIndex'] = control.selectData['pageIndex'] + 1;
            if (control.selectData['optionList'].length >= control.selectData['totalCount']) {
                return;
            }
        }

        let params = {currentPage: control.selectData['pageIndex']};

        if (filterParams) {
            params['title'] = filterParams['productTitle'] ? filterParams['productTitle'] : '';
            params['id'] = filterParams['productId'] ? filterParams['productId'] : '';
        }

        control.selectData['isLoading'] = true;
        this.sellOrderService.getProductInfos(params).subscribe(data => {
            control.selectData['isLoading'] = false;
            if (data['result']['recordList'] == null) {
                data['result']['recordList'] = [];
            }
            control.selectData['totalCount'] = data['result']['totalCount'];
            control.selectData['optionList'] = [...control.selectData['optionList'], ...data['result']['recordList']];
        });
    }

    /**
     * 选择产品下拉框-文字搜索
     * @param control
     */
    searchProduct(control: SellProduct, e: EventEmitter<string>): void {
        this.loadMore(control, true, {productTitle: String(e)});
    }

    /**
     * 产品下拉菜单打开状态变化回调
     * @param control
     * @param e
     */
    productOpenChange(control: SellProduct, e: EventEmitter<boolean>): void {
        if (e) {
            // 当展开时，判断是否需要重新加载下拉选项
            if (!control.selectData['isInit']) {
                control.selectData['isInit'] = true;
                this.loadMore(control, true);
            }
        }
    }

    /**
     * 产品选项改变触发
     * @param e
     */
    productSelectChange(control: SellProduct, e: EventEmitter<any[]>): void {

        if (!control.selectData) {
            return;
        }
        if (!control.selectData.optionList) {
            return;
        }
        if (control.selectData.optionList.length == 0) {
            return;
        }

        let selectedProduct = null;
        for (let i = 0; i < control.selectData.optionList.length; i++) {
            if (control.selectData.optionList[i].id == String(e)) {
                selectedProduct = control.selectData.optionList[i];
                break;
            }
        }

        if (selectedProduct == null) {
            return;
        }

        console.log('productSelectChange', selectedProduct);
        this.editForm.controls[control.titleControl].setValue(selectedProduct['title']);
        this.editForm.controls[control.priceControl].setValue(selectedProduct['price']);
        this.editForm.controls[control.unitControl].setValue(selectedProduct['productUnit']);
        this.editForm.controls[control.numberControl].setValue(1);
        // 加载进货价格选项
        control.stockPriceOptionList = selectedProduct['stockPrices'];
        if (selectedProduct['stockPrices'] && selectedProduct['stockPrices'].length > 0) {
            this.editForm.controls[control.stockPriceControl].setValue(selectedProduct['stockPrices'][0]);
        }
    }

    /**
     * 计算订单金额
     */
    calcOrderAmount(): void {
        let orderAmount = 0;
        for (let i = 0; i < this.productArray.length; i++) {
            let number = this.editForm.controls[this.productArray[i].numberControl].value;
            let price = this.editForm.controls[this.productArray[i].priceControl].value;
            orderAmount = orderAmount + (number * price);
        }
        this.editForm.controls['orderAmount'].setValue(orderAmount);
    }

    /**
     * 购买用户下拉框-加载下拉选项
     * @param reload
     * @param userName
     */
    loadUserOptions(reload: boolean = false): void {
        if (reload) {
            // 重新加载
            this.userIdCom['optionList'] = [];
            this.userIdCom['currentPage'] = 1;
        } else {
            // 滚动加载
            this.userIdCom['currentPage'] = this.userIdCom['currentPage'] + 1;
            if (this.userIdCom['optionList'].length >= this.userIdCom['totalCount']) {
                return;
            }
        }

        let params = {currentPage: this.userIdCom['currentPage'], userName: this.userIdCom['queryName']};

        this.userIdCom['isLoading'] = true;
        this.sellOrderService.listBuyer(params).subscribe(data => {
            this.userIdCom['isLoading'] = false;
            if (data['result']['recordList'] == null) {
                data['result']['recordList'] = [];
            }
            this.userIdCom['totalCount'] = data['result']['totalCount'];
            this.userIdCom['optionList'] = [...this.userIdCom['optionList'], ...data['result']['recordList']];
        });
    }

    /**
     *  购买用户下拉框-搜索用户
     * @param e
     */
    searchUser(e: EventEmitter<string>): void {
        this.userIdCom.queryName = String(e);
        this.loadUserOptions(true);
    }

    /**
     * 购买用户下拉框-打开状态变化回调
     * @param control
     * @param e
     */
    userOpenChange(e: EventEmitter<boolean>): void {
        if (e) {
            // 当展开时，判断是否需要重新加载下拉选项
            if (!this.userIdCom['isInit']) {
                this.userIdCom['isInit'] = true;
                this.userIdCom.queryName = '';
                this.loadUserOptions(true);
            }
        }
    }

    /**
     * 购买用户下拉框-重置
     */
    resetUserCom(): void {
        this.userIdCom = {
            currentPage: 1, pageSize: 10, totalCount: 0, isLoading: false, isInit: false, queryName: '', optionList: []
        };
    }
}

export class SellProduct {
    index: number;
    idControl: string;
    productIdControl: string;
    titleControl: string;
    unitControl: string;
    stockPriceControl: string;
    priceControl: string;
    numberControl: string;
    selectData: any;
    stockPriceOptionList: Array<number>;

    constructor(index, idControl, productIdControl, titleControl, unitControl, stockPriceControl, priceControl,
                numberControl, selectData, stockPriceOptionList) {
        this.index = index;
        this.idControl = idControl;
        this.productIdControl = productIdControl;
        this.titleControl = titleControl;
        this.unitControl = unitControl
        this.stockPriceControl = stockPriceControl;
        this.priceControl = priceControl;
        this.numberControl = numberControl;
        this.selectData = selectData;
        this.stockPriceOptionList = stockPriceOptionList;
    }
}
