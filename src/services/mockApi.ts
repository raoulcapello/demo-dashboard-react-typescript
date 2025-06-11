import { Theme, Party, Position } from '../types';

export const themes: Theme[] = [
  {
    id: '1',
    title: 'Woningmarkt',
    description: 'Vergelijk standpunten over woningbouw, huurprijzen, en toegankelijkheid van de woningmarkt.',
    slug: 'woningmarkt'
  },
  {
    id: '2',
    title: 'Klimaat',
    description: 'Bekijk partijstandpunten over klimaatbeleid, duurzaamheid en energietransitie.',
    slug: 'klimaat'
  },
  {
    id: '3',
    title: 'Onderwijs',
    description: 'Ontdek hoe partijen denken over onderwijsfinanciering, kwaliteit en toegankelijkheid.',
    slug: 'onderwijs'
  },
  {
    id: '4',
    title: 'Zorg',
    description: 'Vergelijk standpunten over zorgkosten, wachtlijsten en de toekomst van het zorgstelsel.',
    slug: 'zorg'
  },
  {
    id: '5',
    title: 'Immigratie',
    description: 'Bekijk partijvisies op immigratiebeleid, integratie en asielzoekersopvang.',
    slug: 'immigratie'
  },
  {
    id: '6',
    title: 'Economie',
    description: 'Vergelijk economische plannen, belastingbeleid en werkgelegenheidsmaatregelen.',
    slug: 'economie'
  },
  {
    id: '7',
    title: 'Veiligheid',
    description: 'Ontdek standpunten over politie, justitie en nationale veiligheid.',
    slug: 'veiligheid'
  },
  {
    id: '8',
    title: 'Europa',
    description: 'Bekijk visies op Europese samenwerking, EU-beleid en soevereiniteit.',
    slug: 'europa'
  }
];

export const parties: Party[] = [
  { id: '1', name: 'VVD', shortName: 'VVD', color: '#0A5EBD' },
  { id: '2', name: 'D66', shortName: 'D66', color: '#00B8DB' },
  { id: '3', name: 'PVV', shortName: 'PVV', color: '#FFD700' },
  { id: '4', name: 'CDA', shortName: 'CDA', color: '#00A54F' },
  { id: '5', name: 'SP', shortName: 'SP', color: '#FF0000' },
  { id: '6', name: 'PvdA', shortName: 'PvdA', color: '#DC143C' },
  { id: '7', name: 'GroenLinks', shortName: 'GL', color: '#73BF00' },
  { id: '8', name: 'FvD', shortName: 'FvD', color: '#8B4789' },
  { id: '9', name: 'ChristenUnie', shortName: 'CU', color: '#00A3E0' },
  { id: '10', name: 'Volt', shortName: 'Volt', color: '#502379' }
];

export const positions: Position[] = [
  // Woningmarkt
  {
    id: '1',
    themeId: '1',
    partyId: '1', // VVD
    summary: 'Meer woningen door minder regels en marktwerking',
    quote: 'We moeten de woningmarkt vrijer maken en bureaucratie wegsnijden om sneller te kunnen bouwen.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '2',
    themeId: '1',
    partyId: '2', // D66
    summary: 'Grote woningbouwimpuls met focus op middensegment',
    quote: 'Nederland heeft 900.000 nieuwe woningen nodig. We investeren massaal in betaalbare woningen voor starters.',
    sourceUrl: 'https://d66.nl/programma/wonen'
  },
  {
    id: '3',
    themeId: '1',
    partyId: '3', // PVV
    summary: 'Nederlandse woningen voor Nederlanders eerst',
    quote: 'Sociale woningen moeten voorrang krijgen voor mensen die hier geboren zijn.',
    sourceUrl: 'https://www.pvv.nl/verkiezingsprogramma'
  },
  {
    id: '4',
    themeId: '1',
    partyId: '5', // SP
    summary: 'Huren bevriezen en grote woningbouwprogramma',
    quote: 'Huren omlaag, speculatie stoppen en 100.000 sociale huurwoningen per jaar bouwen.',
    sourceUrl: 'https://www.sp.nl/programma/wonen'
  },
  {
    id: '5',
    themeId: '1',
    partyId: '7', // GroenLinks
    summary: 'Duurzame woningen en huurprijzenbeheersing',
    quote: 'Alle nieuwe woningen energieneutraal en huurprijzen koppelen aan WOZ-waarde.',
    sourceUrl: 'https://groenlinks.nl/programma/wonen'
  },

  // Klimaat
  {
    id: '6',
    themeId: '2',
    partyId: '1', // VVD
    summary: 'Klimaatdoelen halen via innovatie en markt',
    quote: 'We bereiken klimaatneutraliteit door technologische innovatie en marktwerking, niet door verboden.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '7',
    themeId: '2',
    partyId: '2', // D66
    summary: 'Versnelde energietransitie met groene investeringen',
    quote: 'Nederland moet koploper worden in de energietransitie met massale investeringen in wind en zon.',
    sourceUrl: 'https://d66.nl/programma/klimaat'
  },
  {
    id: '8',
    themeId: '2',
    partyId: '3', // PVV
    summary: 'Geen verdere klimaatmaatregelen ten koste van burgers',
    quote: 'Stop met het kapot belasten van de gewone Nederlandse burger voor het klimaat.',
    sourceUrl: 'https://www.pvv.nl/verkiezingsprogramma'
  },
  {
    id: '9',
    themeId: '2',
    partyId: '5', // SP
    summary: 'Eerlijke energietransitie zonder kosten voor burgers',
    quote: 'Grote vervuilers moeten betalen, niet de gewone mensen. Gratis isolatie voor alle huizen.',
    sourceUrl: 'https://www.sp.nl/programma/klimaat'
  },
  {
    id: '10',
    themeId: '2',
    partyId: '7', // GroenLinks
    summary: 'Ambitieus klimaatbeleid en groene banen',
    quote: 'Nederland klimaatneutraal in 2030 door massale investeringen in groene energie en natuur.',
    sourceUrl: 'https://groenlinks.nl/programma/klimaat'
  },

  // Onderwijs
  {
    id: '11',
    themeId: '3',
    partyId: '1', // VVD
    summary: 'Meer leraren via betere arbeidsvoorwaarden',
    quote: 'Lerarentekort oplossen door hoger salaris en minder bureaucratie voor leraren.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '12',
    themeId: '3',
    partyId: '2', // D66
    summary: 'Investeren in onderwijskwaliteit en gelijke kansen',
    quote: 'Elk kind verdient een goede start. Meer geld naar onderwijs en kleinere klassen.',
    sourceUrl: 'https://d66.nl/programma/onderwijs'
  },
  {
    id: '13',
    themeId: '3',
    partyId: '4', // CDA
    summary: 'Terug naar de basis: rekenen, lezen, schrijven',
    quote: 'Meer aandacht voor de basisvaardigheden en minder experimenteren in het onderwijs.',
    sourceUrl: 'https://www.cda.nl/programma/onderwijs'
  },
  {
    id: '14',
    themeId: '3',
    partyId: '6', // PvdA
    summary: 'Gratis onderwijs en kleinere klassen',
    quote: 'Onderwijs moet gratis zijn van peuter tot universiteit. Meer leraren, kleinere klassen.',
    sourceUrl: 'https://www.pvda.nl/programma/onderwijs'
  },
  {
    id: '15',
    themeId: '3',
    partyId: '10', // Volt
    summary: 'Digitaal onderwijs en Europese samenwerking',
    quote: 'Investeren in digitale vaardigheden en Europese uitwisseling van studenten en leraren.',
    sourceUrl: 'https://www.voltnederland.org/programma'
  },

  // Zorg
  {
    id: '16',
    themeId: '4',
    partyId: '1', // VVD
    summary: 'Betaalbare zorg via marktwerking en preventie',
    quote: 'Zorgkosten beheersen door concurrentie tussen zorgverzekeraars en meer preventie.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '17',
    themeId: '4',
    partyId: '2', // D66
    summary: 'Toegankelijke zorg en mentale gezondheid',
    quote: 'Korte wachtlijsten en betere mentale gezondheidszorg voor iedereen.',
    sourceUrl: 'https://d66.nl/programma/zorg'
  },
  {
    id: '18',
    themeId: '4',
    partyId: '5', // SP
    summary: 'Zorg is een recht, niet een product',
    quote: 'Winst uit de zorg, eigen risico afschaffen en ziekenhuizen terug naar de overheid.',
    sourceUrl: 'https://www.sp.nl/programma/zorg'
  },
  {
    id: '19',
    themeId: '4',
    partyId: '9', // ChristenUnie
    summary: 'Waardengedreven zorg met aandacht voor ouderen',
    quote: 'Zorg gebaseerd op christelijke waarden, met speciale aandacht voor kwetsbare ouderen.',
    sourceUrl: 'https://www.christenunie.nl/programma'
  },

  // Immigratie
  {
    id: '20',
    themeId: '5',
    partyId: '1', // VVD
    summary: 'Streng maar rechtvaardig immigratiebeleid',
    quote: 'Minder asielzoekers, snellere procedures en betere integratie van statushouders.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '21',
    themeId: '5',
    partyId: '3', // PVV
    summary: 'Stop massa-immigratie en islamisering',
    quote: 'Nederland uit EU-verdragen over asiel en stop met de massa-immigratie.',
    sourceUrl: 'https://www.pvv.nl/verkiezingsprogramma'
  },
  {
    id: '22',
    themeId: '5',
    partyId: '6', // PvdA
    summary: 'Humaan asielbeleid en goede opvang',
    quote: 'Waardig opvang voor vluchtelingen en Europese verdeling van asielzoekers.',
    sourceUrl: 'https://www.pvda.nl/programma/migratie'
  },
  {
    id: '23',
    themeId: '5',
    partyId: '8', // FvD
    summary: 'Nederlandse identiteit beschermen',
    quote: 'Massale immigratie bedreigt onze cultuur. Remigratiebeleid en grenzen dicht.',
    sourceUrl: 'https://www.fvd.nl/programma'
  },

  // Economie
  {
    id: '24',
    themeId: '6',
    partyId: '1', // VVD
    summary: 'Lagere belastingen en meer ondernemerschap',
    quote: 'Belastingen omlaag voor bedrijven en burgers om economische groei te stimuleren.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '25',
    themeId: '6',
    partyId: '2', // D66
    summary: 'Investeren in innovatie en duurzaamheid',
    quote: 'Nederland moet koploper worden in de kennis- en innovatie-economie.',
    sourceUrl: 'https://d66.nl/programma/economie'
  },
  {
    id: '26',
    themeId: '6',
    partyId: '5', // SP
    summary: 'Economie voor iedereen, niet alleen de rijken',
    quote: 'Minimumloon omhoog, maximumloon voor bestuurders en vermogensbelasting invoeren.',
    sourceUrl: 'https://www.sp.nl/programma/economie'
  },

  // Veiligheid
  {
    id: '27',
    themeId: '7',
    partyId: '1', // VVD
    summary: 'Meer politie en strengere straffen',
    quote: 'Minimaal 5000 extra politieagenten en criminelen harder aanpakken.',
    sourceUrl: 'https://www.vvd.nl/verkiezingsprogramma-2023'
  },
  {
    id: '28',
    themeId: '7',
    partyId: '3', // PVV
    summary: 'Veiligheid op straat voor Nederlanders',
    quote: 'Criminele allochtonen uitzetten en de doodstraf invoeren voor kindermoordenaren.',
    sourceUrl: 'https://www.pvv.nl/verkiezingsprogramma'
  },
  {
    id: '29',
    themeId: '7',
    partyId: '4', // CDA
    summary: 'Lokale veiligheid en gemeenschapspolitie',
    quote: 'Wijkagenten terug en samenwerking tussen politie en lokale gemeenschappen.',
    sourceUrl: 'https://www.cda.nl/programma/veiligheid'
  },

  // Europa
  {
    id: '30',
    themeId: '8',
    partyId: '2', // D66
    summary: 'Sterker Europa en Europese samenwerking',
    quote: 'Een federaal Europa met meer Europese integratie op klimaat, defensie en migratie.',
    sourceUrl: 'https://d66.nl/programma/europa'
  },
  {
    id: '31',
    themeId: '8',
    partyId: '3', // PVV
    summary: 'Nexit: Nederland uit de EU',
    quote: 'De EU kost Nederland miljarden. Tijd voor Nexit en onze soevereiniteit terug.',
    sourceUrl: 'https://www.pvv.nl/verkiezingsprogramma'
  },
  {
    id: '32',
    themeId: '8',
    partyId: '10', // Volt
    summary: 'Pro-Europees en Europese Federatie',
    quote: 'Een Verenigde Staten van Europa met één Europees leger en gedeelde soevereiniteit.',
    sourceUrl: 'https://www.voltnederland.org/programma'
  }
];

// Mock API functions
export const fetchThemes = async (): Promise<Theme[]> => {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  return themes;
};

export const fetchParties = async (): Promise<Party[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return parties;
};

export const fetchPositionsByTheme = async (themeId: string): Promise<Position[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return positions.filter(position => position.themeId === themeId);
};

export const fetchThemeBySlug = async (slug: string): Promise<Theme | undefined> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return themes.find(theme => theme.slug === slug);
};
