import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesMasterPage } from './badges-master.page';

describe('BadgesMasterPage', () => {
  let component: BadgesMasterPage;
  let fixture: ComponentFixture<BadgesMasterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesMasterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesMasterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
