
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", "Partij A": 12, "Partij B": 8, "Partij C": 15 },
  { month: "Feb", "Partij A": 15, "Partij B": 6, "Partij C": 18 },
  { month: "Mrt", "Partij A": 18, "Partij B": 10, "Partij C": 22 },
  { month: "Apr", "Partij A": 22, "Partij B": 14, "Partij C": 25 },
  { month: "Mei", "Partij A": 28, "Partij B": 18, "Partij C": 30 },
  { month: "Jun", "Partij A": 25, "Partij B": 16, "Partij C": 28 },
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

export const LineChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Media-aandacht voor klimaat</CardTitle>
        <CardDescription>
          Aantal klimaat-gerelateerde artikelen per partij over tijd
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsLineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Partij A"
              type="monotone"
              stroke="var(--color-partij-a)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Partij B"
              type="monotone"
              stroke="var(--color-partij-b)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Partij C"
              type="monotone"
              stroke="var(--color-partij-c)"
              strokeWidth={2}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
