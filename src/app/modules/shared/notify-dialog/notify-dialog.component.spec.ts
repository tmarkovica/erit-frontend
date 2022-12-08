import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotifyDialogComponent } from './notify-dialog.component';

describe('NewContentDialogComponent', () => {
  let component: NotifyDialogComponent;
  let fixture: ComponentFixture<NotifyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotifyDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotifyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
