import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureCreationFormComponent } from './fixture-creation-form.component';

describe('FixtureCreationFormComponent', () => {
  let component: FixtureCreationFormComponent;
  let fixture: ComponentFixture<FixtureCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixtureCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixtureCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
