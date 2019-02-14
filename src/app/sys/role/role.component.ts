import {Component, OnInit} from '@angular/core';
import {RoleService} from './role.service';
import {finalize} from 'rxjs/operators';
import {NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';

@Component({
    selector: 'view-role-manage',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.less']
})

export class RoleComponent implements OnInit {
    isSpinning = false;

    table = {
        dataSet: [],
        loading: false,
        total: 0
    };

    drawer = {visible: false, title: '新增角色'};

    tree = {
        defaultCheckedKeys: [],
        defaultSelectedKeys: [],
        defaultExpandedKeys: [],
        nodes: []
    };

    constructor(private roleService: RoleService, private messageService: NzMessageService) {

    }

    ngOnInit(): void {
        this.loadRoles();
    }

    /**
     * 加载角色列表
     */
    loadRoles(): void {
        this.table.loading = true;
        this.roleService.getRoles().pipe(finalize(() => {
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

    showEditForm(): void {
        this.loadTree();
        this.drawer['visible'] = true;
    }

    closeEditForm(): void {
        this.drawer['visible'] = false;
    }

    loadTree(): void {
        this.tree.nodes = [{
            title: '0-0',
            key: '0-0',
            expanded: true,
            children: [{
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {title: '0-0-0-0', key: '0-0-0-0', isLeaf: true},
                    {title: '0-0-0-1', key: '0-0-0-1', isLeaf: true},
                    {title: '0-0-0-2', key: '0-0-0-2', isLeaf: true}
                ]
            }, {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {title: '0-0-1-0', key: '0-0-1-0', isLeaf: true},
                    {title: '0-0-1-1', key: '0-0-1-1', isLeaf: true},
                    {title: '0-0-1-2', key: '0-0-1-2', isLeaf: true}
                ]
            }, {
                title: '0-0-2',
                key: '0-0-2',
                isLeaf: true
            }]
        }, {
            title: '0-1',
            key: '0-1',
            children: [
                {title: '0-1-0-0', key: '0-1-0-0', isLeaf: true},
                {title: '0-1-0-1', key: '0-1-0-1', isLeaf: true},
                {title: '0-1-0-2', key: '0-1-0-2', isLeaf: true}
            ]
        }, {
            title: '0-2',
            key: '0-2',
            expanded: true,
            children: [{
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {title: '0-0-0-0', key: '0-0-0-0', isLeaf: true},
                    {title: '0-0-0-1', key: '0-0-0-1', isLeaf: true},
                    {title: '0-0-0-2', key: '0-0-0-2', isLeaf: true}
                ]
            }, {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {title: '0-0-1-0', key: '0-0-1-0', isLeaf: true},
                    {title: '0-0-1-1', key: '0-0-1-1', isLeaf: true},
                    {title: '0-0-1-2', key: '0-0-1-2', isLeaf: true}
                ]
            }, {
                title: '0-0-2',
                key: '0-0-2',
                isLeaf: true
            }]
        }, {
            title: '0-1',
            key: '0-1',
            children: [
                {title: '0-1-0-0', key: '0-1-0-0', isLeaf: true},
                {title: '0-1-0-1', key: '0-1-0-1', isLeaf: true},
                {title: '0-1-0-2', key: '0-1-0-2', isLeaf: true}
            ]
        }];
    }

    nzEvent(event: NzFormatEmitEvent): void {
        console.log(event);
    }
}
