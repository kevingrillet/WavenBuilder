// https://www.waven-game.com/fr/actualite/1373544-alpha-8-les-equipements

import { Dictionary } from './interfaces';

// Enums
export enum Elements {
  Feu,
  Air,
  Terre,
  Eau,
  Neutre,
}

export enum Raretes {
  Commun,
  Rare,
  Krosmique,
  Infinite,
}

export enum Iles {
  'Bateau Vampyre',
  Bonta,
  'Île des Bouftous',
  'Île des Bworks',
  'Île des Chafers',
  'Île des Chuchoteurs',
  'Île des Cochons',
  'Île des Craqueleurs',
  'Île des Taures',
  'Île des Tofus',
}

// Général
export class Caracteristique {
  taux?: number;
  effet?: string;
}

export class Don {
  nom?: string;
  cout?: number;
  effet?: string;
  sort?: string;
}

export class Patch {
  version!: string;
  pouvoir?: string;
  sort?: string;
  nom?: string;
  rarete?: Raretes;
  caracteristiques?: Caracteristique[];
  dons?: Don[];
}

// Equipements
export class Equipement {
  iles?: Iles[];
  nom!: string;
  image?: string;
  rarete!: Raretes;
  patchs!: Patch[];
}

export class Equipements {
  anneaux!: Equipement[];
  brassards!: Equipement[];
}

// Compagnons
// export class CompagnonPatch {
//   version!: string;
//   cout!: Dictionnary<number>;
//   pv!: number;
//   at!: number;
//   cc!: number;
//   pm!: number;
//   pouvoir?: string;
//   dons?: Don[];
// }

// export class Compagnon {
//   iles?: Iles[];
//   nom!: string;
//   image?: string;
//   rarete!: Raretes;
//   patchs!: CompagnonPatch[];
// }

// export class Compagnons {
//   compagnons!: Compagnons[];
// }

// Spells
export class SortPatch {
  version!: string;
  cout!: number;
  gains!: Dictionary<number>;
  effet!: string;
  dons?: Don[];
}

export class Sort {
  nom!: string;
  element!: Elements;
  image?: string;
  patchs!: SortPatch[];
}

export class Sorts {
  sorts!: Sort[];
}
