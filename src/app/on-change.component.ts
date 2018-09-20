import {Component, Input, OnChanges, DoCheck, SimpleChanges} from "@angular/core";
import {Hero} from "./hero";

@Component({
  selector: "on-changes",
  template: `
    <div class="hero">
      <p>{{hero.name}} can {{power}}</p>
    </div>
  `,
  styles: [
    '.hero {background: LightYellow; padding: 8px; margin-top: 8px}',
    'p {background: Yellow; padding: 8px; margin-top: 8px}'
  ]
})

export class OnChangeComponent implements OnChanges, DoCheck {
  @Input() hero: Hero;
  @Input() power: string;

  oldHeroName = "";

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let changeObj = changes[propName];
      console.log(propName + ":" + changeObj.previousValue + " -> " + changeObj.currentValue);
    }
  }

  ngDoCheck() {
    console.log("ngCheck:" + this.oldHeroName + " -> " + this.hero.name);
    this.oldHeroName = this.hero.name;
  }
}

@Component({
  selector: "on-changes-parent",
  template: `
    <div class="parent">
    <h2>{{title}}</h2>

    <table>
      <tr><td>Power: </td><td><input [(ngModel)]="power"></td></tr>
      <tr><td>Hero.name: </td><td><input [(ngModel)]="hero.name"></td></tr>
    </table>

    <on-changes [hero]="hero" [power]="power"></on-changes>
    </div>
  `,
  styles: ['.parent {background: Lavender;}']
})

export class OnChangeParentComponent {
  hero: Hero;
  power: string;
  title: "OnChanges";

  constructor() {
    this.hero = new Hero(1, "");
  }
}


