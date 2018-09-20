import { Component } from '@angular/core';
import { Hero } from "./hero"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "英雄列表";
  heroes = [new Hero(1, "熊猫"), new Hero(2, "兔子"), new Hero(3, "小强")];
  myHero = this.heroes[0];

  addHero(heroName) {
    var len = this.heroes.length;
    this.heroes[len] = new Hero(len + 1, heroName);
  }
}
