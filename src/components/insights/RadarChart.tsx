
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { useState } from "react";
import { safeNumber, validateChartData } from "@/utils/chartUtils";

export const RadarChart = () => {
  const [selectedParties, setSelectedParties] = useState<string[]>(['1', '2', '7']); // VVD, D66, GroenLinks

  // Fetch data with error handling
  const { data: themes = [], isLoading: themesLoading, error: themesError } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  const { data: parties = [], isLoading: partiesLoading, error: partiesError } = useQuery({
    queryKey: ['parties'],
    queryFn: fetchParties,
  });

  const { data: allPositions = [], isLoading: positionsLoading, error: positionsError } = useQuery({
    queryKey: ['all-positions'],
    queryFn: async () => {
      const positions = await Promise.all(
        themes.map(theme => fetchPositionsByTheme(theme.id))
      );
      return positions.flat();
    },
    enabled: themes.length > 0,
  });

  // Handle party selection with validation
  const handlePartyToggle = (partyId: string) => {
    setSelectedParties(prev => 
      prev.includes(partyId) 
        ? prev.filter(id => id !== partyId)
        : prev.length < 4 ? [...prev, partyId] : prev
    );
  };

  // Show loading state
  if (themesLoading || partiesLoading || positionsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partijen vergelijking per thema</CardTitle>
          <CardDescription>Laden van gegevens...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-muted-foreground">Gegevens worden geladen...</div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (themesError || partiesError || positionsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partijen vergelijking per thema</CardTitle>
          <CardDescription>Er is een fout opgetreden bij het laden van gegevens</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="text-muted-foreground">Kon gegevens niet laden</div>
        </CardContent>
      </Card>
    );
  }

  // Filter selected parties that actually exist
  const validSelectedParties = selectedParties.filter(partyId => 
    parties.some(party => party.id === partyId)
  );

  // Create chart data with proper validation
  const rawChartData = themes.map(theme => {
    const dataPoint: any = { 
      theme: theme.title || 'Onbekend thema'
    };
    
    validSelectedParties.forEach(partyId => {
      const party = parties.find(p => p.id === partyId);
      if (party) {
        const position = allPositions.find(pos => 
          pos?.themeId === theme.id && pos?.partyId === partyId
        );
        
        // Calculate score based on summary length with safe fallbacks
        let score = 0;
        if (position && position.summary) {
          const rawScore = position.summary.length / 10;
          score = safeNumber(rawScore, 0, 0, 10);
        }
        
        dataPoint[party.name] = Math.round(score);
      }
    });
    
    return dataPoint;
  });

  // Validate chart data
  const chartData = validateChartData(rawChartData);

  // Create chart config with validation
  const chartConfig = validSelectedParties.reduce((config, partyId) => {
    const party = parties.find(p => p.id === partyId);
    if (party) {
      config[party.name] = {
        label: party.name,
        color: party.color || '#666666', // Fallback color
      };
    }
    return config;
  }, {} as any);

  // Show empty state if no valid data
  if (chartData.length === 0 || validSelectedParties.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partijen vergelijking per thema</CardTitle>
          <CardDescription>
            Vergelijk standpunten van geselecteerde partijen (max 4)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Selecteer partijen om te vergelijken:</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {parties.map((party) => (
                <label key={party.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedParties.includes(party.id)}
                    onChange={() => handlePartyToggle(party.id)}
                    disabled={!selectedParties.includes(party.id) && selectedParties.length >= 4}
                    className="rounded"
                  />
                  <span className="text-xs">{party.shortName}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-muted-foreground">Selecteer partijen om de vergelijking te zien</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partijen vergelijking per thema</CardTitle>
        <CardDescription>
          Vergelijk standpunten van geselecteerde partijen (max 4)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Selecteer partijen om te vergelijken:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {parties.map((party) => (
              <label key={party.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedParties.includes(party.id)}
                  onChange={() => handlePartyToggle(party.id)}
                  disabled={!selectedParties.includes(party.id) && selectedParties.length >= 4}
                  className="rounded"
                />
                <span className="text-xs">{party.shortName}</span>
              </label>
            ))}
          </div>
        </div>
        
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RechartsRadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="theme" className="text-xs" />
            <PolarGrid />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            {validSelectedParties.map((partyId) => {
              const party = parties.find(p => p.id === partyId);
              if (!party) return null;
              return (
                <Radar
                  key={party.id}
                  dataKey={party.name}
                  stroke={party.color || '#666666'}
                  fill={party.color || '#666666'}
                  fillOpacity={0.1}
                  strokeWidth={2}
                />
              );
            })}
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
