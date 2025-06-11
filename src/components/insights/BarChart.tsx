
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchPositionsByTheme } from "@/services/mockApi";

export const BarChart = () => {
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
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

  const chartData = themes.map(theme => {
    const themePositions = allPositions.filter(pos => pos.themeId === theme.id);
    const avgContentLength = themePositions.reduce((sum, pos) => 
      sum + pos.summary.length + pos.quote.length, 0) / (themePositions.length || 1);
    
    return {
      theme: theme.title.length > 12 ? theme.title.substring(0, 10) + '...' : theme.title,
      fullTheme: theme.title,
      engagement: Math.round(avgContentLength / 10), // Normalize to reasonable scale
      positions: themePositions.length,
      fill: `hsl(${210 + themes.indexOf(theme) * 30}, 70%, 50%)`,
    };
  }).sort((a, b) => b.engagement - a.engagement);

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
        <ChartContainer config={chartConfig}>
          <RechartsBarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 20,
              right: 10,
            }}
          >
            <XAxis type="number" dataKey="engagement" hide />
            <YAxis
              dataKey="theme"
              type="category"
              tickLine={false}
              tickMargin={8}
              axisLine={false}
              width={45}
              fontSize={11}
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
      </CardContent>
    </Card>
  );
};
