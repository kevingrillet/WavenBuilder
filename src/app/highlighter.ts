// ÉÈ

export class Highlighter {
  static highlight(input: string): string {
    if (!input) return '';
    if (input === '') return '';
    const imgKeywords = ['adjacents', 'ASTRAL', 'autour', 'BOUEUSE', 'BOUEUX', 'ÉVENTÉ', 'ÉVENTÉE', 'HUILÉ', 'HUILÉE', 'MOUILLÉ', 'MOUILLÉE'].sort((a, b) =>
      b.localeCompare(a)
    );
    const blueKeywords = [
      'ASSOMME',
      'ASTRAL',
      'AVALANCHE',
      'AVALANCHES',
      'BOMBE SMISSE',
      'BOOM',
      'BOUCLIER',
      'BOUCLIER DE BUMP',
      'BOUFTONS ROUGES',
      'BROYAGE',
      'CARACOLE',
      'CÉAN',
      'COEUR DE FLAMME',
      'COEUR DE GLACE',
      'COEUR DE PIERRE',
      'COLLISIONS',
      'COURSE DE JORIS',
      'CRITIQUE',
      'CTANE',
      'CYPRES',
      'DAGUES SOURNOISES',
      'DE PIERRE',
      'DÉPHASAGE',
      'DRAIN',
      'ÉBOULEMENT',
      'ÉBOULEMENTS',
      'ÉCAILLE DE PHAERIS',
      'ELIACUBE DE NOX',
      'ENVOL',
      'ÉPEE DE GLACE',
      'ESQUIVE',
      'ESSAI DE KHAN KARKASS',
      'EXPLOSIONS',
      'FLOT',
      'FOLIE DE QILBY',
      'FOLIE DU DARK VLAD',
      'FOUDRE',
      'FOUDRES',
      'FOUET DE LOU',
      'GARDE DU CORPS',
      "GEL D'HAREBOURG",
      'GÈLE',
      'GEYSER',
      'GEYSERS',
      'GRAVELEUSE',
      'GRÊLES',
      'GRIFFES JOUEUSES',
      'HYPNOSE DE TOXINE',
      'INCIBLABLE',
      "JALOUSIE D'ATCHAM",
      'LANCE-PIERRE',
      'MÉCANISME',
      'MÉLÉE',
      'MÉTÉORE',
      'MÉTÉORES',
      'MIRE',
      'MORSURE DE LILOTTE',
      'NOX',
      'NOXINE',
      'NOXINES',
      'NUÉE DE CORBACS',
      'OURAGAN',
      'OURAGANS',
      'PELLE DE RUEL',
      'PETITE FURIE',
      'PIÈGE OSSEUX',
      'POING REPOUSSANT',
      'PUPUCE',
      'RAGAN',
      "REFLET D'HEURT DE GLOIRE",
      "REFFLET D'UPPERCUT",
      'REFLET DE MASSER',
      'REPOUSSANTE',
      'REPOUSSE',
      'RÉINVOCABLE',
      'REBOND',
      'REBONDS',
      'REFLET DE POUSSETTE',
      'REMINGTON SMISSE',
      "RÉPIT D'ALBERT",
      'RIPOSTE',
      "RONCES D'AMALIA",
      'SAUT DE GOULTARD',
      'SOIN DES DÉMONS',
      'SOUFFLE DE PHAERIS',
      'SURCHARGE DE BAKARA',
      'TOUCHER DE COQUELINE',
      'TOURBES',
      "TRAIT D'ÉVANGELYNE",
      'VENGEANCE DE KATAR',
      'VOL DE VIE',
    ].sort((a, b) => b.localeCompare(a));
    const blueGreenKeywords = ['EXPLOSION', 'GRÊLE', 'REBOND', 'TOURBE'];
    const blueWhiteKeywords = ['GRIMOIRE'];
    const boldKeywords = [
      'AIR',
      'APPARITION',
      'AR',
      'AT',
      'ATTAQUE',
      'AURAS',
      'BOUEUSE',
      'BOUEUX',
      'BOULE DE FEU',
      'CC',
      'CC MAGIQUES',
      'COMPAGNON',
      'COUP DE GRÂCE',
      'CRÂ',
      'DÉBUT DU TOUR',
      'DÉFENSES',
      'DÉGÂTS CC',
      'EAU',
      'ECLAIR',
      'ENIRIPSA',
      'ÉQUIPEMENT',
      'ÉTHER',
      'ÉVENTÉ',
      'ÉVENTÉE',
      'FEU',
      'FIN DU TOUR',
      'GAINS DE KAMAS',
      'HUILÉ',
      'HUILÉE',
      'IOP',
      'MAGIE',
      'MAGIES',
      'MOUILLÉ',
      'MOUILLÉE',
      'PA',
      'PIÈGE',
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
    ].sort((a, b) => b.localeCompare(a));
    const greenKeywords = ['[0-9]+ dégâts magiques'];
    const greyKeywords = [
      'Ce sort est détruit quand il est joué.',
      'Limité à [0-9]+ fois par combat.',
      'Limité à [0-9]+ fois par tour.',
      'Peut être invoqué sur une case libre du terrain.',
    ];

    let output = input;
    output = output.replace(new RegExp('\\b(' + blueKeywords.join('|') + ')', 'g'), "<span class='style-bold style-blue'>$1</span>");
    output = output.replace(
      new RegExp('\\b(' + blueGreenKeywords.join('|') + ')\\(([0-9]+)\\)', 'g'),
      "<span class='style-bold style-blue'>$1(</span><span class='style-green'>$2</span><span class='style-bold style-blue'>)</span>"
    );
    output = output.replace(
      new RegExp('\\b(' + blueWhiteKeywords.join('|') + ')\\(([0-9]+)\\)', 'g'),
      "<span class='style-bold style-blue'>$1(</span>$2<span class='style-bold style-blue'>)</span>"
    );
    output = output.replace(new RegExp('\\b(' + boldKeywords.join('|') + ')', 'g'), "<span class='style-bold'>$1</span>");
    output = output.replace(new RegExp('\\b(' + greenKeywords.join('|') + ')', 'g'), "<span class='style-green'>$1</span>");
    output = output.replace(new RegExp('\\b(' + greyKeywords.join('|') + ')', 'g'), "<br /><span class='style-italic style-gray'>$1</span>");

    output = output.replace(new RegExp('\\b(' + imgKeywords.join('|') + ')', 'g'), function (match) {
      let localMatch = match;
      if (localMatch === 'BOUEUSE') localMatch = 'BOUEUX';
      if (localMatch.slice(-2) === 'ÉE') localMatch = localMatch.slice(0, -1);
      return (
        match +
        " <img src='./assets/img/effets/" +
        localMatch
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '') +
        ".png' class='style-image-inline' />"
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
