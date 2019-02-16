import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from '../../common/CommonUtils';

@Component({
    selector: 'view-stock-order-edit',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="editForm">
            <input nz-input formControlName="id" type="hidden">
            <nz-form-item>
                <nz-form-label nzFor="orderAmount" nzRequired>订单价格</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-input-number formControlName="orderAmount" [nzMin]="0" [nzMax]="9999999" [nzStep]="0.1"
                                         [nzPlaceHolder]="'请输入订单价格'" [nzPrecision]="2" style="width: 165px;">
                        </nz-input-number>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('orderAmount').dirty && editForm.get('orderAmount').errors">
                        请输入订单价格！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="modifyAmount" nzRequired>调整价格</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-input-number formControlName="modifyAmount" [nzMin]="0" [nzMax]="9999999" [nzStep]="0.1"
                                         [nzPlaceHolder]="'请输入调整价格'" [nzPrecision]="2" style="width: 165px;">
                        </nz-input-number>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('modifyAmount').dirty && editForm.get('modifyAmount').errors">
                        请输入调整价格！
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
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="orderStatus" nzRequired>订单状态</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-select style="width: 165px;" formControlName="orderStatus" [nzAllowClear]="true">
                            <nz-option *ngFor="let option of orderStatusOfOption" [nzLabel]="option.name"
                                       [nzValue]="option.value"></nz-option>
                        </nz-select>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="payTime" nzRequired>支付时间</nz-form-label>
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
                <nz-form-label nzFor="finishTime" nzRequired>完成时间</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-date-picker nzShowTime nzFormat="yyyy-MM-dd HH:mm:ss" nzPlaceHolder="请输入完成时间"
                                        formControlName="finishTime" [nzStyle]="{width: '165px'}"></nz-date-picker>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('finishTime').dirty && editForm.get('finishTime').errors">
                        请输入完成时间！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="supplierName">供应商名称</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="supplierName" placeholder="请输入供应商名称">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('supplierName').dirty && editForm.get('supplierName').errors">
                        请输入供应商名称！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="supplierPhone">供应商电话</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="supplierPhone" placeholder="请输入供应商电话">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('supplierPhone').dirty && editForm.get('supplierPhone').errors">
                        请输入供应商电话！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="supplierAddress">供应商地址</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <textarea nz-input formControlName="supplierAddress" placeholder="请输入供应商地址" style="width: 647px;"
                                  [nzAutosize]="{minRows: 4, maxRows: 4}"></textarea>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>

            <br/>

            <nz-form-item>
                <nz-form-label nzFor="supplierMessage">供应商信息</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <textarea nz-input formControlName="supplierMessage" placeholder="请输入供应商信息" style="width: 647px;"
                                  [nzAutosize]="{minRows: 4, maxRows: 4}"></textarea>
                    </nz-input-group>
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

            <div style="height: 45px;background: aliceblue;">
                <label>进货产品信息</label>
                <button nz-button nzSize="small" (click)="addProductField()"
                        style="float: right;margin-right: 20px;">增加产品
                </button>
            </div>
            <div *ngFor="let control of productArray;let i = index">
                <nz-form-item>
                    <nz-form-label [nzFor]="control.productControl">产品</nz-form-label>
                    <nz-form-control>
                        <input nz-input placeholder="请选择产品" [attr.id]="control.id"
                               [formControlName]="control.productControl">
                        <nz-form-explain
                                *ngIf="editForm.get(control.productControl).dirty && editForm.get(control.productControl).errors">
                            请选择产品！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
                <nz-form-item>
                    <nz-form-label [nzFor]="control.priceControl">单价</nz-form-label>
                    <nz-form-control>
                        <input nz-input placeholder="请填写单价" [attr.id]="control.id"
                               [formControlName]="control.priceControl">
                        <nz-form-explain
                                *ngIf="editForm.get(control.priceControl).dirty && editForm.get(control.priceControl).errors">
                            请填写单价！
                        </nz-form-explain>
                    </nz-form-control>
                </nz-form-item>
                <nz-form-item>
                    <nz-form-label [nzFor]="control.numberControl">数量</nz-form-label>
                    <nz-form-control>
                        <input nz-input placeholder="请填写数量" [attr.id]="control.id"
                               [formControlName]="control.numberControl" style="width: 100px;">
                        <i nz-icon type="minus-circle-o" class="dynamic-delete-button" (click)="removeProductField(control, $event)"
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
        }`
    ]
})

export class StockOrderEditComponent implements OnInit {
    editForm: FormGroup;

    orderStatusOfOption = [{name: '未支付', value: 'UNPAY'}, {name: '已支付', value: 'HASPAY'}];

    productArray: Array<{ id: number, productControl: string, priceControl: string, numberControl: string }> = [];

    constructor(private fb: FormBuilder, private commonUtils: CommonUtils) {
        this.editForm = this.fb.group({
            id: ['', []],
            orderAmount: ['', [Validators.required]],
            modifyAmount: ['', [Validators.required]],
            hasPayAmount: ['', [Validators.required]],
            orderStatus: ['', [Validators.required]],
            payTime: ['', [Validators.required]],
            finishTime: ['', [Validators.required]],
            supplierName: ['', [Validators.required]],
            supplierPhone: ['', [Validators.required]],
            supplierAddress: ['', [Validators.required]],
            supplierMessage: ['', [Validators.required]],
            remark: ['', []]
        });
    }

    ngOnInit(): void {
        this.addProductField();
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
        return formValue;
    }

    /**
     * 表单赋值
     * @param params
     */
    public setValues(params): void {
        // 重置表单
        this.editForm.reset();
        this.editForm.patchValue(params);
    }

    public resetForm(): void {
        this.editForm.reset({orderStatus: 'HASPAY'});
    }

    /**
     * 添加进货产品
     * @param e
     */
    addProductField(e?: MouseEvent): void {
        if (e) {
            e.preventDefault();
        }
        const id = (this.productArray.length > 0) ? this.productArray[this.productArray.length - 1].id + 1 : 0;

        const control = {
            id, productControl: `product${id}`, priceControl: `price${id}`, numberControl: `number${id}`
        };
        const index = this.productArray.push(control);
        console.log(this.productArray[this.productArray.length - 1]);
        this.editForm.addControl(this.productArray[index - 1].productControl, new FormControl('', Validators.required));
        this.editForm.addControl(this.productArray[index - 1].priceControl, new FormControl('', Validators.required));
        this.editForm.addControl(this.productArray[index - 1].numberControl, new FormControl('', Validators.required));
    }

    /**
     * 删除进货产品
     * @param i
     * @param e
     */
    removeProductField(i: { id: number, productControl: string, priceControl: string, numberControl: string }, e: MouseEvent): void {
        e.preventDefault();
        if (this.productArray.length > 1) {
            const index = this.productArray.indexOf(i);
            this.productArray.splice(index, 1);
            console.log(this.productArray);
            this.editForm.removeControl(i.productControl);
            this.editForm.removeControl(i.priceControl);
            this.editForm.removeControl(i.numberControl);
        }
    }

}
