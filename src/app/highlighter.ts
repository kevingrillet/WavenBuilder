export class Highlighter {
  static highlight(input: string): string {
    const imgKeywords = ['adjacents', 'ASTRAL', 'autour', 'BOUEUX', 'ÉVENTÉ', 'HUILÉ', 'MOUILLÉ'];
    const blueKeywords = [
      'ASTRAL',
      'AVALANCHE',
      'AVALANCHES',
      'BOOM',
      'BOUCLIER',
      'BROYAGE',
      'CARACOLE',
      'CÉAN',
      'COLLISIONS',
      'CRITIQUE',
      'CTANE',
      'CYPRES',
      'DÉPHASAGE',
      'DRAIN',
      'ÉBOULEMENT',
      'ÉBOULEMENTS',
      'ESQUIVE',
      'EXPLOSIONS',
      'FLOT',
      'FOUDRE',
      'FOUDRES',
      'GEYSER',
      'GEYSERS',
      'GRÊLES',
      'INCIBLABLE',
      'MÉTÉORE',
      'MÉTÉORES',
      'OURAGAN',
      'OURAGANS',
      'RAGAN',
      'REPOUSSE',
      'RÉINVOCABLE',
      'REBONDS',
      'RIPOSTE',
      'TOURBES',
      'VOL DE VIE',
    ].sort((a, b) => b.localeCompare(a));
    const blueGreenKeywords = ['EXPLOSION', 'GRÊLE', 'REBOND', 'TOURBE'];
    const blueWhiteKeywords = ['GRIMOIRE'];
    const boldKeywords = [
      'AIR',
      'AR',
      'AT',
      'ATTAQUE',
      'AURAS',
      'BOUEUX',
      'BOULE DE FEU',
      'CC',
      'CC MAGIQUES',
      'COUP DE GRÂCE',
      'DÉFENSES',
      'DÉGÂTS CC',
      'EAU',
      'ECLAIR',
      'ÉTHER',
      'ÉVENTÉ',
      'FEU',
      'GAINS DE KAMAS',
      'HUILÉ',
      'MAGIE',
      'MAGIES',
      'MOUILLÉ',
      'PA',
      'PUISSANCE',
      'PV',
      'PV MAX',
      'PREMIER TOUR',
      'ROCHER',
      'SOINS',
      'TERRE',
      'VAGUE',
      'VITALITÉ',
      'XP',
    ].sort((a, b) => b.localeCompare(a));
    const greenKeywords = ['[0-9]+ dégâts magiques'];
    const greyKeywords = ['Limité à [0-9]+ fois par combat.', 'Limité à [0-9]+ fois par tour.'];

    let output = input;
    output = output.replace(new RegExp('(' + blueKeywords.join('|') + ')', 'g'), "<span class='style-bold style-blue'>$1</span>");
    output = output.replace(
      new RegExp('(' + blueGreenKeywords.join('|') + ')\\(([0-9]+)\\)', 'g'),
      "<span class='style-bold style-blue'>$1(</span><span class='style-green'>$2</span><span class='style-bold style-blue'>)</span>"
    );
    output = output.replace(
      new RegExp('(' + blueWhiteKeywords.join('|') + ')\\(([0-9]+)\\)', 'g'),
      "<span class='style-bold style-blue'>$1(</span>$2<span class='style-bold style-blue'>)</span>"
    );
    output = output.replace(new RegExp('(' + boldKeywords.join('|') + ')', 'g'), "<span class='style-bold'>$1</span>");
    output = output.replace(new RegExp('(' + greenKeywords.join('|') + ')', 'g'), "<span class='style-green'>$1</span>");
    output = output.replace(new RegExp('(' + greyKeywords.join('|') + ')', 'g'), "<br /><span class='style-italic style-gray'>$1</span>");

    output = output.replace(new RegExp('(' + imgKeywords.join('|') + ')', 'g'), function (match) {
      return (
        match +
        " <img src='/assets/img/effets/" +
        match
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
