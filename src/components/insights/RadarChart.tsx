
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { PartySelector } from "@/components/PartySelector";
import { useState } from "react";

export const RadarChart = () => {
  const [selectedParties, setSelectedParties] = useState<string[]>(['1', '2', '7']); // VVD, D66, GroenLinks

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

  const handlePartyToggle = (partyId: string) => {
    setSelectedParties(prev => 
      prev.includes(partyId) 
        ? prev.filter(id => id !== partyId)
        : prev.length < 4 ? [...prev, partyId] : prev
    );
  };

  // Create chart data
  const chartData = themes.map(theme => {
    const dataPoint: any = { theme: theme.title };
    
    selectedParties.forEach(partyId => {
      const party = parties.find(p => p.id === partyId);
      if (party) {
        const position = allPositions.find(pos => pos.themeId === theme.id && pos.partyId === partyId);
        // Calculate score based on summary length and detail (simple heuristic)
        const score = position ? Math.min(10, Math.max(1, position.summary.length / 10)) : 0;
        dataPoint[party.name] = Math.round(score);
      }
    });
    
    return dataPoint;
  });

  const chartConfig = selectedParties.reduce((config, partyId, index) => {
    const party = parties.find(p => p.id === partyId);
    if (party) {
      config[party.name] = {
        label: party.name,
        color: party.color,
      };
    }
    return config;
  }, {} as any);

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
            {selectedParties.map((partyId) => {
              const party = parties.find(p => p.id === partyId);
              if (!party) return null;
              return (
                <Radar
                  key={party.id}
                  dataKey={party.name}
                  stroke={party.color}
                  fill={party.color}
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
