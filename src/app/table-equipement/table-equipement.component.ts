import { Component, EventEmitter, Input, isDevMode, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogCardEquipementComponent } from '../dialog-card-equipement/dialog-card-equipement.component';

import { DialogEquipementComponent } from '../dialog-equipement/dialog-equipement.component';

import { Equipement, Raretes } from '../struct';

@Component({
  selector: 'app-table-equipement',
  templateUrl: './table-equipement.component.html',
  styleUrls: ['./table-equipement.component.css'],
})
export class TableEquipementComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() equipements!: Equipement[];
  @Input() mode!: string;
  @Output('callParent') callParent: EventEmitter<unknown> = new EventEmitter();
  baseHref!: string;
  dataLength!: number;
  dataSource!: MatTableDataSource<Equipement>;

  displayedColumns = ['Nom', 'Rarete', 'Iles', 'Patch', 'Pouvoir', 'Caractéristiques', 'Dons', 'Action'];

  constructor(private dialog: MatDialog) {}

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadData(): void {
    this.dataSource = new MatTableDataSource<Equipement>(this.equipements);
    // https://stackoverflow.com/questions/49833315/angular-material-2-datasource-filter-with-nested-object
    this.dataSource.filterPredicate = (data: Equipement, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'patchs' ? currentTerm + JSON.stringify(data.patchs[0]) : currentTerm + data[key as keyof Equipement];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
    this.dataLength = this.equipements.length;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadData();
    this.baseHref = isDevMode() ? '../..' : 'WavenBuilder/';
  }

  openCard(equipement: Equipement, mode: string): void {
    this.dialog.open(DialogCardEquipementComponent, {
      width: '70%',
      data: {
        equipement: equipement,
        mode: mode,
      },
    });
  }

  openDialog(equipement: Equipement, mode: string): void {
    this.dialog
      .open(DialogEquipementComponent, {
        width: '70%',
        data: {
          equipement: equipement,
          mode: mode.slice(0, -1),
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        this.equipements[this.equipements.indexOf(equipement)] = response;
        this.equipements.sort((a: Equipement, b: Equipement) => {
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
