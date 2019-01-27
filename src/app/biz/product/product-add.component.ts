import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'view-product-add',
    template: `
        <form nz-form [nzLayout]="'inline'" [formGroup]="AddForm">
            <nz-form-item>
                <nz-form-label nzFor="userName">产品编号根</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input formControlName="userName" nz-input placeholder="Username">
                    </nz-input-group>
                    <nz-form-explain *ngIf="AddForm.get('userName').dirty && AddForm.get('userName').errors">Please input your username!
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="password">产品</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input formControlName="password" nz-input type="password" placeholder="Password">
                    </nz-input-group>
                    <nz-form-explain *ngIf="AddForm.get('password').dirty && AddForm.get('password').errors">Please input your Password!
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
            <nz-form-item>
                <nz-form-label nzFor="password">产品编号</nz-form-label>
                <nz-form-control>
                    <nz-input-group>
                        <input formControlName="password" nz-input type="password" placeholder="Password">
                    </nz-input-group>
                    <nz-form-explain *ngIf="AddForm.get('password').dirty && AddForm.get('password').errors">Please input your Password!
                    </nz-form-explain>
                </nz-form-control>
            </nz-form-item>
        </form>
    `,
    styleUrls: []
})

export class ProductAddComponent implements OnInit {
    AddForm: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    public submitForm(): boolean {
        console.log("submitForm:" + this.AddForm.getRawValue());

        for (const i in this.AddForm.controls) {
            this.AddForm.controls[ i ].markAsDirty();
            this.AddForm.controls[ i ].updateValueAndValidity();
        }

        if (this.AddForm.invalid) {
            return false;
        }

        return true;
    }

    ngOnInit(): void {
        this.AddForm = this.fb.group({
            userName: [null, [Validators.required]],
            password: [null, [Validators.required]],
            remember: [true]
        });
    }

}
