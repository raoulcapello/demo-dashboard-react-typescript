
import { Home, Leaf, GraduationCap, Heart, Users, TrendingUp, Shield, Globe } from "lucide-react";

// Professional color palette with diverse colors - blues, greens, pink, turquoise, avoiding orange/red/yellow
export const themeConfig = {
  'woningmarkt': { icon: Home, color: '#2563eb', bgColor: '#2563eb', borderColor: '#2563eb' }, // Blue
  'klimaat': { icon: Leaf, color: '#059669', bgColor: '#059669', borderColor: '#059669' }, // Green
  'onderwijs': { icon: GraduationCap, color: '#ec4899', bgColor: '#ec4899', borderColor: '#ec4899' }, // Pink
  'zorg': { icon: Heart, color: '#06b6d4', bgColor: '#06b6d4', borderColor: '#06b6d4' }, // Turquoise
  'immigratie': { icon: Users, color: '#4338ca', bgColor: '#4338ca', borderColor: '#4338ca' }, // Indigo
  'economie': { icon: TrendingUp, color: '#0d9488', bgColor: '#0d9488', borderColor: '#0d9488' }, // Teal
  'veiligheid': { icon: Shield, color: '#1d4ed8', bgColor: '#1d4ed8', borderColor: '#1d4ed8' }, // Royal Blue
  'europa': { icon: Globe, color: '#7c3aed', bgColor: '#7c3aed', borderColor: '#7c3aed' }, // Purple
};

export type ThemeSlug = keyof typeof themeConfig;
