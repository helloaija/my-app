import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'view-left-menu',
    template: `
        <div *ngFor="let item of menuTree">
            <li nz-submenu *ngIf="item.children && item.children.length > 0">
                <span title>{{item.title}}</span>
                <ul>
                    <view-left-menu [menuTree]="item.children" (onItemClickEvent)="itemClick($event)"></view-left-menu>
                </ul>
            </li>
            <li *ngIf="!item.children || item.children.length == 0"
                nz-menu-item (click)="itemClick(item)">{{item.title}}
            </li>
        </div>
    `,
    styles: []
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

