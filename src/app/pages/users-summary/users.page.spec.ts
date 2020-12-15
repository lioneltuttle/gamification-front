import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersSummary } from './users.page';

describe('UsersComponent', () => {
  let component: UsersSummary;
  let fixture: ComponentFixture<UsersSummary>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersSummary ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
