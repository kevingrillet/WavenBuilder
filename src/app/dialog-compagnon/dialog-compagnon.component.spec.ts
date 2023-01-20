import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompagnonComponent } from './dialog-compagnon.component';

describe('DialogCompagnonComponent', () => {
  let component: DialogCompagnonComponent;
  let fixture: ComponentFixture<DialogCompagnonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCompagnonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCompagnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
