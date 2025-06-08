
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
  }
];

export const parties: Party[] = [
  { id: '1', name: 'Partij A', shortName: 'PA', color: '#E53E3E' },
  { id: '2', name: 'Partij B', shortName: 'PB', color: '#3182CE' },
  { id: '3', name: 'Partij C', shortName: 'PC', color: '#38A169' },
  { id: '4', name: 'Partij D', shortName: 'PD', color: '#D69E2E' },
  { id: '5', name: 'Partij E', shortName: 'PE', color: '#805AD5' }
];

export const positions: Position[] = [
  // Woningmarkt
  {
    id: '1',
    themeId: '1',
    partyId: '1',
    summary: 'Meer sociale woningbouw en strenge huurregulering',
    quote: 'Wij willen 100.000 nieuwe sociale huurwoningen per jaar bouwen en huurprijzen bevriezen.',
    sourceUrl: 'https://example.com/partij-a-verkiezingsprogramma'
  },
  {
    id: '2',
    themeId: '1',
    partyId: '2',
    summary: 'Stimuleren van koopwoningen en flexibele huurmarkt',
    quote: 'De markt moet meer ruimte krijgen om te bepalen waar en hoe er gebouwd wordt.',
    sourceUrl: 'https://example.com/partij-b-verkiezingsprogramma'
  },
  {
    id: '3',
    themeId: '1',
    partyId: '3',
    summary: 'Duurzame woningbouw en betaalbare starter woningen',
    quote: 'Alle nieuwe woningen moeten energieneutraal zijn en toegankelijk voor starters.',
    sourceUrl: 'https://example.com/partij-c-verkiezingsprogramma'
  },
  // Klimaat
  {
    id: '4',
    themeId: '2',
    partyId: '1',
    summary: 'Versnelde energietransitie en CO2-heffing',
    quote: 'Nederland moet in 2030 klimaatneutraal zijn door massale investering in groene energie.',
    sourceUrl: 'https://example.com/partij-a-verkiezingsprogramma'
  },
  {
    id: '5',
    themeId: '2',
    partyId: '2',
    summary: 'Geleidelijke overgang met focus op economische groei',
    quote: 'Klimaatdoelen zijn belangrijk, maar niet ten koste van de Nederlandse economie.',
    sourceUrl: 'https://example.com/partij-b-verkiezingsprogramma'
  },
  {
    id: '6',
    themeId: '2',
    partyId: '3',
    summary: 'Groene innovatie en internationale samenwerking',
    quote: 'Door innovatie en samenwerking kunnen we klimaatdoelen halen zonder welvaartsverlies.',
    sourceUrl: 'https://example.com/partij-c-verkiezingsprogramma'
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
