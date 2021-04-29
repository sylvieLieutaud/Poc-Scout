import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeVisitComponent } from './resume-visit.component';

describe('ResumeVisitComponent', () => {
  let component: ResumeVisitComponent;
  let fixture: ComponentFixture<ResumeVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeVisitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
