import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPointsPage } from './admin-points.page';

describe('AdminPointsPage', () => {
  let component: AdminPointsPage;
  let fixture: ComponentFixture<AdminPointsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPointsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
