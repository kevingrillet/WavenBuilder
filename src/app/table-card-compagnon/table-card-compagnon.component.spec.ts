import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardCompagnonComponent } from './table-card-compagnon.component';

describe('TableCardCompagnonComponent', () => {
  let component: TableCardCompagnonComponent;
  let fixture: ComponentFixture<TableCardCompagnonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCardCompagnonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCardCompagnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
