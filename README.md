<div align="center">
   <a href="https://github.com/kyechan99/capsule-render">
      <img align="center" src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=250&section=header&text=WavenBuilder&fontAlignY=30&fontSize=80" />
   </a>
   <br>
   <a href="https://discord.gg/scdUu3SUQm">
      <img align="center" alt="Discord" src="https://img.shields.io/badge/Licence-GPLv3-blue.svg?logo=gnu" />
   </a>
   <a href="https://www.typescriptlang.org/">
      <img align="center" alt="Language" src="https://img.shields.io/badge/Language-TypeScript-0076c6?logo=typescript&logoColor=0076c6" />
   </a>
   <a href="https://angular.io/">
      <img align="center" alt="Language" src="https://img.shields.io/badge/Framework-Angular_15-dd0031?logo=angular&logoColor=dd0031" />
   </a>
   <a href="https://discord.gg/scdUu3SUQm">
      <img align="center" alt="Discord" src="https://img.shields.io/discord/914218630214983730?label=Discord&logo=Discord" />
   </a>
   <br />
   <a href="https://github.com/kevingrillet/WavenBuilder/actions/workflows/lint.yml">
      <img align="center" alt="ESLint" src="https://github.com/kevingrillet/WavenBuilder/actions/workflows/lint.yml/badge.svg" />
   </a>
   <a href="https://github.com/kevingrillet/WavenBuilder/actions/workflows/pages/pages-build-deployment">
      <img align="center" alt="pages-build-deployment" src="https://github.com/kevingrillet/WavenBuilder/actions/workflows/pages/pages-build-deployment/badge.svg" />
   </a>
   <hr>
</div>

Bienvenue sur **WavenBuilder**

## Informations

Vu que personne n'a vraiment fait ça, bah pourquoi pas le faire ici...

Voici la liste des items du jeu disponible via une petite interface, mais aussi via le `json` directement.

Si vous cherchez à faire une PR le fichier de données se trouve ici: `src/assets/json/data.json`.

## ToDo

- [x] v1 - Base
  - [x] Créer `data.json` v0.10.
  - [x] Créer interface d'affichage: `npx ng serve`, `npx ng g c`
  - [x] Ajouter le filtre.
  - [x] Créer interface de modification.
    - <https://stackblitz.com/edit/deep-nested-reactive-form>
  - [x] Enregistrer / Charger.
    - <https://stackoverflow.com/questions/52622061/how-to-use-input-type-file-in-angular-material>
  - [x] Ajouter [Prettier](<https://prettier.io/>): `npm run pretty`
  - [x] Rendre public sur GitHub.
  - [x] Faire la GitHub Page: `npm run git`
    - <https://www.syncfusion.com/blogs/post/easy-steps-to-host-an-angular-app-in-github-pages.aspx>
- [x] v1.1 - UI
  - [x] Ajouter l'[autocomplete](<https://material.angular.io/components/autocomplete/overview>) pour saisir bien plus vite.
    - <https://stackblitz.com/edit/angular-autocomplete-formarray>
- [x] v1.2 - Version v0.08
  - [x] Reprendre dialog-equipement pour ajouter l'ancien nom dans le patch.
  - [x] Ajouter [v0.08](<https://forum.waven-game.com/fr/4-discussions-generales/1413-encyclopedie-objets-8>)
- [x] v1.3 - UI
  - [x] Ajouter de la [couleur](https://www.codeproject.com/Questions/1163473/Find-a-word-in-text-and-change-the-color) sur les mots clés.
    - Regex & Méthode statique
      - <https://stackoverflow.com/questions/41857047/call-static-function-from-angular2-template>
      - <https://stackoverflow.com/questions/5069464/replace-multiple-strings-at-once>
      - <https://stackoverflow.com/questions/44210786/style-not-working-for-innerhtml-in-angular>
  - [x] Ajouter les images après les mots clés.
- [x] v1.4 - Sorts
  - [x] Ajouter l'interface des sorts.
  - [x] Ajouter les sorts des items.
- [x] v1.5 - Compagnons
  - [x] Ajouter l'interface des compagnons.
  - [x] Ajouter les compagnons.
  - [x] Ajouter les dons des compagnons.
    - [x] Feu
    - [x] Air
    - [x] Terre
    - [x] Eau
    - [x] Hybride
  - [x] Ajouter les sorts des compagnons.
  - [x] Bonus: Ajouter les images des compagnons.
    - <https://stackoverflow.com/questions/7433454/html-css-hexagon-with-image-inside>
  - [x] Bonus: Ajouter les iles des compagnons.
- [ ] v1.6 - Refacto
  - [ ] Optimiser le DOM (de plus en plus de lags)...
  - [ ] Factoriser
  - [ ] Reprendre Highlighter pour récupérer la liste des compagnons / sorts
  - [ ] Faire le hint des spells / compagnons
  - [x] Bugs
    - [x] Ordre des compagnons multi éléments (et de leurs éléments)
      - Trie par nombre par élément puis par ordre des éléments feu, terre, air, eau (<https://stackoverflow.com/questions/1069666/sorting-object-property-by-values/1069840#1069840>)
    - [x] Highlights
      - [x] Les accents posent problème -> <https://stackoverflow.com/questions/49835481/javascript-regexp-b-metacharacter-with-accented-characters>
        - Utiliser `(^|\\s*)(...)($|\\s*)` à la place de `\\b` -> <https://stackoverflow.com/questions/25400876/b-alternatives-in-regular-expression>
      - [x] Voir comment faire les images pour les invocations entre parenthèse
  - [x] Récupérer des images de meilleur qualité
  - [x] Retoucher les sorts pour connaitre l'origine.
- [ ] v2 - Toutes les données sont là
  - [ ] MAJ source des sorts
    - [ ] Ajouter les classes.
    - [ ] Ajouter les armes.
  - [ ] Ajouter les sorts des classes & armes.
    - [ ] Rechercher les sorts des versions précédentes.
- [ ] v2.1 - Builder à proprement parler
  - [ ] Faire le builder:
    - [ ] Interface de création / visualisation.
    - [ ] Système de sauvegarde (fichier/url).
    - [ ] Calcul des statistiques (bonus, courbe de coût spells, courbe de gain de Jauge, ...).
    - [ ] Calcul du deck complet (spells des items / compagnons).
    - [ ] Affichage des bonus sur les spells.
    - [ ] Gestion des niveaux.
    - [ ] Gestion des dons.
    - [ ] Gestion de la version du jeu.

## Liens utiles

- <https://wavenbuilds.com/>
- <https://waven.jeuxonline.info/deck-builder>

- Inspiration pour le builder <http://slummp.ddns.net/wakfubuilder/>

## Ressources YouTube

- <https://www.youtube.com/@BlackWhiteWakfu>
- <https://www.youtube.com/@lukasobiwan>
- <https://www.youtube.com/@ultimalordknight>
- <https://www.youtube.com/@akhous-waven5236>
- <https://www.youtube.com/@mugiwawa2926>

## Développement

- <https://nodejs.org/>
- <https://angular.io/>
- <https://material.angular.io/>

## Licence

```text
/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * kevingrillet wrote this file. As long as you retain this notice you can do
 * whatever you want with this stuff. If we meet some day, and you think this
 * stuff is worth it, you can buy me a beer in return.
 * ----------------------------------------------------------------------------
 */
```

<div align="center">
   <a href="https://github.com/kyechan99/capsule-render">
      <img align="center" src="https://capsule-render.vercel.app/api?section=footer&type=waving&color=gradient&height=100" />
   </a>
</div>
