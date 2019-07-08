import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatMoisPage } from './resultat-mois.page';

describe('ResultatMoisPage', () => {
  let component: ResultatMoisPage;
  let fixture: ComponentFixture<ResultatMoisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatMoisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatMoisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
