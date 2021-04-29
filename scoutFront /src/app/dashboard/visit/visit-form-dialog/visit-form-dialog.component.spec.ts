import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitFormDialogComponent } from './visit-form-dialog.component';

describe('VisitFormDialogComponent', () => {
  let component: VisitFormDialogComponent;
  let fixture: ComponentFixture<VisitFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitFormDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
