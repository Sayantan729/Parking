import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpotsDialogComponent } from './edit-spots-dialog.component';

describe('EditSpotsDialogComponent', () => {
  let component: EditSpotsDialogComponent;
  let fixture: ComponentFixture<EditSpotsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSpotsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpotsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
