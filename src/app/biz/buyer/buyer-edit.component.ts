import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from "../../common/CommonUtils";

@Component({
    selector: 'view-buyer-edit',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="editForm">
            <input nz-input formControlName="id" type="hidden">
            <nz-form-item>
                <nz-form-label nzFor="userName" nzRequired>买家名称</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="userName" placeholder="买家名称">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('userName').dirty && editForm.get('userName').errors">
                        请输入产品单位！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="mobilePhone">电话号码</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="mobilePhone" placeholder="电话号码">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('mobilePhone').dirty && editForm.get('mobilePhone').errors">
                        请输入产品单位！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="address">地址</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input nz-input formControlName="address" placeholder="地址" style="width: 647px;">
                    </nz-input-group>
                    <nz-form-explain *ngIf="editForm.get('address').dirty && editForm.get('address').errors">
                        请输入产品名称！
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <br/>

            <nz-form-item>
                <nz-form-label nzFor="remark">备注</nz-form-label>
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
            width: 80px;
        }`
    ]
})

export class BuyerEditComponent implements OnInit {
    editForm: FormGroup;

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
        return this.commonUtils.nullTrim(this.editForm.value);
    }

    /**
     * 表单赋值
     * @param params
     */
    public setValues(params): void {
        // 重置表单
        this.resetForm();
        this.editForm.patchValue(params);
    }

    public resetForm(): void {
        this.editForm.reset({
            id: '', userName: '', mobilePhone: '', address: '', remark: ''
        });
    }

    ngOnInit(): void {
        this.editForm = this.fb.group({
            id: ['', []],
            userName: ['', [Validators.required]],
            mobilePhone: ['', []],
            address: ['', []],
            remark: ['', []]
        });
    }
}

