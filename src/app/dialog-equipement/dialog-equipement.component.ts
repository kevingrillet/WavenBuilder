import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Equipement, Iles, Raretes } from '../struct';

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

  // https://blog.angular-university.io/angular-form-array/
  ngOnInit(): void {
    this.equipementForm = this.formBuilder.group({
      nom: ['', Validators.required],
      image: [''],
      rarete: ['', Validators.required],
      iles: [{ name: 'blabla', completed: false }],
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

    console.log(this.editData);

    if (this.editData) {
      this.equipementForm.controls['nom'].setValue(this.editData.nom);
      this.equipementForm.controls['image'].setValue(this.editData.image);
      this.equipementForm.controls['rarete'].setValue(this.editData.rarete);
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

  getCaracs(patchindex: number) {
    return (
      (this.equipementForm.controls['patchs'] as FormArray).at(
        patchindex
      ) as FormGroup
    ).controls['caracs'] as FormArray;
  }

  getDons(patchindex: number) {
    return (
      (this.equipementForm.controls['patchs'] as FormArray).at(
        patchindex
      ) as FormGroup
    ).controls['dons'] as FormArray;
  }

  get patchs() {
    return this.equipementForm.controls['patchs'] as FormArray;
  }
}
