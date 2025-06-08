
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart as RechartsRadarChart, ResponsiveContainer } from "recharts";

const data = [
  {
    theme: "Woningmarkt",
    "Partij A": 8,
    "Partij B": 6,
    "Partij C": 7,
  },
  {
    theme: "Klimaat",
    "Partij A": 9,
    "Partij B": 4,
    "Partij C": 8,
  },
  {
    theme: "Onderwijs",
    "Partij A": 7,
    "Partij B": 8,
    "Partij C": 6,
  },
  {
    theme: "Zorg",
    "Partij A": 6,
    "Partij B": 7,
    "Partij C": 9,
  },
  {
    theme: "Economie",
    "Partij A": 5,
    "Partij B": 9,
    "Partij C": 6,
  },
];

const chartConfig = {
  "Partij A": {
    label: "Partij A",
    color: "hsl(var(--chart-1))",
  },
  "Partij B": {
    label: "Partij B",
    color: "hsl(var(--chart-2))",
  },
  "Partij C": {
    label: "Partij C",
    color: "hsl(var(--chart-3))",
  },
};

export const RadarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vergelijking van thema's</CardTitle>
        <CardDescription>
          Standpunt sterkte per partij over verschillende thema's (schaal 1-10)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
          <RechartsRadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="theme" />
            <PolarGrid />
            <PolarRadiusAxis angle={90} domain={[0, 10]} />
            <Radar
              dataKey="Partij A"
              stroke="var(--color-partij-a)"
              fill="var(--color-partij-a)"
              fillOpacity={0.2}
            />
            <Radar
              dataKey="Partij B"
              stroke="var(--color-partij-b)"
              fill="var(--color-partij-b)"
              fillOpacity={0.2}
            />
            <Radar
              dataKey="Partij C"
              stroke="var(--color-partij-c)"
              fill="var(--color-partij-c)"
              fillOpacity={0.2}
            />
          </RechartsRadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
