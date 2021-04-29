import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitDeleteDialogComponent } from './visit-delete-dialog.component';

describe('VisitDeleteDialogComponent', () => {
  let component: VisitDeleteDialogComponent;
  let fixture: ComponentFixture<VisitDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitDeleteDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
