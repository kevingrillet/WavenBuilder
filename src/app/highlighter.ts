// ÉÈ

export class Highlighter {
  static highlight(input: string): string {
    if (!input) return '';
    if (input === '') return '';
    const etat: string[] = ['BOUEUSE', 'BOUEUX', 'ÉVENTÉ', 'ÉVENTÉE', 'HUILÉ', 'HUILÉE', 'MOUILLÉ', 'MOUILLÉE'];
    const imgKeywords: string[] = ['adjacente', 'adjacents', 'ASTRAL', 'autour', 'zone'].concat(etat).sort((a, b) => b.localeCompare(a));
    const compagnons: string[] = ['GOULTARD', 'NOX', 'NOXINE', 'NOXINES', 'PERCIMOL', "POUPÉE D'AMALIA", 'REMINGTON SMISSE'];
    const compagnonsSpells: string[] = [
      'BOMBE SMISSE',
      'BOUCLIER DE BUMP',
      'COURSE DE JORIS',
      'ÉCAILLE DE PHAERIS', // Sort manquant
      'ELIACUBE DE NOX',
      'ESSAI DE KHAN KARKASS',
      'FOLIE DE QILBY',
      'FOLIE DU DARK VLAD',
      'FOUET DE LOU',
      'FRAPPE DE PERCIMOL',
      "GEL D'HAREBOURG",
      'HYPNOSE DE TOXINE',
      "JALOUSIE D'ATCHAM",
      'MORSURE DE LILOTTE',
      'NUÉE DE CORBACS',
      'PELLE DE RUEL',
      'PETITE FURIE',
      "REFLET D'HEURT DE GLOIRE",
      "REFLET D'UPPERCUT", // Sort manquant
      'REFLET DE MASSER', // Sort manquant
      'REFLET DE POUSSETTE', // Sort manquant
      "RÉPIT D'ALBERT",
      "RONCES D'AMALIA",
      'SAUT DE GOULTARD',
      'SOIN DES DÉMONS',
      'SOUFFLE DE PHAERIS',
      'SURCHARGE DE BAKARA',
      'TOUCHER DE COQUELINE',
      "TRAIT D'ÉVANGELYNE",
      'VENGEANCE DE KATAR',
    ];
    const objetsSpells: string[] = ['BOOM', 'BROYAGE', 'CARACOLE', 'CÉAN', 'CTANE', 'CYPRES', 'FLOT', 'RAGAN'];
    const blueKeywords: string[] = [
      'ASSOMME',
      'ASTRAL',
      'AVALANCHE',
      'AVALANCHES',
      'BOUCLIER',
      'BOUFTONS ROUGES',
      'COEUR DE FLAMME',
      'COEUR DE GLACE',
      'COEUR DE PIERRE',
      'COLLISION',
      'COLLISIONS',
      'CRITIQUE',
      'DAGUES SOURNOISES',
      'DE PIERRE',
      'DÉPHASAGE',
      'DRAIN',
      'ÉBOULEMENT',
      'ÉBOULEMENTS',
      'ENVOL',
      'ÉPEE DE GLACE',
      'ESQUIVE',
      'EXPLOSIONS',
      'FOUDRE',
      'FOUDRES',
      'GARDE DU CORPS',
      'GÈLE',
      'GEYSER',
      'GEYSERS',
      'GRAVELEUSE',
      'GRÊLES',
      'GRIFFES JOUEUSES',
      'INCIBLABLE',
      'LANCE-PIERRE',
      'MÉCANISME',
      'MÊLÉE',
      'MÉTÉORE',
      'MÉTÉORES',
      'MIRE',
      'OURAGAN',
      'OURAGANS',
      'PIÈGE OSSEUX',
      'POING REPOUSSANT',
      'PUPUCE',
      'REPOUSSANTE',
      'REPOUSSE',
      'RÉINVOCABLE',
      'REBOND',
      'REBONDS',
      'RIPOSTE',
      'TOFU',
      'TOURBES',
      'VOL DE VIE',
    ]
      .concat(compagnons)
      .concat(compagnonsSpells)
      .concat(objetsSpells)
      .sort((a, b) => b.localeCompare(a));
    const blueGreenKeywords: string[] = ['EXPLOSION', 'GRÊLE', 'REBOND', 'TOURBE'];
    const blueWhiteKeywords: string[] = ['GRIMOIRE'];
    const compagnonsBold: string[] = ['ATCHAM', 'AMALIA', 'DARK VLAD', 'ELELY', 'KATAR', 'KHAN KARKASS', 'LOU', 'PHAERIS', 'QILBY', 'TOXINE'];
    const boldKeywords: string[] = [
      'AIR',
      'APPARITION',
      'AR',
      'AT',
      'ATTAQUE',
      'AURAS',
      'BOULE DE FEU',
      'CC',
      'CC MAGIQUES',
      'CHARGE',
      'COMPAGNON',
      'COUP DE GRÂCE',
      'CRÂ',
      'DÉBUT DE COMBAT',
      'DÉBUT DU TOUR',
      'DÉFENSES',
      'DÉGÂTS CC',
      'EAU',
      'ECLAIR',
      'ENIRIPSA',
      'ÉQUIPEMENT',
      'ÉTHER',
      'FEU',
      'FIN DU TOUR',
      'GAINS DE KAMAS',
      'IOP',
      'MAGIE',
      'MAGIES',
      'MORT',
      'PA',
      'PIÈGE',
      'PM',
      'POUPÉE',
      'PUISSANCE',
      'PV',
      'PV MAX',
      'PREMIER TOUR',
      'ROCHER',
      'SACRIEUR',
      'SOINS',
      'SORT',
      'TERRE',
      'VAGUE',
      'VITALITÉ',
      'XP',
    ]
      .concat(compagnonsBold)
      .concat(etat)
      .sort((a, b) => b.localeCompare(a));
    const greenKeywords: string[] = ['\\+[0-9]+ AR', '[0-9]+ dégâts magiques'];
    const greyKeywords: string[] = [
      'Ce sort est détruit quand il est joué.',
      'Détruit votre POUPÉE déjà en jeu.',
      'Limité à [0-9]+ fois par combat.',
      'Limité à [0-9]+ fois par tour.',
      'Peut être invoqué sur une case libre du terrain.',
    ];

    let output = input;

    // invoc
    output = output.replace(
      new RegExp('\\(([0-9]+) PV, ([0-9]+) AT, ([0-9]+) PM\\)', 'g'),
      '(<img src="./assets/img/utils/pv.png" class="style-image-inline"/> $1, <img src="./assets/img/utils/at.png" class="style-image-inline"/> $2, <img src="./assets/img/utils/pm.png" class="style-image-inline"/> $3)'
    );

    output = output.replace(
      new RegExp('(^|\\s*)(' + blueGreenKeywords.join('|') + ')\\(([0-9]+)\\)($|\\s*)', 'g'),
      "$1<span class='style-bold style-blue'>$2(</span><span class='style-green'>$3</span><span class='style-bold style-blue'>)</span>$4"
    );
    output = output.replace(
      new RegExp('(^|\\s*)(' + blueWhiteKeywords.join('|') + ')\\(([0-9]+)\\)($|\\s*)', 'g'),
      "$1<span class='style-bold style-blue'>$2(</span>$3<span class='style-bold style-blue'>)</span>$4"
    );
    output = output.replace(new RegExp('(^|\\s*)(' + blueKeywords.join('|') + ')($|\\s*)', 'g'), "$1<span class='style-bold style-blue'>$2</span>$3");
    output = output.replace(new RegExp('(^|\\s*)(' + greenKeywords.join('|') + ')($|\\s*)', 'g'), "$1<span class='style-green'>$2</span>$3");
    output = output.replace(new RegExp('(^|\\s*)(' + greyKeywords.join('|') + ')($|\\s*)', 'g'), "$1<br /><span class='style-italic style-gray'>$2</span>$3");
    output = output.replace(new RegExp('(^|\\s*)(' + boldKeywords.join('|') + ')($|\\s*)', 'g'), "$1<span class='style-bold'>$2</span>$3");

    output = output.replace(new RegExp('(^|\\s*)(' + imgKeywords.join('|') + ')($|\\s*)', 'g'), function (match, _, part2) {
      let localMatch = part2;
      if (localMatch === 'adjacente') localMatch = 'adjacents';
      if (localMatch === 'BOUEUSE') localMatch = 'BOUEUX';
      if (localMatch.slice(-2) === 'ÉE') localMatch = localMatch.slice(0, -1);
      return (
        match +
        " <img src='./assets/img/utils/" +
        localMatch
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '') +
        ".png' class='style-image-inline' /> "
      );
    });
    return output;
  }
}

// export function HighlightDecorator(): Function {
//   return (target: Function) => {
//     target.prototype.highlight = (input: string) => {
//       return Highlighter.highlight(input);
//     };
//   };
// }
