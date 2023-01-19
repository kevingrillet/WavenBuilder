import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSortComponent } from './dialog-sort.component';

describe('DialogSortComponent', () => {
  let component: DialogSortComponent;
  let fixture: ComponentFixture<DialogSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
