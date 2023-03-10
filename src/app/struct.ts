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

export enum Raretes {
  Commun,
  Rare,
  Krosmique,
  Infinite,
}

export enum Sources {
  Accessoire,
  // Arme,
  // Classe,
  Compagnon,
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

// Equipements
export class Patch {
  version!: string;
  pouvoir?: string;
  sort?: string;
  nom?: string;
  rarete?: Raretes;
  caracteristiques?: Caracteristique[];
  dons?: Don[];
}

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
export class CompagnonPatch {
  version!: string;
  pv!: number;
  at!: number;
  cc!: number;
  pm!: number;
  effet?: string;
  sort?: string;
  caracteristiques?: Caracteristique[];
  dons?: Don[];
  couts!: Dictionary<number>;
}

export class Compagnon {
  iles?: Iles[];
  nom!: string;
  image?: string;
  rarete!: Raretes;
  patchs!: CompagnonPatch[];
}

export class Compagnons {
  compagnons!: Compagnon[];
}

// Spells
export class SortPatch {
  version!: string;
  cout!: number;
  effet!: string;
  dons?: Don[];
  gains!: Dictionary<number>;
}

export class Sort {
  nom!: string;
  element!: Elements;
  source!: Sources;
  image?: string;
  patchs!: SortPatch[];
}

export class Sorts {
  sorts!: Sort[];
}
