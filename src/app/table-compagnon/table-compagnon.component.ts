import { Component, EventEmitter, Input, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCardCompagnonComponent } from '../dialog-card-compagnon/dialog-card-compagnon.component';
import { DialogCompagnonComponent } from '../dialog-compagnon/dialog-compagnon.component';
import { Highlighter } from '../highlighter';
import { Compagnon, Raretes } from '../struct';

@Component({
  selector: 'app-table-compagnon',
  templateUrl: './table-compagnon.component.html',
  styleUrls: ['./table-compagnon.component.css'],
})
export class TableCompagnonComponent implements OnInit {
  public highlight = Highlighter.highlight;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() compagnons!: Compagnon[];
  @Output('callParent') callParent: EventEmitter<unknown> = new EventEmitter();
  baseHref!: string;
  dataLength!: number;
  dataSource!: MatTableDataSource<Compagnon>;

  displayedColumns = ['Nom', 'Rarete', 'Iles', 'Patch', 'Cout', 'Stats', 'Effet', 'Caractéristiques', 'Dons', 'Action'];

  constructor(private dialog: MatDialog) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData(): void {
    this.dataSource = new MatTableDataSource<Compagnon>(this.compagnons);
    // https://stackoverflow.com/questions/49833315/angular-material-2-datasource-filter-with-nested-object
    this.dataSource.filterPredicate = (data: Compagnon, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'patchs' ? currentTerm + JSON.stringify(data.patchs[0]) : currentTerm + data[key as keyof Compagnon];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataLength = this.compagnons.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadData();
    this.baseHref = isDevMode() ? '../..' : '.';
  }

  openCard(compagnon: Compagnon): void {
    this.dialog.open(DialogCardCompagnonComponent, {
      width: '70%',
      data: {
        compagnon: compagnon,
      },
    });
  }

  openDialog(compagnon: Compagnon, compagnons: Compagnon[]): void {
    this.dialog
      .open(DialogCompagnonComponent, {
        width: '70%',
        data: {
          compagnon: compagnon,
          compagnons: compagnons,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        this.compagnons[this.compagnons.indexOf(compagnon)] = response;
        this.compagnons.sort((a: Compagnon, b: Compagnon) => {
          if ((Object.keys(a.patchs[0].couts).length || 0) !== (Object.keys(b.patchs[0].couts).length || 0)) {
            return (Object.keys(a.patchs[0].couts).length || 0) > (Object.keys(b.patchs[0].couts).length || 0) ? 1 : -1;
          } else {
            for (const el of ['feu', 'air', 'terre', 'eau']) {
              if (a.patchs[0].couts[el] !== b.patchs[0].couts[el]) {
                if (!a.patchs[0].couts[el]) return 1;
                if (!b.patchs[0].couts[el]) return -1;
                return a.patchs[0].couts[el] > b.patchs[0].couts[el] ? 1 : -1;
              }
            }
          }
          if (a.rarete !== b.rarete) {
            return Raretes[a.rarete] > Raretes[b.rarete] ? 1 : -1;
          }
          return a.nom.localeCompare(b.nom);
        });
        this.loadData();
        this.callParent.emit();
      });
  }
}
