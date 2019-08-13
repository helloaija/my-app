import {
    AfterViewInit,
    Component,
    Injector,
    Input,
    NgModuleFactoryLoader,
    OnInit,
    Type,
    ViewChild,
    ViewContainerRef
} from '@angular/core';

@Component({
    selector: 'view-content-tab',
    template: `
        <div #mainDiv></div>
    `
})

/**
 * 动态加载模块
 */
export class ContentTabComponent implements OnInit, AfterViewInit {
    @ViewChild('mainDiv', {read: ViewContainerRef})
    private mainDiv: ViewContainerRef;

    @Input()
    modulePath: string;

    constructor(private _injector: Injector, private loader: NgModuleFactoryLoader) {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {
        this.loader.load(this.modulePath).then((factory) => {
            const module = factory.create(this._injector);
            const r = module.componentFactoryResolver;
            const cmpFactory = r.resolveComponentFactory(module.instance['mainConponent']);

            const componentRef = cmpFactory.create(this._injector);
            this.mainDiv.insert(componentRef.hostView);
        });
    }

}


