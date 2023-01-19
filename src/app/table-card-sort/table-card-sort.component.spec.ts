import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCardSortComponent } from './table-card-sort.component';

describe('TableCardSortComponent', () => {
  let component: TableCardSortComponent;
  let fixture: ComponentFixture<TableCardSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCardSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCardSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
