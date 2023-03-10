import { KeyValue } from '@angular/common';
import { Component, Input, isDevMode, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Highlighter } from '../highlighter';
import { CompagnonPatch } from '../struct';

@Component({
  selector: 'app-table-card-compagnon',
  templateUrl: './table-card-compagnon.component.html',
  styleUrls: ['./table-card-compagnon.component.css'],
})
export class TableCardCompagnonComponent implements OnInit {
  public highlight = Highlighter.highlight;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() patchs!: CompagnonPatch[];
  baseHref!: string;
  dataLength!: number;
  dataSource!: MatTableDataSource<CompagnonPatch>;

  displayedColumns = ['Patch', 'Cout', 'Stats', 'Effet', 'Caractéristiques', 'Dons'];

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
    this.dataSource = new MatTableDataSource<CompagnonPatch>(this.patchs);
    this.dataLength = this.patchs.length;
    this.baseHref = isDevMode() ? '../..' : '.';
  }

  ordreCouts = (a: KeyValue<string, number>, b: KeyValue<string, number>): number => {
    if (a.value !== b.value) return a.value > b.value ? -1 : 1;
    enum trie {
      'feu',
      'air',
      'terre',
      'eau',
    }
    return trie[(<unknown>a.key) as trie] > trie[(<unknown>b.key) as trie] ? 1 : -1;
  };
}
