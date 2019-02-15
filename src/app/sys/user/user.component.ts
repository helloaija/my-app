import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from './user.service';
import {finalize} from 'rxjs/operators';
import {NzFormatEmitEvent, NzMessageService, NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
    selector: 'view-user-manage',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.less']
})

export class UserComponent implements OnInit {
    isSpinning = false;

    // 角色表格
    table = {
        dataSet: [],
        loading: false,
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        optRow: null
    };

    // 抽屉
    drawer = {visible: false, title: '新增角色', roleList: []};

    // 角色标点
    userForm: FormGroup;

    // 确认对话框
    confirmModel = {
        isVisible: false,
        content: ''
    }

    @ViewChild('menuTree')
    menuTree: NzTreeComponent;

    constructor(private userService: UserService, private messageService: NzMessageService, private fb: FormBuilder) {
        this.userForm = this.fb.group({
            id: ['', []],
            userName: ['', [Validators.required]],
            realName: ['', [Validators.required]],
            telPhone: ['', [Validators.required]],
            roleId: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.loadRoles(true);
    }

    /**
     * 加载角色列表
     */
    loadRoles(reset: boolean = false): void {
        if (reset) {
            this.table.pageIndex = 1;
        }

        let params = {currentPage: this.table.pageIndex, pageSize: this.table.pageSize};

        this.table.loading = true;
        this.userService.getUsers(params).pipe(finalize(() => {
            this.table.loading = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                let result = data['result'];
                this.table.total = result['totalCount'];
                this.table.dataSet = result['recordList'] ? result['recordList'] : [];
            } else {
                this.messageService.create('error', data['resultMessage']);
            }
        });
    }

    /**
     * 打开表单-新增
     */
    showAddForm(): void {
        this.userForm.reset({id: '', userName: '', realName: '', telPhone: '', roleId: ''});
        this.isSpinning = true;
        this.userService.getUserAndRole('').pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.drawer['title'] = '新增用户';
                this.drawer.roleList = resp['result']['roleList'];
                this.drawer['visible'] = true;
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });
    }

    /**
     * 打开表单-更新
     * @param data
     */
    showEditForm(data): void {
        this.isSpinning = true;
        this.userService.getUserAndRole(data.id).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.drawer.roleList = resp['result']['roleList'];
                let user = resp['result']['user'];
                user['roleId'] = '' + resp['result']['roleId'];
                this.userForm.patchValue(user);
                this.drawer['title'] = `编辑用户[${data.userName}]`;
                this.drawer['visible'] = true;
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });
    }

    /**
     * 保存角色
     */
    saveRole(): void {
        for (const i in this.userForm.controls) {
            this.userForm.controls[i].markAsDirty();
            this.userForm.controls[i].updateValueAndValidity();
        }

        if (this.userForm.invalid) {
            return;
        }

        let params = this.userForm.getRawValue();

        params['roleIds'] = new Array(params['roleId']);

        if (params['id'] == null || params['id'] == '') {
            // 添加用户
            this.isSpinning = true;
            this.userService.addUser(params).pipe(finalize(() => {
                this.isSpinning = false;
            })).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.messageService.create('info', '添加角色成功！');
                    this.loadRoles(true);
                    this.closeRoleForm();
                } else {
                    this.messageService.create('error', resp['resultMessage']);
                }
            });
        } else {
            // 更新用户
            this.isSpinning = true;
            this.userService.updateUser(params).pipe(finalize(() => {
                this.isSpinning = false;
            })).subscribe(resp => {
                if ('0000' == resp['resultCode']) {
                    this.messageService.create('info', '更新角色成功！');
                    this.loadRoles(true);
                    this.closeRoleForm();
                } else {
                    this.messageService.create('error', resp['resultMessage']);
                }
            });
        }
    }

    /**
     * 获取给定节点的所有子孙节点
     * @param treeNode
     */
    getAllChildNodes(treeNode: NzTreeNode): NzTreeNode[] {
        let me = this;
        let result = [];
        if (treeNode == null) {
            return result;
        }

        if (treeNode.getChildren() != null && treeNode.getChildren().length > 0) {
            result = result.concat(treeNode.getChildren());
            treeNode.getChildren().forEach(function(node) {
                result = result.concat(me.getAllChildNodes(node));
            });
        }

        return result;
    }

    /**
     * 关闭编辑框
     */
    closeRoleForm(): void {
        this.drawer['visible'] = false;
    }

    /**
     * 删除角色
     * @param data
     */
    delUser(data): void {
        this.table.optRow = data;
        this.confirmModel.content = data['userName'];
        this.confirmModel.isVisible = true;
    }

    /**
     * 确认对话框-同意
     */
    confirmHandleOk(): void {
        this.confirmModel.isVisible = false;
        this.isSpinning = true;
        this.userService.delUser(this.table.optRow['id']).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.messageService.create('info', '删除角色成功！');
                this.loadRoles(true);
            } else {
                this.messageService.create('error', resp['resultMessage']);
            }
        });
    }

    /**
     * 确认对话框-取消
     */
    confirmHandleCancel(): void {
        this.confirmModel.isVisible = false;
    }
}
