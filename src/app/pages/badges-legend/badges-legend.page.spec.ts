import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesLegendPage } from './badges-legend.page';

describe('BadgesLegendPage', () => {
  let component: BadgesLegendPage;
  let fixture: ComponentFixture<BadgesLegendPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BadgesLegendPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgesLegendPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
