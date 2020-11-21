import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelFailComponent } from './cancel-fail.component';

describe('CancelFailComponent', () => {
  let component: CancelFailComponent;
  let fixture: ComponentFixture<CancelFailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelFailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelFailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
