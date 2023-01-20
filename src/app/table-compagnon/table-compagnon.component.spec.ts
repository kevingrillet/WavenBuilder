import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCompagnonComponent } from './table-compagnon.component';

describe('TableCompagnonComponent', () => {
  let component: TableCompagnonComponent;
  let fixture: ComponentFixture<TableCompagnonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableCompagnonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableCompagnonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
