import { Component, Input, isDevMode, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Highlighter } from '../highlighter';
import { SortPatch } from '../struct';

@Component({
  selector: 'app-table-card-sort',
  templateUrl: './table-card-sort.component.html',
  styleUrls: ['./table-card-sort.component.css'],
})
export class TableCardSortComponent implements OnInit {
  public highlight = Highlighter.highlight;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() patchs!: SortPatch[];
  baseHref!: string;
  dataLength!: number;
  dataSource!: MatTableDataSource<SortPatch>;

  displayedColumns = ['Patch', 'Cout', 'Gain', 'Effet', 'Dons'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<SortPatch>(this.patchs);
    this.dataLength = this.patchs.length;
    this.baseHref = isDevMode() ? '../..' : '.';
  }
}
