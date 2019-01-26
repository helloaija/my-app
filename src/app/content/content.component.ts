import {Component} from '@angular/core';

@Component({
  templateUrl: "./content.component.html",
  styleUrls: ['./content.component.less']
})

export class ContentComponent {
  tabs = ['首页'];
  selectedIndex = 0;

  closeTab(tab: string): void {
    this.tabs.splice(this.tabs.indexOf(tab), 1);
  }

  newTab(tab: string): void {
    var tapIndex = this.tabs.indexOf(tab);
    if (tapIndex == -1) {
      this.tabs.push(tab);
      this.selectedIndex = this.tabs.length;
      return;
    }

    this.selectedIndex = tapIndex;
  }

}

