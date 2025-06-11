
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchPositionsByTheme } from "@/services/mockApi";
import { calculateAvgContentLength, safeNumber, validateChartData } from "@/utils/chartUtils";

export const BarChart = () => {
  // Fetch themes with error handling
  const { data: themes = [], isLoading: themesLoading, error: themesError } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  // Fetch all positions with proper error handling
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

  // Show loading state
  if (themesLoading || positionsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thema engagement analyse</CardTitle>
          <CardDescription>Laden van gegevens...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="text-muted-foreground">Gegevens worden geladen...</div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (themesError || positionsError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thema engagement analyse</CardTitle>
          <CardDescription>Er is een fout opgetreden bij het laden van gegevens</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="text-muted-foreground">Kon gegevens niet laden</div>
        </CardContent>
      </Card>
    );
  }

  // Create chart data with proper validation
  const rawChartData = themes.map((theme, index) => {
    const themePositions = allPositions.filter(pos => pos?.themeId === theme.id);
    
    // Calculate average content length safely
    const avgContentLength = calculateAvgContentLength(themePositions);
    
    // Normalize engagement score to reasonable scale (0-100)
    const engagement = safeNumber(Math.round(avgContentLength / 10), 0, 0, 100);
    
    return {
      theme: theme.title || 'Onbekend thema',
      fullTheme: theme.title || 'Onbekend thema',
      engagement,
      positions: themePositions.length,
      fill: `hsl(${210 + index * 30}, 70%, 50%)`,
    };
  }).filter(item => item.engagement > 0) // Only include themes with actual engagement
    .sort((a, b) => b.engagement - a.engagement);

  // Validate chart data before rendering
  const chartData = validateChartData(rawChartData);

  // Show empty state if no valid data
  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Thema engagement analyse</CardTitle>
          <CardDescription>Geen gegevens beschikbaar voor analyse</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[200px]">
          <div className="text-muted-foreground">Geen engagement gegevens gevonden</div>
        </CardContent>
      </Card>
    );
  }

  // Calculate dynamic height based on number of data items
  const chartHeight = Math.max(300, chartData.length * 50 + 100);

  const chartConfig = {
    engagement: {
      label: "Engagement Score",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thema engagement analyse</CardTitle>
        <CardDescription>
          Engagement score gebaseerd op lengte en detail van standpunten
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${chartHeight}px` }}>
          <ChartContainer config={chartConfig} className="h-full w-full">
            <RechartsBarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 30,
                right: 10,
                top: 10,
                bottom: 10,
              }}
              height={chartHeight - 20}
            >
              <XAxis 
                type="number" 
                dataKey="engagement" 
                hide 
                domain={[0, 'dataMax']}
              />
              <YAxis
                dataKey="theme"
                type="category"
                tickLine={false}
                tickMargin={8}
                axisLine={false}
                width={80}
                fontSize={12}
              />
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-background border rounded-lg p-3 shadow-lg">
                        <p className="font-medium">{data.fullTheme}</p>
                        <p className="text-sm text-muted-foreground">
                          Engagement: {data.engagement}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Standpunten: {data.positions}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="engagement" layout="horizontal" radius={4} />
            </RechartsBarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
