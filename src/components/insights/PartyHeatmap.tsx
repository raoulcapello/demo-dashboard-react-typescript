
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const PartyHeatmap = () => {
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  const { data: parties = [] } = useQuery({
    queryKey: ['parties'],
    queryFn: fetchParties,
  });

  const { data: allPositions = [] } = useQuery({
    queryKey: ['all-positions'],
    queryFn: async () => {
      const positions = await Promise.all(
        themes.map(theme => fetchPositionsByTheme(theme.id))
      );
      return positions.flat();
    },
    enabled: themes.length > 0,
  });

  const getPositionIntensity = (partyId: string, themeId: string) => {
    const position = allPositions.find(pos => pos.partyId === partyId && pos.themeId === themeId);
    if (!position) return 0;
    
    // Calculate intensity based on summary and quote length
    const summaryScore = position.summary.length / 100;
    const quoteScore = position.quote.length / 200;
    return Math.min(1, (summaryScore + quoteScore) / 2);
  };

  const getBackgroundColor = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-100';
    const opacity = Math.max(0.2, intensity);
    return `bg-blue-500 opacity-${Math.round(opacity * 100)}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partij standpunten dekking</CardTitle>
        <CardDescription>
          Heatmap van partijstandpunten per thema (donkerder = meer gedetailleerd)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header with theme names */}
              <div className="grid grid-cols-9 gap-1 mb-2">
                <div className="text-xs font-medium p-2"></div>
                {themes.map(theme => (
                  <div key={theme.id} className="text-xs font-medium p-1 text-center">
                    {theme.title.length > 10 ? theme.title.substring(0, 8) + '...' : theme.title}
                  </div>
                ))}
              </div>
              
              {/* Party rows */}
              {parties.map(party => (
                <div key={party.id} className="grid grid-cols-9 gap-1 mb-1">
                  <div className="text-xs font-medium p-2 flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: party.color }}></span>
                    {party.shortName}
                  </div>
                  {themes.map(theme => {
                    const intensity = getPositionIntensity(party.id, theme.id);
                    const position = allPositions.find(pos => pos.partyId === party.id && pos.themeId === theme.id);
                    
                    return (
                      <Tooltip key={theme.id}>
                        <TooltipTrigger>
                          <div 
                            className={`h-8 rounded border ${intensity > 0 ? 'bg-blue-500' : 'bg-gray-100'} cursor-pointer hover:scale-105 transition-transform`}
                            style={{ 
                              backgroundColor: intensity > 0 ? party.color : undefined,
                              opacity: intensity > 0 ? Math.max(0.3, intensity) : 1
                            }}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="max-w-xs">
                            <p className="font-medium">{party.name} - {theme.title}</p>
                            {position ? (
                              <p className="text-sm mt-1">{position.summary}</p>
                            ) : (
                              <p className="text-sm mt-1 text-muted-foreground">Geen standpunt beschikbaar</p>
                            )}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};
