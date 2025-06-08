
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Theme } from "@/types";

interface ThemeCardProps {
  theme: Theme;
  onViewPositions: (slug: string) => void;
}

export const ThemeCard = ({ theme, onViewPositions }: ThemeCardProps) => {
  return (
    <Card className="h-full transition-all duration-200 hover:shadow-lg hover:border-primary/20 group cursor-pointer">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
          {theme.title}
        </CardTitle>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {theme.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={() => onViewPositions(theme.slug)}
          className="w-full group/button"
          variant="outline"
        >
          Bekijk standpunten
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
};
