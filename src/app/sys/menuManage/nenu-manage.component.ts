import {Component, OnInit, ViewChild} from '@angular/core';
import {NzFormatEmitEvent, NzMessageService, NzTreeComponent} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommonUtils} from '../../common/CommonUtils';
import {MenuManageService} from "./nenu-manage.service";
import {finalize} from "rxjs/operators";

@Component({
    selector: 'view-menu-manage',
    templateUrl: './menu-manage.component.html',
    styleUrls: ['./menu-manage.component.less']
})

export class MenuManageComponent implements OnInit {
    // 树节点数据
    nodes: any;
    editForm: FormGroup;
    isSpinning = false;
    isEditFormShow = false;
    isConfirmVisible = false;


    // 当前编辑的菜单父ID
    parentId: any;
    // 当前编辑节点ID，新增则为空
    menuId: any;
    // 删除的节点title
    deleteNodeTitle: string;
    // 编辑表单标题
    editFormTitle: string;

    @ViewChild('menuTree')
    menuTree: NzTreeComponent;

    constructor(private fb: FormBuilder, private menuService: MenuManageService,
                private commonUtils: CommonUtils, private messageBar: NzMessageService) {
    }

    ngOnInit(): void {
        this.isSpinning = true;
        this.menuService.getMenuTree().pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.nodes = data['result'];
            } else {
                this.messageBar.create("error", data['resultMessage']);
            }
        });

        this.editForm = this.fb.group({
            name: ['', [Validators.required]],
            menuCode: ['', [Validators.required]],
            menuType: ['MENU', [Validators.required]],
            url: ['', [Validators.required]],
            status: ['enable', [Validators.required]],
            remark: ['', []]
        });
    }

    /**
     * 点击节点
     * @param event
     */
    nodeClick(event: NzFormatEmitEvent): void {
        // 根目录
        if (null == event.node.key) {
            this.isEditFormShow = false;
            return;
        }

        this.editFormTitle = `编辑节点[${event.node.title}]`;
        this.isEditFormShow = true;

        this.isSpinning = true;
        this.menuService.getMenu(event.node.key).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.parentId = data['result']['parentId'];
                this.menuId = data['result']['id'];

                this.editForm.patchValue(data['result']);
            } else {
                this.messageBar.create('error', data['resultMessage'])
            }
        });
    }

    /**
     * 添加子节点
     */
    addNodeClick(): void {
        let selectedNodeList = this.menuTree.getSelectedNodeList();
        if (selectedNodeList == null || selectedNodeList.length == 0) {
            this.messageBar.create('warning', '请选择父节点');
            return;
        }

        this.editFormTitle = `添加子节点，父节点[${selectedNodeList[0]['title']}]`;
        this.isEditFormShow = true;
        this.resetForm();
        this.parentId = selectedNodeList[0]['key'];
        this.menuId = '';
    }

    /**
     * 删除节点
     */
    delNodeClick(): void {
        let selectedNodeList = this.menuTree.getSelectedNodeList();
        if (selectedNodeList == null || selectedNodeList.length == 0) {
            this.messageBar.create('warning', '请选择需要删除的节点！');
            return;
        }

        if (selectedNodeList[0].key == '' || selectedNodeList[0].key == '0' || selectedNodeList[0].key == null) {
            this.messageBar.create('warning', '不能删除根节点节点！');
            return;
        }

        this.isConfirmVisible = true;
        this.deleteNodeTitle = selectedNodeList[0].title;
    }

    /**
     * 提交数据
     */
    submitForm(): void {
        for (const i in this.editForm.controls) {
            this.editForm.controls[i].markAsDirty();
            this.editForm.controls[i].updateValueAndValidity();
        }

        if (this.editForm.invalid) {
            return;
        }

        if (null == this.menuId || '' == this.menuId) {
            this.isSpinning = true;
            this.menuService.addMenu(this.getSaveData()).pipe(finalize(() => {
                this.isSpinning = false;
            })).subscribe(data => {
                if ('0000' == data['resultCode']) {
                    let addNodes = [];
                    addNodes.push(data['result']);
                    this.menuTree.getSelectedNodeList()[0].addChildren(addNodes);
                    this.isEditFormShow = false;
                    this.messageBar.create('info', '添加节点成功！');
                } else {
                    this.messageBar.create('error', data['resultMessage']);
                }
            });
        } else {
            this.isSpinning = true;
            this.menuService.updateMenu(this.getSaveData()).pipe(finalize(() => {
                this.isSpinning = false;
            })).subscribe(data => {
                if ('0000' == data['resultCode']) {
                    this.menuTree.getSelectedNodeList()[0].title = this.getSaveData()['name'];
                    this.messageBar.create('info', '更新节点成功！');
                } else {
                    this.messageBar.create('error', data['resultMessage']);
                }
            });
        }
    }

    /**
     * 重置表单
     */
    resetForm(): void {
        this.editForm.reset({menuType: 'MENU', status: 'enable'});
    }

    /**
     * 获取保存数据
     */
    getSaveData(): object {
        let params = this.editForm.getRawValue();
        params['id'] = this.menuId;
        params['parentId'] = this.parentId;
        return params;
    }

    /**
     * 确认对话框-取消
     */
    confirmHandleCancel(): void {
        this.isConfirmVisible = false;
    }

    /**
     * 确认对话框-确认
     */
    confirmHandleOk(): void {
        this.isConfirmVisible = false;

        let selectedNode = this.menuTree.getSelectedNodeList()[0];

        this.isSpinning = true;
        this.menuService.deleteMenu(selectedNode['key']).pipe(finalize(() => {
            this.isSpinning = false;
        })).subscribe(data => {
            if ('0000' == data['resultCode']) {
                this.isEditFormShow = false;

                let childrens = [];
                let parentNode = selectedNode.getParentNode();
                parentNode.getChildren().forEach(function (node, index) {
                    if (node != selectedNode) {
                        childrens.push(node);
                    }
                });

                parentNode.clearChildren();
                parentNode.addChildren(childrens);

                this.messageBar.create('info', '删除节点成功！');
            } else {
                this.messageBar.create('error', data['resultMessage']);
            }
        });
    }
}
