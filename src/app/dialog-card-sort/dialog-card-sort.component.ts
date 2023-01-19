import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogSortInput } from '../interfaces';
import { Sort } from '../struct';

@Component({
  selector: 'app-dialog-card-sort',
  templateUrl: './dialog-card-sort.component.html',
  styleUrls: ['./dialog-card-sort.component.css'],
})
export class DialogCardSortComponent implements OnInit {
  baseHref!: string;
  sort: Sort;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogSortInput) {
    this.sort = this.data.spell;
  }

  ngOnInit(): void {
    this.baseHref = isDevMode() ? '../..' : '.';
  }
}
