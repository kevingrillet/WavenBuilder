import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardEquipementComponent } from './dialog-card-equipement.component';

describe('DialogCardEquipementComponent', () => {
  let component: DialogCardEquipementComponent;
  let fixture: ComponentFixture<DialogCardEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCardEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCardEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
