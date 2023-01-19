import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DialogSortInput } from '../interfaces';
import { Sort, Patch, Elements } from '../struct';

@Component({
  selector: 'app-dialog-sort',
  templateUrl: './dialog-sort.component.html',
  styleUrls: ['./dialog-sort.component.css'],
})
export class DialogSortComponent implements OnInit {
  elements = Object.values(Elements).filter((value) => typeof value !== 'number');

  autoCompleteAllPatch = false;

  oacDonEffets!: Observable<string[]>[][];
  oacDonNoms!: Observable<string[]>[][];
  acCaracEffets!: string[];
  acDonEffets!: string[];
  acDonNoms!: string[];
  sortForm!: FormGroup;
  spell: Sort;
  spells: Sort[];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<DialogSortComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSortInput
  ) {
    this.spell = this.data.spell;
    this.spells = this.data.spells;
  }

  ngOnInit(): void {
    // Mise en place du form
    this.sortForm = this.formBuilder.group({
      nom: ['', Validators.required],
      element: ['', Validators.required],
      image: [''],
      patchs: this.formBuilder.array([
        this.formBuilder.group({
          version: ['', Validators.required],
          cout: ['', Validators.required],
          effet: ['', Validators.required],
          feu: [''],
          air: [''],
          terre: [''],
          eau: [''],
          neutre: [''],
          ether: [''],
          dons: this.formBuilder.array([
            this.formBuilder.group({
              nom: ['', Validators.required],
              cout: ['', Validators.required],
              effet: ['', Validators.required],
            }),
          ]),
        }),
      ]),
    });

    // Construction des listes pour l'autocomplete
    const acDN = new Set<string>();
    const acDE = new Set<string>();
    if (this.spells) {
      this.spells.forEach((sp) => {
        if (this.autoCompleteAllPatch === true) {
          sp.patchs.forEach((pat) => {
            pat.dons?.forEach((dn) => {
              if (dn.nom) acDN.add(dn.nom);
              if (dn.effet) acDE.add(dn.effet);
            });
          });
        } else {
          sp.patchs[0].dons?.forEach((dn) => {
            if (dn.nom) acDN.add(dn.nom);
            if (dn.effet) acDE.add(dn.effet);
          });
        }
      });
    }
    this.acDonEffets = [...acDE].sort();
    this.acDonNoms = [...acDN].sort();

    this.oacDonEffets = [[]];
    this.oacDonEffets[0].push(
      ((((this.sortForm.controls['patchs'] as FormArray).at(0) as FormGroup).controls['dons'] as FormArray).at(0) as FormGroup).controls[
        'effet'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acDonEffets))
      )
    );

    this.oacDonNoms = [[]];
    this.oacDonNoms[0].push(
      ((((this.sortForm.controls['patchs'] as FormArray).at(0) as FormGroup).controls['dons'] as FormArray).at(0) as FormGroup).controls[
        'nom'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acDonNoms))
      )
    );

    // Mise en place de l'édition
    if (this.spell) {
      this.sortForm.controls['nom'].setValue(this.spell.nom);
      this.sortForm.controls['image'].setValue(this.spell.image);
      this.sortForm.controls['element'].setValue(this.spell.element);

      this.spell.patchs.forEach((patch, index) => {
        if (index > (this.sortForm.controls['patchs'] as FormArray).length - 1) this.addPatch();

        const pachForm = (this.sortForm.controls['patchs'] as FormArray).at(index) as FormGroup;

        pachForm.controls['version'].setValue(patch.version);
        pachForm.controls['cout'].setValue(patch.cout);
        pachForm.controls['effet'].setValue(patch.effet);

        if (patch.gains) {
          if (patch.gains['feu'] !== undefined) pachForm.controls['feu'].setValue(patch.gains['feu']);
          if (patch.gains['air'] !== undefined) pachForm.controls['air'].setValue(patch.gains['air']);
          if (patch.gains['terre'] !== undefined) pachForm.controls['terre'].setValue(patch.gains['terre']);
          if (patch.gains['eau'] !== undefined) pachForm.controls['eau'].setValue(patch.gains['eau']);
          if (patch.gains['neutre'] !== undefined) pachForm.controls['neutre'].setValue(patch.gains['neutre']);
          if (patch.gains['ether'] !== undefined) pachForm.controls['ether'].setValue(patch.gains['ether']);
        }

        patch.dons?.forEach((don, indexDon) => {
          if (indexDon > (pachForm.controls['dons'] as FormArray).length - 1) this.addDon(index);

          const donForm = (pachForm.controls['dons'] as FormArray).at(indexDon) as FormGroup;

          donForm.controls['nom'].setValue(don.nom);
          donForm.controls['cout'].setValue(don.cout);
          donForm.controls['effet'].setValue(don.effet);
        });
      });
    }
  }

  addDon(patchindex: number): void {
    const donForm = this.formBuilder.group({
      nom: ['', Validators.required],
      cout: ['', Validators.required],
      effet: ['', Validators.required],
    });

    this.oacDonEffets[patchindex][this.getDons(patchindex).length] = donForm.controls['effet'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.acDonEffets))
    );

    this.oacDonNoms[patchindex][this.getDons(patchindex).length] = donForm.controls['nom'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '', this.acDonNoms))
    );

    this.getDons(patchindex).push(donForm);
  }

  addPatch(): void {
    const patchForm = this.formBuilder.group({
      version: ['', Validators.required],
      cout: ['', Validators.required],
      effet: ['', Validators.required],
      feu: [''],
      air: [''],
      terre: [''],
      eau: [''],
      neutre: [''],
      ether: [''],
      dons: this.formBuilder.array([]),
    });

    this.oacDonEffets.push([]);
    this.oacDonNoms.push([]);

    this.patchs.push(patchForm);
  }

  deleteDon(patchindex: number, index: number): void {
    this.oacDonEffets[patchindex].splice(index, 1);
    this.oacDonNoms[patchindex].splice(index, 1);
    this.getDons(patchindex).removeAt(index);
  }

  getDons(patchindex: number): FormArray {
    return ((this.sortForm.controls['patchs'] as FormArray).at(patchindex) as FormGroup).controls['dons'] as FormArray;
  }

  get patchs(): FormArray {
    return this.sortForm.controls['patchs'] as FormArray;
  }

  save(): void {
    const sp = this.sortForm.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sp.patchs.forEach((patch: any) => {
      patch.gains = {
        feu: patch.feu,
        air: patch.air,
        terre: patch.terre,
        eau: patch.eau,
        neutre: patch.neutre,
        ether: patch.ether,
      };
      Object.keys(patch.gains).forEach((key) => {
        if (!patch.gains[key] || patch.gains[key] === 0) delete patch.gains[key];
      });
      delete patch.feu;
      delete patch.air;
      delete patch.terre;
      delete patch.eau;
      delete patch.neutre;
      delete patch.ether;
    });

    // Trier patch par numéro décroissant.
    sp.patchs.sort(function (a: Patch, b: Patch) {
      return Number(b.version) - Number(a.version);
    });

    this.matDialogRef.close(sp);
  }

  private _filter(value: string, ac: string[]): string[] {
    return ac.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
  }
}
