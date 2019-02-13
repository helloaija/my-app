import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from "../../common/CommonUtils";

@Component({
    selector: 'view-product-edit',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="editForm">
            <nz-form-item>
                <nz-form-label nzFor="title" nzRequired>名称</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="title" placeholder="产品名称" style="width: 647px;">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('title').dirty && editForm.get('title').errors">
                        请输入产品名称！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="productType" nzRequired>类型</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-select style="width: 165px;" formControlName="productType" [nzAllowClear]="true">
                            <nz-option *ngFor="let option of productTypeOfOption" [nzLabel]="option.label"
                                       [nzValue]="option.value"></nz-option>
                        </nz-select>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="productUnit" nzRequired>单位</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="productUnit" type="productUnit" placeholder="单位">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('productUnit').dirty && editForm.get('productUnit').errors">
                        请输入产品单位！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="price" nzRequired>价格</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <nz-input-number formControlName="price" [nzMin]="0" [nzMax]="9999999" [nzStep]="0.1"
                                         [nzPlaceHolder]="'价格'" [nzPrecision]="2" style="width: 165px;">
                        </nz-input-number>
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('price').dirty && editForm.get('price').errors">
                        请输入产品价格！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="remark">说明</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <textarea nz-input formControlName="remark" placeholder="说明" style="width: 647px;"
                                  [nzAutosize]="{minRows: 4, maxRows: 4}"></textarea>
                    </nz-input-group>
                </nz-form-control>
            </nz-form-item>
        </form>
    `,
    styles: [
            `nz-form-label {
            width: 60px;
        }`
    ]
})

export class ProductEditComponent implements OnInit {
    initData: any;
    editForm: FormGroup;

    productTypeOfOption = [{value: 'PESTICIDE', label: '农药'}, {value: 'MANURE', label: '化肥'}];

    constructor(private fb: FormBuilder, private commonUtils: CommonUtils) {
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
        formValue['id'] = this.initData['id'];
        return formValue;
    }

    /**
     * 表单赋值
     * @param params
     */
    public setValues(params): void {
        this.initData = params;
        // 重置表单
        this.editForm.reset();
        this.editForm.patchValue(params);
    }

    public resetForm(): void {
        this.editForm.reset();
        // 设置默认
        this.editForm.controls['productType'].setValue('MANURE');
    }

    ngOnInit(): void {
        this.editForm = this.fb.group({
            title: ['', [Validators.required]],
            productType: ['', [Validators.required]],
            productUnit: ['', [Validators.required]],
            price: ['', [Validators.required]],
            remark: ['', []]
        });
    }

}
