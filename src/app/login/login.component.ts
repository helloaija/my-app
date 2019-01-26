import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
  selector: 'view-login',
  templateUrl: "./login.component.html",
  styleUrls: ['./login.component.less']
})

export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.invalid) {
      return;
    }

    this.router.navigateByUrl("content")
  }

  constructor(private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }
}
