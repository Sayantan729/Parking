import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFailComponent } from './edit-fail.component';

describe('EditFailComponent', () => {
  let component: EditFailComponent;
  let fixture: ComponentFixture<EditFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
