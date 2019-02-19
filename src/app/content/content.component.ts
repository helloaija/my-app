import {Component, EventEmitter} from '@angular/core';

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

    // newTab(e: EventEmitter<any>): void {
        // var tapIndex = this.tabs.indexOf(tab);
        // if (tapIndex == -1) {
        //     this.tabs.push(tab);
        //     this.selectedIndex = this.tabs.length;
        //     return;
        // }
        //
        // this.selectedIndex = tapIndex;
    // }

    menuTree = [{
        "title": "Item-1",
        "iconClass": "fa fa fa-flask",
        "link": "#1",
        "notice": 0,
        "subMenus": null
    }, {
        "title": "Item-2", "iconClass": "fa fa-level-down", "link": null, "notice": 0,
        "subMenus": [{
            "title": "Item-2-1",
            "iconClass": "fa fa fa-flask",
            "link": "#2",
            "notice": 0,
            "subMenus": null
        }, {
            "title": "Item-2-2",
            "iconClass": "fa fa fa-flask",
            "link": "#3",
            "notice": 0,
            "subMenus": null
        }]
    }, {
        "title": "Item-3", "iconClass": "fa fa-level-down", "link": null, "notice": 4,
        "subMenus": [{
            "title": "Item-3-1",
            "iconClass": "fa fa fa-flask",
            "link": "#4",
            "notice": 1,
            "subMenus": null
        }, {
            "title": "Item-3-2",
            "iconClass": "fa fa fa-flask",
            "link": null,
            "notice": 3,
            "subMenus": [
                {
                    "title": "Item-3-2-1",
                    "iconClass": "fa fa fa-flask",
                    "link": "#6",
                    "notice": 1,
                    "subMenus": null
                },
                {
                    "title": "Item-3-2-2",
                    "iconClass": "fa fa fa-flask",
                    "link": "#7",
                    "notice": 2,
                    "subMenus": [
                        {
                            "title": "Item-4-2-1",
                            "iconClass": "fa fa fa-flask",
                            "link": "#6",
                            "notice": 1,
                            "subMenus": null
                        },
                        {
                            "title": "Item-4-2-2",
                            "iconClass": "fa fa fa-flask",
                            "link": "#7",
                            "notice": 2,
                            "subMenus": [
                                {
                                    "title": "Item-5-2-1",
                                    "iconClass": "fa fa fa-flask",
                                    "link": "#6",
                                    "notice": 1,
                                    "subMenus": null
                                },
                                {
                                    "title": "Item-5-2-2",
                                    "iconClass": "fa fa fa-flask",
                                    "link": "#7",
                                    "notice": 2,
                                    "subMenus": null
                                }]
                        }]
                }]
        }]
    }];

}

