
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Theme } from "@/types";
import { themeConfig, ThemeSlug } from "@/config/themeConfig";

interface ThemeCardProps {
  theme: Theme;
  themeIndex: number;
  onViewPositions: (slug: string) => void;
}

export const ThemeCard = ({ theme, themeIndex, onViewPositions }: ThemeCardProps) => {
  const config = themeConfig[theme.slug as ThemeSlug] || {
    icon: themeConfig.woningmarkt.icon,
    color: 'hsl(var(--primary))',
    bgColor: 'hsl(var(--primary))',
    borderColor: 'hsl(var(--primary))'
  };
  
  const IconComponent = config.icon;

  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-lg group cursor-pointer border-l-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
      style={{ 
        borderLeftColor: config.borderColor,
        '--theme-color': config.color,
        '--theme-bg': config.bgColor
      } as React.CSSProperties}
    >
      <CardHeader className="relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div 
            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ 
              backgroundColor: `${config.bgColor}15`,
              color: config.color
            }}
          >
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-[color:var(--theme-color)] transition-colors duration-300">
              {theme.title}
            </CardTitle>
          </div>
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed mt-3">
          {theme.description}
        </CardDescription>
        
        {/* Subtle background decoration */}
        <div 
          className="absolute -right-6 -top-6 w-16 h-16 rounded-full opacity-[0.03] transition-all duration-300 group-hover:opacity-[0.08] group-hover:scale-125"
          style={{ backgroundColor: config.bgColor }}
        />
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={() => onViewPositions(theme.slug)}
          className="w-full group/button transition-all duration-300 hover:shadow-md"
          variant="outline"
          style={{
            borderColor: `${config.borderColor}30`,
            color: config.color
          }}
        >
          Bekijk standpunten
          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
