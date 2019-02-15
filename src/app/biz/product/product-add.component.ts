import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from "../../common/CommonUtils";

@Component({
    selector: 'view-product-add',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="addForm">
            <nz-form-item>
                <nz-form-label nzFor="title" nzRequired>名称</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="title" placeholder="产品名称" style="width: 647px;">
                    </nz-input-group>
                    <nz-form-explain *ngIf="addForm.get('title').dirty && addForm.get('title').errors">
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
                        <input nz-input formControlName="productUnit" placeholder="单位">
                    </nz-input-group>
                    <nz-form-explain *ngIf="addForm.get('productUnit').dirty && addForm.get('productUnit').errors">
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
                    <nz-form-explain *ngIf="addForm.get('price').dirty && addForm.get('price').errors">
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

export class ProductAddComponent implements OnInit {
    addForm: FormGroup;

    productTypeOfOption = [{value: 'PESTICIDE', label: '农药'}, {value: 'MANURE', label: '化肥'}];

    constructor(private fb: FormBuilder, private commonUtils: CommonUtils) {
    }

    public validForm(): boolean {

        for (const i in this.addForm.controls) {
            this.addForm.controls[i].markAsDirty();
            this.addForm.controls[i].updateValueAndValidity();
        }

        if (this.addForm.invalid) {
            return false;
        }

        return true;
    }

    /**
     * 获取表单数据
     */
    public getValues(): any {
        return this.commonUtils.nullTrim(this.addForm.value);
    }

    public resetForm() : void {
        this.addForm.reset();
        // 设置默认
        this.addForm.controls['productType'].setValue('MANURE');
    }

    ngOnInit(): void {
        this.addForm = this.fb.group({
            title: ['', [Validators.required]],
            productType: ['MANURE', [Validators.required]],
            productUnit: ['', [Validators.required]],
            price: ['', [Validators.required]],
            remark: ['', []]
        });
    }

}
