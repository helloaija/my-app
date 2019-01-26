import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {MenuManageComponent} from "./nenu-manage.component";

describe('HelloWorldComponent', () => {
  let component: MenuManageComponent;
  let fixture: ComponentFixture<MenuManageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuManageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
