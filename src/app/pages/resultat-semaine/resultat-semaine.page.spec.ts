import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatSemainePage } from './resultat-semaine.page';

describe('ResultatSemainePage', () => {
  let component: ResultatSemainePage;
  let fixture: ComponentFixture<ResultatSemainePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatSemainePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatSemainePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
