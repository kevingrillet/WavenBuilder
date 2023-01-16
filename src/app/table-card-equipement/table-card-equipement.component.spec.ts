import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardEquipementComponent } from './table-card-equipement.component';

describe('TableCardEquipementComponent', () => {
  let component: TableCardEquipementComponent;
  let fixture: ComponentFixture<TableCardEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCardEquipementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCardEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
