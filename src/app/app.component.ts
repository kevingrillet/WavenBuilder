import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogEquipementComponent } from './dialog-equipement/dialog-equipement.component';

import * as data from '../assets/json/data.json';
import { Equipements } from './struct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'WavenBuilder';

  displayedColumns = [
    'Nom',
    'Rarete',
    'Iles',
    'Version',
    'Pouvoir',
    'Caractéristiques',
    'Dons',
    'Action',
  ];

  equipements: Equipements = Object.assign(
    new Equipements(),
    data.default.equipements
  );

  _ = console.log(this.equipements);

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogEquipementComponent, {
      width: '70%',
    });
  }

  telechargerJson() {
    var sJson = JSON.stringify(this.equipements, null, 2);
    var element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson)
    );
    element.setAttribute('download', 'data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
