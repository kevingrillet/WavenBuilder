import { Equipement } from './struct';

export interface DialogEquipementInput {
  equipement: Equipement;
  equipements: Equipement[];
  mode: string;
}

export interface FileReaderEventTarget extends EventTarget {
  result: string;
}

export interface FileReaderEvent extends ProgressEvent {
  target: FileReaderEventTarget;
  getMessage(): string;
}
