
import { Theme, Party, Position } from '../types';
import { themes } from '../data/themes';
import { parties } from '../data/parties';
import { positions } from '../data/positions';

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
