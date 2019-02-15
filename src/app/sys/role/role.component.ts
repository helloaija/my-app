import {Component, OnInit, ViewChild} from '@angular/core';
import {RoleService} from './role.service';
import {finalize} from 'rxjs/operators';
import {NzFormatEmitEvent, NzMessageService, NzTreeComponent, NzTreeNode} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
    selector: 'view-role-manage',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.less']
})

export class RoleComponent implements OnInit {
    isSpinning = false;

    //角色表格
    table = {
        dataSet: [],
        loading: false,
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        optRow: null
    };

    // 抽屉
    drawer = {visible: false, title: '新增角色'};

    // 角色标点
    roleForm: FormGroup;

    // 菜单树
    tree = {
        defaultCheckedKeys: [],
        defaultSelectedKeys: [],
        defaultExpandedKeys: [],
        nodes: []
    };

    // 确认对话框
    confirmModel = {
        isVisible: false,
        content: ''
    }

    @ViewChild('menuTree')
    menuTree: NzTreeComponent;

    constructor(private roleService: RoleService, private messageService: NzMessageService, private fb: FormBuilder) {
        this.roleForm = this.fb.group({
            id: ['', []],
            roleCode: ['', [Validators.required]],
            roleName: ['', [Validators.required]],
            remark: ['', []]
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
        this.roleService.getRoles(params).pipe(finalize(() => {
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
        this.roleForm.reset({id: '', roleCode: '', roleName: '', remark: ''});
        this.isSpinning = true;
        this.roleService.getMenus().pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.tree.nodes = resp['result'];
                this.drawer['title'] = '新增角色';
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
        this.roleService.getRoleAndMenu(data.id).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(resp => {
            if ('0000' == resp['resultCode']) {
                this.roleForm.patchValue(resp['result']['role']);
                this.tree.nodes = resp['result']['menu'];
                this.drawer['title'] = `编辑角色[${data.roleName}]`;
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
        for (const i in this.roleForm.controls) {
            this.roleForm.controls[i].markAsDirty();
            this.roleForm.controls[i].updateValueAndValidity();
        }

        if (this.roleForm.invalid) {
            return;
        }

        let me = this;
        let allCheckedNodeList = [];
        let params = this.roleForm.getRawValue();
        let checkedNodeList = this.menuTree.getCheckedNodeList();
        let halfCheckedNodeList = this.menuTree.getHalfCheckedNodeList();

        // 获取checkBox选中状态的节点
        if (checkedNodeList != null && checkedNodeList.length > 0) {
            checkedNodeList.forEach(function(node) {
                allCheckedNodeList = allCheckedNodeList.concat(me.getAllChildNodes(node));
            })
            allCheckedNodeList = allCheckedNodeList.concat(checkedNodeList);
        }

        // 获取半选中状态的节点
        if (halfCheckedNodeList != null && halfCheckedNodeList.length > 0) {
            allCheckedNodeList = allCheckedNodeList.concat(halfCheckedNodeList);
        }

        if (allCheckedNodeList.length == 0) {
            this.messageService.create('error', '请选择菜单权限！');
            return;
        }

        let allCheckedNodeKey = [];
        allCheckedNodeList.forEach(function(node) {
            if (node['key'] != null && node['key'] != 0 && node['key'] != '') {
                allCheckedNodeKey.push(node['key']);
            }
        });

        params['menuIds'] = allCheckedNodeKey;

        if (params['id'] == null || params['id'] == '') {
            // 添加角色
            this.isSpinning = true;
            this.roleService.addRole(params).pipe(finalize(() => {
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
            // 更新角色
            this.isSpinning = true;
            this.roleService.updateRole(params).pipe(finalize(() => {
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
    delRole(data): void {
        this.table.optRow = data;
        this.confirmModel.content = data['roleName'];
        this.confirmModel.isVisible = true;
    }

    /**
     * 确认对话框-同意
     */
    confirmHandleOk(): void {
        this.confirmModel.isVisible = false;
        this.isSpinning = true;
        this.roleService.delRole(this.table.optRow['id']).pipe(finalize(() => {
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
