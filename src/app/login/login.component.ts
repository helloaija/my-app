import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
    FormBuilder,
    FormGroup,
    Validators
} from '@angular/forms';
import {LoginService} from "./login.service";
import {NzMessageService} from "ng-zorro-antd";
import {CommonService} from "../common/CommonService";

@Component({
    selector: 'view-login',
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
    validateForm: FormGroup;
    isSpinning = false;

    submitForm(): void {
        this.isSpinning = true;
        for (let i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
            this.validateForm.controls[i].updateValueAndValidity();
        }

        if (this.validateForm.invalid) {
            this.isSpinning = false;
            return;
        }

        let username = this.validateForm.controls["userName"].value;
        let password = this.validateForm.controls["password"].value;
        let validCode = this.validateForm.controls["validCode"].value;
        this.loginService.doLogin(username, password, validCode).subscribe(res => {
            if ('0000' == res['resultCode']) {
                // 保存token
                this.commonServie.setJwtToken(res['result']);
                this.router.navigateByUrl("content");
            } else {
                this.messageBar.create('error', res['resultMessage']);
            }
            this.isSpinning = false;
        }, error => {
            this.messageBar.create('error', `系统异常`);
            this.isSpinning = false;
        });
    }

    constructor(private fb: FormBuilder,
                private router: Router,
                private loginService: LoginService,
                private messageBar: NzMessageService,
                private commonServie: CommonService) {
    }

    ngOnInit(): void {
        this.validateForm = this.fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
            validCode: ['', [Validators.required]]
        });
    }
}
