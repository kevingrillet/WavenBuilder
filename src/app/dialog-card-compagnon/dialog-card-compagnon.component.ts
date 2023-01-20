import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogCompagnonInput } from '../interfaces';
import { Compagnon } from '../struct';

@Component({
  selector: 'app-dialog-card-compagnon',
  templateUrl: './dialog-card-compagnon.component.html',
  styleUrls: ['./dialog-card-compagnon.component.css'],
})
export class DialogCardCompagnonComponent implements OnInit {
  baseHref!: string;
  compagnon: Compagnon;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogCompagnonInput) {
    this.compagnon = this.data.compagnon;
  }

  ngOnInit(): void {
    this.baseHref = isDevMode() ? '../..' : '.';
  }
}
