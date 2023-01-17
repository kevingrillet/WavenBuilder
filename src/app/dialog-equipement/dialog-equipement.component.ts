import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Equipement, Iles, Patch, Raretes } from '../struct';

@Component({
  selector: 'app-dialog-equipement',
  templateUrl: './dialog-equipement.component.html',
  styleUrls: ['./dialog-equipement.component.css'],
})
export class DialogEquipementComponent implements OnInit {
  iles = Object.values(Iles).filter((value) => typeof value !== 'number');
  raretes = Object.values(Raretes).filter((value) => typeof value !== 'number');

  equipementForm!: FormGroup;
  equipement: Equipement;
  mode: string;

  constructor(private formBuilder: FormBuilder, private matDialogRef: MatDialogRef<DialogEquipementComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.equipement = this.data.equipement;
    this.mode = this.data.mode;
  }

  ngOnInit(): void {
    // Mise en place du form
    this.equipementForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: [''],
      rarete: ['', Validators.required],
      iles: this.formBuilder.group({}),
      patchs: this.formBuilder.array([
        this.formBuilder.group({
          version: ['', Validators.required],
          pouvoir: ['', Validators.required],
          sort: [''],
          caracteristiques: this.formBuilder.array([
            this.formBuilder.group({
              taux: ['', Validators.required],
              effet: ['', Validators.required],
            }),
          ]),
          dons: this.formBuilder.array([
            this.formBuilder.group({
              nom: ['', Validators.required],
              cout: ['', Validators.required],
              effet: ['', Validators.required],
              sort: [''],
            }),
          ]),
        }),
      ]),
    });

    this.iles.forEach((ile) => {
      (this.equipementForm.controls['iles'] as FormGroup).addControl(ile as string, new FormControl(false));
    });

    // Mise en place de l'édition
    if (this.equipement) {
      this.equipementForm.controls['nom'].setValue(this.equipement.nom);
      this.equipementForm.controls['image'].setValue(this.equipement.image);
      this.equipementForm.controls['rarete'].setValue(this.equipement.rarete);

      this.equipement.iles?.forEach((ile) => {
        (this.equipementForm.controls['iles'] as FormGroup).controls[ile].setValue(true);
      });

      this.equipement.patchs.forEach((patch, index) => {
        if (index > (this.equipementForm.controls['patchs'] as FormArray).length - 1) this.addPatch();

        var pachForm = (this.equipementForm.controls['patchs'] as FormArray).at(index) as FormGroup;

        pachForm.controls['version'].setValue(patch.version);
        pachForm.controls['pouvoir'].setValue(patch.pouvoir);
        pachForm.controls['sort'].setValue(patch.sort);

        patch.caracteristiques?.forEach((caracteristique, indexCarac) => {
          if (indexCarac > (pachForm.controls['caracteristiques'] as FormArray).length - 1) this.addCarac(index);

          let caracForm = (pachForm.controls['caracteristiques'] as FormArray).at(indexCarac) as FormGroup;

          caracForm.controls['taux'].setValue(caracteristique.taux);
          caracForm.controls['effet'].setValue(caracteristique.effet);
        });

        patch.dons?.forEach((don, indexDon) => {
          if (indexDon > (pachForm.controls['dons'] as FormArray).length - 1) this.addDon(index);

          let donForm = (pachForm.controls['dons'] as FormArray).at(indexDon) as FormGroup;

          donForm.controls['nom'].setValue(don.nom);
          donForm.controls['cout'].setValue(don.cout);
          donForm.controls['effet'].setValue(don.effet);
          donForm.controls['sort'].setValue(don.sort);
        });
      });
    }
  }

  addCarac(patchindex: number): void {
    const caracForm = this.formBuilder.group({
      taux: ['', Validators.required],
      effet: ['', Validators.required],
    });

    this.getCaracteristiques(patchindex).push(caracForm);
  }

  addDon(patchindex: number): void {
    const donForm = this.formBuilder.group({
      nom: ['', Validators.required],
      cout: ['', Validators.required],
      effet: ['', Validators.required],
      sort: [''],
    });

    this.getDons(patchindex).push(donForm);
  }

  addPatch(): void {
    const patchForm = this.formBuilder.group({
      version: ['', Validators.required],
      pouvoir: ['', Validators.required],
      sort: [''],
      caracteristiques: this.formBuilder.array([]),
      dons: this.formBuilder.array([]),
    });

    this.patchs.push(patchForm);
  }

  deleteCaracteristiques(patchindex: number, index: number): void {
    this.getCaracteristiques(patchindex).removeAt(index);
  }

  deleteDon(patchindex: number, index: number): void {
    this.getDons(patchindex).removeAt(index);
  }

  getCaracteristiques(patchindex: number): FormArray {
    return ((this.equipementForm.controls['patchs'] as FormArray).at(patchindex) as FormGroup).controls['caracteristiques'] as FormArray;
  }

  getDons(patchindex: number): FormArray {
    return ((this.equipementForm.controls['patchs'] as FormArray).at(patchindex) as FormGroup).controls['dons'] as FormArray;
  }

  get patchs(): FormArray {
    return this.equipementForm.controls['patchs'] as FormArray;
  }

  save(): void {
    let eq = this.equipementForm.value;

    // Trier patch par numéro décroissant.
    eq.patchs.sort(function (a: Patch, b: Patch) {
      return Number(b.version) - Number(a.version);
    });

    // Convertir checkbox des iles en string si true.
    Object.keys(eq.iles).forEach((key) => {
      if (!eq.iles[key]) delete eq.iles[key];
    });
    eq.iles = Object.keys(eq.iles);

    this.matDialogRef.close(eq);
  }
}
