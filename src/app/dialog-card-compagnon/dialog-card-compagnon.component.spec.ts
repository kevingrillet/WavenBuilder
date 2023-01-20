import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardCompagnonComponent } from './dialog-card-compagnon.component';

describe('DialogCardCompagnonComponent', () => {
  let component: DialogCardCompagnonComponent;
  let fixture: ComponentFixture<DialogCardCompagnonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCardCompagnonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCardCompagnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
