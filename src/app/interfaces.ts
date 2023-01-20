import { Compagnon, Equipement, Sort } from './struct';

export interface DialogCompagnonInput {
  compagnon: Compagnon;
  compagnons: Compagnon[];
}

export interface DialogEquipementInput {
  equipement: Equipement;
  equipements: Equipement[];
  spell: Sort;
  spells: Sort[];
  mode: string;
}

export interface DialogSortInput {
  spell: Sort;
  spells: Sort[];
}

export interface FileReaderEventTarget extends EventTarget {
  result: string;
}

export interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
  getMessage(): string;
}

export interface Dictionary<T> {
  [Key: string]: T;
}
