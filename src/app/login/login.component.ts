import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup, Validators
} from '@angular/forms';
import {LoginService} from "./login.service";

@Component({
  templateUrl: "./login.component.html"
})

export class LoginComponent {
  loginService: LoginService;
  loginForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  errorText: string;

  constructor(loginFb: FormBuilder, loginService: LoginService) {
    this.loginService = loginService;
    this.loginForm = loginFb.group({
      'userName': [''],
      'password': ['']
    });

    this.userName = this.loginForm.controls['userName'];
    this.password = this.loginForm.controls['password'];

    this.loginForm.valueChanges.subscribe(
      (form: any) => {
        this.errorText = ``;
      }
    );
  }

  doLogin(formData: any): void {
    if (!this.valid(formData)) {
      return;
    }

    this.loginService.doLogin()
      .subscribe((data: Response) => {
        debugger
      });
  }

  reset(formData: any) {
    this.loginForm.reset();
    this.errorText = ``;
    return false;
  }

  valid(formData: any): boolean {
    if (formData.userName == null || formData.userName.trim() == "") {
      this.errorText = `请输入用户名！`;
      return false;
    }
    if (formData.password == null || formData.password.trim() == "") {
      this.errorText = `请输入密码！`;
      return false;
    }

    return true;
  }
}
