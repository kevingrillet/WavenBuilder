import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Equipement } from '../struct';

@Component({
  selector: 'app-dialog-card-equipement',
  templateUrl: './dialog-card-equipement.component.html',
  styleUrls: ['./dialog-card-equipement.component.css'],
})
export class DialogCardEquipementComponent {
  equipement: Equipement;
  mode: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.equipement = this.data.equipement;
    this.mode = this.data.mode;
  }
}
