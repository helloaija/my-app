import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'view-left-menu',
    template: `
        <div *ngFor="let item of menuTree">
            <li nz-submenu *ngIf="item.subMenus && item.subMenus.length > 0">
                <span title><i nz-icon type=""></i>{{item.title}}</span>
                <ul>
                    <view-left-menu [menuTree]="item.subMenus" (onItemClickEvent)="itemClick($event)"></view-left-menu>
                </ul>
            </li>
            <li *ngIf="!item.subMenus || item.subMenus.length == 0"
                nz-menu-item (click)="itemClick(item)">{{item.title}}
            </li>
        </div>
    `,
    styles: [
            `nz-form-label {
            width: 90px;
        }`
    ]
})

export class LeftMenuComponent {
    @Input()
    menuTree: any;

    @Output()
    onItemClickEvent: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    itemClick(item: any): void {
        this.onItemClickEvent.emit(item);
    }
}

