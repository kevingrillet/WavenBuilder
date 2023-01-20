import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, startWith, map } from 'rxjs';
import { DialogCompagnonInput } from '../interfaces';
import { Iles, Raretes, Compagnon, CompagnonPatch } from '../struct';

@Component({
  selector: 'app-dialog-compagnon',
  templateUrl: './dialog-compagnon.component.html',
  styleUrls: ['./dialog-compagnon.component.css'],
})
export class DialogCompagnonComponent implements OnInit {
  iles = Object.values(Iles).filter((value) => typeof value !== 'number');
  raretes = Object.values(Raretes).filter((value) => typeof value !== 'number');

  autoCompleteAllPatch = false;

  oacCaracEffets!: Observable<string[]>[][];
  oacDonEffets!: Observable<string[]>[][];
  oacDonNoms!: Observable<string[]>[][];
  acCaracEffets!: string[];
  acDonEffets!: string[];
  acDonNoms!: string[];
  compagnonForm!: FormGroup;
  compagnon: Compagnon;
  compagnons: Compagnon[];

  constructor(
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<DialogCompagnonComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogCompagnonInput
  ) {
    this.compagnon = this.data.compagnon;
    this.compagnons = this.data.compagnons;
  }

  ngOnInit(): void {
    // Mise en place du form
    this.compagnonForm = this.formBuilder.group({
      nom: ['', Validators.required],
      rarete: ['', Validators.required],
      image: [''],
      iles: this.formBuilder.group({}),
      patchs: this.formBuilder.array([
        this.formBuilder.group({
          version: ['', Validators.required],
          pv: ['', Validators.required],
          at: ['', Validators.required],
          cc: ['', Validators.required],
          pm: ['', Validators.required],
          effet: ['', Validators.required],
          sort: [''],
          feu: [''],
          air: [''],
          terre: [''],
          eau: [''],
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
      (this.compagnonForm.controls['iles'] as FormGroup).addControl(ile as string, new FormControl(false));
    });

    // Construction des listes pour l'autocomplete
    const acCE = new Set<string>();
    const acDN = new Set<string>();
    const acDE = new Set<string>();
    if (this.compagnons) {
      this.compagnons.forEach((sp) => {
        if (this.autoCompleteAllPatch === true) {
          sp.patchs.forEach((pat) => {
            pat.caracteristiques?.forEach((carac) => {
              if (carac.effet) acCE.add(carac.effet);
            });
            pat.dons?.forEach((dn) => {
              if (dn.nom) acDN.add(dn.nom);
              if (dn.effet) acDE.add(dn.effet);
            });
          });
        } else {
          sp.patchs[0].caracteristiques?.forEach((carac) => {
            if (carac.effet) acCE.add(carac.effet);
          });
          sp.patchs[0].dons?.forEach((dn) => {
            if (dn.nom) acDN.add(dn.nom);
            if (dn.effet) acDE.add(dn.effet);
          });
        }
      });
    }

    this.acCaracEffets = [...acCE].sort();
    this.acDonEffets = [...acDE].sort();
    this.acDonNoms = [...acDN].sort();

    this.oacCaracEffets = [[]];
    this.oacCaracEffets[0].push(
      ((((this.compagnonForm.controls['patchs'] as FormArray).at(0) as FormGroup).controls['caracteristiques'] as FormArray).at(0) as FormGroup).controls[
        'effet'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acCaracEffets))
      )
    );

    this.oacDonEffets = [[]];
    this.oacDonEffets[0].push(
      ((((this.compagnonForm.controls['patchs'] as FormArray).at(0) as FormGroup).controls['dons'] as FormArray).at(0) as FormGroup).controls[
        'effet'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acDonEffets))
      )
    );

    this.oacDonNoms = [[]];
    this.oacDonNoms[0].push(
      ((((this.compagnonForm.controls['patchs'] as FormArray).at(0) as FormGroup).controls['dons'] as FormArray).at(0) as FormGroup).controls[
        'nom'
      ].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acDonNoms))
      )
    );

    // Mise en place de l'édition
    if (this.compagnon) {
      this.compagnonForm.controls['nom'].setValue(this.compagnon.nom);
      this.compagnonForm.controls['image'].setValue(this.compagnon.image);
      this.compagnonForm.controls['rarete'].setValue(this.compagnon.rarete);

      this.compagnon.iles?.forEach((ile) => {
        (this.compagnonForm.controls['iles'] as FormGroup).controls[ile].setValue(true);
      });

      this.compagnon.patchs.forEach((patch, index) => {
        if (index > (this.compagnonForm.controls['patchs'] as FormArray).length - 1) this.addPatch();

        const pachForm = (this.compagnonForm.controls['patchs'] as FormArray).at(index) as FormGroup;

        pachForm.controls['version'].setValue(patch.version);
        pachForm.controls['effet'].setValue(patch.effet);
        pachForm.controls['sort'].setValue(patch.sort);

        if (patch.couts) {
          if (patch.couts['feu'] !== undefined) pachForm.controls['feu'].setValue(patch.couts['feu']);
          if (patch.couts['air'] !== undefined) pachForm.controls['air'].setValue(patch.couts['air']);
          if (patch.couts['terre'] !== undefined) pachForm.controls['terre'].setValue(patch.couts['terre']);
          if (patch.couts['eau'] !== undefined) pachForm.controls['eau'].setValue(patch.couts['eau']);
        }

        pachForm.controls['pv'].setValue(patch.pv);
        pachForm.controls['at'].setValue(patch.at);
        pachForm.controls['cc'].setValue(patch.cc);
        pachForm.controls['pm'].setValue(patch.pm);

        patch.caracteristiques?.forEach((caracteristique, indexCarac) => {
          if (indexCarac > (pachForm.controls['caracteristiques'] as FormArray).length - 1) this.addCarac(index);

          const caracForm = (pachForm.controls['caracteristiques'] as FormArray).at(indexCarac) as FormGroup;

          caracForm.controls['taux'].setValue(caracteristique.taux);
          caracForm.controls['effet'].setValue(caracteristique.effet);
        });

        patch.dons?.forEach((don, indexDon) => {
          if (indexDon > (pachForm.controls['dons'] as FormArray).length - 1) this.addDon(index);

          const donForm = (pachForm.controls['dons'] as FormArray).at(indexDon) as FormGroup;

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

    this.oacCaracEffets[patchindex].push(
      caracForm.controls['effet'].valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || '', this.acCaracEffets))
      )
    );

    this.getCaracteristiques(patchindex).push(caracForm);
  }

  addDon(patchindex: number): void {
    const donForm = this.formBuilder.group({
      nom: ['', Validators.required],
      cout: ['', Validators.required],
      effet: ['', Validators.required],
      sort: [''],
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
      pv: ['', Validators.required],
      at: ['', Validators.required],
      cc: ['', Validators.required],
      pm: ['', Validators.required],
      effet: ['', Validators.required],
      sort: [''],
      feu: [''],
      air: [''],
      terre: [''],
      eau: [''],
      caracteristiques: this.formBuilder.array([]),
      dons: this.formBuilder.array([]),
    });

    this.oacCaracEffets.push([]);
    this.oacDonEffets.push([]);
    this.oacDonNoms.push([]);

    this.patchs.push(patchForm);
  }

  deleteCaracteristiques(patchindex: number, index: number): void {
    this.oacCaracEffets[patchindex].splice(index, 1);
    this.getCaracteristiques(patchindex).removeAt(index);
  }

  deleteDon(patchindex: number, index: number): void {
    this.oacDonEffets[patchindex].splice(index, 1);
    this.oacDonNoms[patchindex].splice(index, 1);
    this.getDons(patchindex).removeAt(index);
  }

  getCaracteristiques(patchindex: number): FormArray {
    return ((this.compagnonForm.controls['patchs'] as FormArray).at(patchindex) as FormGroup).controls['caracteristiques'] as FormArray;
  }

  getDons(patchindex: number): FormArray {
    return ((this.compagnonForm.controls['patchs'] as FormArray).at(patchindex) as FormGroup).controls['dons'] as FormArray;
  }

  get patchs(): FormArray {
    return this.compagnonForm.controls['patchs'] as FormArray;
  }

  save(): void {
    const sp = this.compagnonForm.value;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sp.patchs.forEach((patch: any) => {
      patch.couts = {
        feu: patch.feu,
        air: patch.air,
        terre: patch.terre,
        eau: patch.eau,
      };
      Object.keys(patch.couts).forEach((key) => {
        if (!patch.couts[key] || patch.couts[key] === 0) delete patch.couts[key];
      });
      delete patch.feu;
      delete patch.air;
      delete patch.terre;
      delete patch.eau;
    });

    Object.keys(sp.iles).forEach((key) => {
      if (!sp.iles[key]) delete sp.iles[key];
    });
    sp.iles = Object.keys(sp.iles);

    // Trier patch par numéro décroissant.
    sp.patchs.sort(function (a: CompagnonPatch, b: CompagnonPatch) {
      return Number(b.version) - Number(a.version);
    });

    this.matDialogRef.close(sp);
  }

  private _filter(value: string, ac: string[]): string[] {
    return ac.filter((option) => option.toLowerCase().includes(value.toLowerCase()));
  }
}
