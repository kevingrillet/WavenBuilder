import { Component, Inject, isDevMode, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipement } from '../struct';
import { DialogEquipementInput } from '../interfaces';

@Component({
  selector: 'app-dialog-card-equipement',
  templateUrl: './dialog-card-equipement.component.html',
  styleUrls: ['./dialog-card-equipement.component.css'],
})
export class DialogCardEquipementComponent implements OnInit {
  baseHref!: string;
  equipement: Equipement;
  mode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogEquipementInput) {
    this.equipement = this.data.equipement;
    this.mode = this.data.mode;
  }

  ngOnInit(): void {
    this.baseHref = isDevMode() ? '../..' : 'WavenBuilder';
  }
}
