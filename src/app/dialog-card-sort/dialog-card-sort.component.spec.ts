import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardSortComponent } from './dialog-card-sort.component';

describe('DialogCardSortComponent', () => {
  let component: DialogCardSortComponent;
  let fixture: ComponentFixture<DialogCardSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogCardSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogCardSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
