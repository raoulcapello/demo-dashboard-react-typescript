
import { Position } from '../../types';
import { woningmarktPositions } from './woningmarkt';
import { klimaatPositions } from './klimaat';
import { onderwijsPositions } from './onderwijs';
import { zorgPositions } from './zorg';
import { immigratiePositions } from './immigratie';
import { economiePositions } from './economie';
import { veiligheidPositions } from './veiligheid';
import { europaPositions } from './europa';

export const positions: Position[] = [
  ...woningmarktPositions,
  ...klimaatPositions,
  ...onderwijsPositions,
  ...zorgPositions,
  ...immigratiePositions,
  ...economiePositions,
  ...veiligheidPositions,
  ...europaPositions
];

export {
  woningmarktPositions,
  klimaatPositions,
  onderwijsPositions,
  zorgPositions,
  immigratiePositions,
  economiePositions,
  veiligheidPositions,
  europaPositions
};
