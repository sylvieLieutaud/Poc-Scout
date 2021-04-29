import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListCaseComponent } from './my-list-case.component';

describe('MyListCaseComponent', () => {
  let component: MyListCaseComponent;
  let fixture: ComponentFixture<MyListCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
