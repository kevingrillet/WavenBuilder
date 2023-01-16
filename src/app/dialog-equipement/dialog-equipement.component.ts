import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: Equipement
  ) {}

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
          caracs: this.formBuilder.array([
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
      (this.equipementForm.controls['iles'] as FormGroup).addControl(
        ile as string,
        new FormControl(false)
      );
    });

    // Mise en place de l'édition
    if (this.editData) {
      // console.log(this.editData);
      this.equipementForm.controls['nom'].setValue(this.editData.nom);
      this.equipementForm.controls['image'].setValue(this.editData.image);
      this.equipementForm.controls['rarete'].setValue(this.editData.rarete);

      this.editData.iles?.forEach((ile) => {
        (this.equipementForm.controls['iles'] as FormGroup).controls[
          ile
        ].setValue(true);
      });

      this.editData.patchs.forEach((patch, index) => {
        if (
          index >
          (this.equipementForm.controls['patchs'] as FormArray).length - 1
        )
          this.addPatch();

        var pachForm = (this.equipementForm.controls['patchs'] as FormArray).at(
          index
        ) as FormGroup;

        pachForm.controls['version'].setValue(patch.version);
        pachForm.controls['pouvoir'].setValue(patch.pouvoir);
        pachForm.controls['sort'].setValue(patch.sort);

        patch.caracteristiques?.forEach((carac, indexCarac) => {
          if (
            indexCarac >
            (pachForm.controls['caracs'] as FormArray).length - 1
          )
            this.addCarac(index);

          let caracForm = (pachForm.controls['caracs'] as FormArray).at(
            indexCarac
          ) as FormGroup;

          caracForm.controls['taux'].setValue(carac.taux);
          caracForm.controls['effet'].setValue(carac.effet);
        });

        patch.dons?.forEach((don, indexDon) => {
          if (indexDon > (pachForm.controls['dons'] as FormArray).length - 1)
            this.addDon(index);

          let donForm = (pachForm.controls['dons'] as FormArray).at(
            indexDon
          ) as FormGroup;

          donForm.controls['nom'].setValue(don.nom);
          donForm.controls['cout'].setValue(don.cout);
          donForm.controls['effet'].setValue(don.effet);
          donForm.controls['sort'].setValue(don.sort);
        });
      });
    }
  }

  addCarac(patchindex: number) {
    const caracForm = this.formBuilder.group({
      taux: ['', Validators.required],
      effet: ['', Validators.required],
    });

    this.getCaracs(patchindex).push(caracForm);
  }

  addDon(patchindex: number) {
    const donForm = this.formBuilder.group({
      nom: ['', Validators.required],
      cout: ['', Validators.required],
      effet: ['', Validators.required],
      sort: [''],
    });

    this.getDons(patchindex).push(donForm);
  }

  addPatch() {
    const patchForm = this.formBuilder.group({
      version: ['', Validators.required],
      pouvoir: ['', Validators.required],
      sort: [''],
      caracs: this.formBuilder.array([]),
      dons: this.formBuilder.array([]),
    });

    this.patchs.push(patchForm);
  }

  deleteCarac(patchindex: number, index: number) {
    this.getCaracs(patchindex).removeAt(index);
  }

  deleteDon(patchindex: number, index: number) {
    this.getDons(patchindex).removeAt(index);
  }

  getCaracs(patchindex: number): FormArray {
    return (
      (this.equipementForm.controls['patchs'] as FormArray).at(
        patchindex
      ) as FormGroup
    ).controls['caracs'] as FormArray;
  }

  getDons(patchindex: number): FormArray {
    return (
      (this.equipementForm.controls['patchs'] as FormArray).at(
        patchindex
      ) as FormGroup
    ).controls['dons'] as FormArray;
  }

  get patchs(): FormArray {
    return this.equipementForm.controls['patchs'] as FormArray;
  }

  save() {
    let eq = this.equipementForm.value;

    // Trier patch par numéro décroissant.
    eq.patchs.sort(function (a: Patch, b: Patch) {
      return Number(b.version) - Number(a.version);
    });

    // Convertir checkbox des iles en string si true.
    Object.keys(eq.iles).forEach((key) => {
      if (!eq.iles[key])
        delete eq.iles[key];
    });
    eq.iles = Object.keys(eq.iles);

    console.log(Object.assign(new Equipement(), eq))
  }
}
