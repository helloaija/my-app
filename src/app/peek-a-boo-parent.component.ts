import {OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy} from "@angular/core";

import {Component} from "@angular/core";

@Component({
  selector: 'peek-a-boo-parent',
  template: `
  <div class="parent">
    <h2>Peek-A-Boo</h2>

    <button (click)="toggleChild()">
      {{hasChild ? 'Destroy' : 'Create'}} PeekABooComponent
    </button>
    
    <!--<button (click)="updateHero()" [hidden]="!hasChild">Update Hero</button>-->

    <peek-a-boo *ngIf="hasChild" [name]="heroName"></peek-a-boo>

    <!--<h4>&#45;&#45; Lifecycle Hook Log &#45;&#45;</h4>-->
    <!--<div *ngFor="let msg of hookLog">{{msg}}</div>-->
  </div>
  `,
  styles: ['.parent {background: moccasin}']
})

export class PeekABooParentComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
    AfterViewChecked, OnDestroy {

  hasChild = false;

  heroName = "猪";

  constructor() {}

  ngOnChanges() {}

  ngOnInit() {}

  ngDoCheck() {}

  ngAfterContentInit() {}

  ngAfterContentChecked() {}

  ngAfterViewInit() {}

  ngAfterViewChecked() {}

  ngOnDestroy() {}

  toggleChild() {
    this.hasChild = !this.hasChild;
  }
}
