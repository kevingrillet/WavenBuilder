import { Component, EventEmitter, Input, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCardSortComponent } from '../dialog-card-sort/dialog-card-sort.component';
import { DialogSortComponent } from '../dialog-sort/dialog-sort.component';
import { Highlighter } from '../highlighter';
import { Elements, Sort } from '../struct';

@Component({
  selector: 'app-table-sort',
  templateUrl: './table-sort.component.html',
  styleUrls: ['./table-sort.component.css'],
})
export class TableSortComponent implements OnInit {
  public highlight = Highlighter.highlight;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() sorts!: Sort[];
  @Input() mode!: string;
  @Output('callParent') callParent: EventEmitter<unknown> = new EventEmitter();
  baseHref!: string;
  dataLength!: number;
  dataSource!: MatTableDataSource<Sort>;

  displayedColumns = ['Nom', 'Element', 'Patch', 'Cout', 'Gain', 'Effet', 'Dons', 'Action'];

  constructor(private dialog: MatDialog) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData(): void {
    this.dataSource = new MatTableDataSource<Sort>(this.sorts);
    // https://stackoverflow.com/questions/49833315/angular-material-2-datasource-filter-with-nested-object
    this.dataSource.filterPredicate = (data: Sort, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'patchs' ? currentTerm + JSON.stringify(data.patchs[0]) : currentTerm + data[key as keyof Sort];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataLength = this.sorts.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadData();
    this.baseHref = isDevMode() ? '../..' : '.';
  }

  openCard(sort: Sort): void {
    this.dialog.open(DialogCardSortComponent, {
      width: '70%',
      data: {
        spell: sort,
      },
    });
  }

  openDialog(sort: Sort, sorts: Sort[]): void {
    this.dialog
      .open(DialogSortComponent, {
        width: '70%',
        data: {
          spell: sort,
          spells: sorts,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        this.sorts[this.sorts.indexOf(sort)] = response;
        this.sorts.sort((a: Sort, b: Sort) => {
          if (a.element !== b.element) {
            return Elements[a.element] > Elements[b.element] ? 1 : -1;
          }
          if (a.patchs[0].cout !== b.patchs[0].cout) {
            return a.patchs[0].cout > b.patchs[0].cout ? 1 : -1;
          }
          return a.nom.localeCompare(b.nom);
        });
        this.loadData();
        this.callParent.emit();
      });
  }
}
