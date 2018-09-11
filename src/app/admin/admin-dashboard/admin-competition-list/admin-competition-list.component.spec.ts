import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCompetitionListComponent } from './admin-competition-list.component';

describe('AdminCompetitionListComponent', () => {
  let component: AdminCompetitionListComponent;
  let fixture: ComponentFixture<AdminCompetitionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCompetitionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCompetitionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
