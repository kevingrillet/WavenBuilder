import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEquipementComponent } from './table-equipement.component';

describe('TableEquipementComponent', () => {
  let component: TableEquipementComponent;
  let fixture: ComponentFixture<TableEquipementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEquipementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEquipementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
