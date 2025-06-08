
export interface Theme {
  id: string;
  title: string;
  description: string;
  slug: string;
}

export interface Party {
  id: string;
  name: string;
  color: string;
  shortName: string;
}

export interface Position {
  id: string;
  themeId: string;
  partyId: string;
  summary: string;
  quote: string;
  sourceUrl: string;
}
