import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';

import { AceEditorComponent } from './ace-editor/ace-editor.component';
import { DialogEquipementComponent } from './dialog-equipement/dialog-equipement.component';
import { TableEquipementComponent } from './table-equipement/table-equipement.component';

import * as data from '../assets/json/data.json';
import { Compagnon, Compagnons, Elements, Equipement, Equipements, Raretes, Sort, Sorts } from './struct';
import { DialogSortComponent } from './dialog-sort/dialog-sort.component';
import { TableSortComponent } from './table-sort/table-sort.component';
import { DialogCompagnonComponent } from './dialog-compagnon/dialog-compagnon.component';
import { TableCompagnonComponent } from './table-compagnon/table-compagnon.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;
  @ViewChild('tableAnneaux') tableAnneaux!: TableEquipementComponent;
  @ViewChild('tableBrassards') tableBrassards!: TableEquipementComponent;
  @ViewChild('tableCompagnons') tableCompagnons!: TableCompagnonComponent;
  @ViewChild('tableSpells') tableSorts!: TableSortComponent;
  @ViewChild('aceEditor') aceEditor!: AceEditorComponent;
  title = 'WavenBuilder';

  equipements: Equipements = Object.assign(new Equipements(), data.default.equipements);
  compagnons: Compagnons = Object.assign(new Compagnons(), data.default.compagnons);
  spells: Sorts = Object.assign(new Sorts(), data.default.sorts);

  constructor(private dialog: MatDialog) {}

  openDialog(): void {
    switch (this.tabGroup.selectedIndex) {
      case 0:
      case 1:
        this.openDialogEquipement();
        break;
      case 2:
        this.openDialogCompagnon();
        break;
      case 3:
        this.openDialogSort();
        break;
      default:
        console.error('Mauvais onglet');
        break;
    }
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
        this.compagnons = Object.assign(new Compagnons(), JSON.parse(e.target.result).compagnons);
        this.spells = Object.assign(new Sorts(), JSON.parse(e.target.result).spells);

        // Je sais pas pourquoi, mais il faut un petit délai -_-
        setTimeout(() => {
          this.tableAnneaux.loadData();
          this.tableBrassards.loadData();
          this.tableCompagnons.loadData();
          this.tableSorts.loadData();
          this.refreshAceEditor();
        }, 10);
      };

      reader.readAsText(inputNode.files[0]);
    }
  }

  telechargerJson(): void {
    const sJson = JSON.stringify({ compagnons: this.compagnons, equipements: this.equipements, sorts: this.spells }, null, 2);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/json;charset=UTF-8,' + encodeURIComponent(sJson));
    element.setAttribute('download', 'data.json');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  private openDialogEquipement() {
    this.dialog
      .open(DialogEquipementComponent, {
        width: '70%',
        data: {
          equipements: this.tabGroup.selectedIndex === 0 ? this.equipements.anneaux : this.equipements.brassards,
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

  private openDialogCompagnon() {
    this.dialog
      .open(DialogCompagnonComponent, {
        width: '70%',
        data: {
          compagnons: this.compagnons.compagnons,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        const cp: Compagnon[] = this.compagnons.compagnons;
        cp.push(response);
        cp.sort((a: Compagnon, b: Compagnon) => {
          if ((Object.keys(a.patchs[0].couts).length || 0) !== (Object.keys(b.patchs[0].couts).length || 0)) {
            return (Object.keys(a.patchs[0].couts).length || 0) > (Object.keys(b.patchs[0].couts).length || 0) ? 1 : -1;
          } else {
            for (const el of ['feu', 'air', 'terre', 'eau']) {
              if (a.patchs[0].couts[el] !== b.patchs[0].couts[el]) {
                if (!a.patchs[0].couts[el]) return -1;
                if (!b.patchs[0].couts[el]) return 1;
                return a.patchs[0].couts[el] < b.patchs[0].couts[el] ? 1 : -1;
              }
            }
          }
          if (a.rarete !== b.rarete) {
            return Raretes[a.rarete] > Raretes[b.rarete] ? 1 : -1;
          }
          return a.nom.localeCompare(b.nom);
        });

        this.tableCompagnons.loadData();
        this.refreshAceEditor();
      });
  }

  private openDialogSort() {
    this.dialog
      .open(DialogSortComponent, {
        width: '70%',
        data: {
          spells: this.spells.sorts,
        },
      })
      .afterClosed()
      .subscribe((response) => {
        if (!response) return;
        const sp: Sort[] = this.spells.sorts;
        sp.push(response);
        sp.sort((a: Sort, b: Sort) => {
          if (a.element !== b.element) {
            return Elements[a.element] > Elements[b.element] ? 1 : -1;
          }
          if (a.patchs[0].cout !== b.patchs[0].cout) {
            return a.patchs[0].cout > b.patchs[0].cout ? 1 : -1;
          }
          return a.nom.localeCompare(b.nom);
        });

        this.tableSorts.loadData();
        this.refreshAceEditor();
      });
  }
}
