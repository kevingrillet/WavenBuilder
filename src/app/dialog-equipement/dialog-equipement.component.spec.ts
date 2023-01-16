import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquipementComponent } from './dialog-equipement.component';

describe('DialogEquipementComponent', () => {
  let component: DialogEquipementComponent;
  let fixture: ComponentFixture<DialogEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
