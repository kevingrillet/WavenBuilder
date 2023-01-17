import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { DialogEquipementComponent } from './dialog-equipement/dialog-equipement.component';
import { TableEquipementComponent } from './table-equipement/table-equipement.component';

import * as data from '../assets/json/data.json';
import { Equipement, Equipements, Raretes } from './struct';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('tableAnneaux') tableAnneaux!: TableEquipementComponent;
  @ViewChild('tableBrassards') tableBrassards!: TableEquipementComponent;
  @ViewChild('aceEditor') aceEditor!: AceEditorComponent;
  title = 'WavenBuilder';

  displayedColumns = ['Nom', 'Rarete', 'Iles', 'Version', 'Pouvoir', 'Caractéristiques', 'Dons', 'Action'];

  equipements: Equipements = Object.assign(new Equipements(), data.default.equipements);

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    this.dialog
      .open(DialogEquipementComponent, {
        width: '70%',
        data: {
          mode: this.tabGroup.selectedIndex === 0 ? 'anneau' : 'brassard',
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        let eq: Equipement[];
        switch (this.tabGroup.selectedIndex) {
          case 0:
          case 1:
            eq = this.tabGroup.selectedIndex === 0 ? this.equipements.anneaux : this.equipements.brassards;

            eq.push(response);
            eq.sort((a: Equipement, b: Equipement) => {
              if (a.rarete !== b.rarete) {
                return Raretes[a.rarete] > Raretes[b.rarete] ? 1 : -1;
              }
              return a.nom.localeCompare(b.nom);
            });
            break;

          default:
            console.warn('Mauvais onglet');
            break;
        }
        switch (this.tabGroup.selectedIndex) {
          case 0:
            this.tableAnneaux.loadData();
            break;
          case 1:
            this.tableBrassards.loadData();
            break;
        }
        this.refreshAceEditor();
      });
  }

  refreshAceEditor(): void {
    this.aceEditor.loadData();
  }

  ouvrirJson() {
    const inputNode: HTMLInputElement = document.querySelector('#file') as HTMLInputElement;
    if (!inputNode.files) return;

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.onload = (e: any) => {
        this.equipements = Object.assign(new Equipements(), JSON.parse(e.target.result).equipements);

        // Je sais pas pourquoi, mais il faut un petit délai -_-
        setTimeout(() => {
          this.tableAnneaux.loadData();
          this.tableBrassards.loadData();
          this.refreshAceEditor();
        }, 10);
      };

      reader.readAsText(inputNode.files[0]);
    }
  }

  telechargerJson(): void {
    const sJson = JSON.stringify({ equipements: this.equipements }, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', 'data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
