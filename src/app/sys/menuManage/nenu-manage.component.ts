import {Component, OnInit} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';
import {FormBuilder, Validators} from '@angular/forms';
import {CommonUtils} from '../../common/CommonUtils';

@Component({
    selector: 'view-menu-manage',
    templateUrl: './menu-manage.component.html',
    styleUrls: ['./menu-manage.component.less']
})

export class MenuManageComponent implements OnInit {

    nodes: any;
    editForm: any;
    isSpinning = false;

    constructor(private fb: FormBuilder,
                private commonUtils: CommonUtils, private messageBar: NzMessageService) {
    }

    nodeClick(event: NzFormatEmitEvent): void {
        console.log(event);
    }

    ngOnInit(): void {
        this.editForm = this.fb.group({
            email: [null, [Validators.email, Validators.required]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required]],
            nickname: [null, [Validators.required]],
            phoneNumberPrefix: ['+86'],
            phoneNumber: [null, [Validators.required]],
            website: [null, [Validators.required]],
            captcha: [null, [Validators.required]],
            agree: [false]
        });

        this.nodes = [{
            title: 'parent 1',
            key: '100',
            expanded: true,
            children: [{
                title: 'parent 1-0',
                key: '1001',
                expanded: true,
                children: [
                    {title: 'leaf', key: '10010', isLeaf: true},
                    {title: 'leaf', key: '10011', isLeaf: true},
                    {title: 'leaf', key: '10012', isLeaf: true}
                ]
            }, {
                title: 'parent 1-1',
                key: '1002',
                children: [
                    {title: 'leaf', key: '10020', isLeaf: true}
                ]
            }, {
                title: 'parent 1-2',
                key: '1003',
                children: [
                    {title: 'leaf', key: '10030', isLeaf: true},
                    {title: 'leaf', key: '10031', isLeaf: true}
                ]
            }]
        }];
    }
}
