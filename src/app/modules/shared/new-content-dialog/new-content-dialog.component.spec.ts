import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewContentDialogComponent } from './new-content-dialog.component';

describe('NewContentDialogComponent', () => {
  let component: NewContentDialogComponent;
  let fixture: ComponentFixture<NewContentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewContentDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewContentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
