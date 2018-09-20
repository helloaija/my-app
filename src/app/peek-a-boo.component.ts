import {OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
  AfterViewChecked, OnDestroy} from "@angular/core";

import {Component, Input} from "@angular/core";

@Component({
  selector: 'peek-a-boo',
  template: "<p>Now you see my hero, {{name}}</p>",
  styles: ['p {background: LightYellow; padding: 8px}']
})

export class PeekABooComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,
    AfterViewChecked, OnDestroy {

  @Input()  name: string;

  constructor() {
    console.log("constructor");
  }

  ngOnChanges() {console.log("ngOnChanges");}

  ngOnInit() {console.log("ngOnInit");}

  ngDoCheck() {console.log("ngDoCheck");}

  ngAfterContentInit() {console.log("ngAfterContentInit");}

  ngAfterContentChecked() {console.log("ngAfterContentChecked");}

  ngAfterViewInit() {console.log("ngAfterViewInit");}

  ngAfterViewChecked() {console.log("ngAfterViewChecked");}

  ngOnDestroy() {console.log("ngOnDestroy");}
}
