import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", "VVD": 12, "D66": 8, "PVV": 15 },
  { month: "Feb", "VVD": 15, "D66": 6, "PVV": 18 },
  { month: "Mrt", "VVD": 18, "D66": 10, "PVV": 22 },
  { month: "Apr", "VVD": 22, "D66": 14, "PVV": 25 },
  { month: "Mei", "VVD": 28, "D66": 18, "PVV": 30 },
  { month: "Jun", "VVD": 25, "D66": 16, "PVV": 28 },
];

const chartConfig = {
  VVD: {
    label: "VVD",
    color: "hsl(var(--chart-1))",
  },
  D66: {
    label: "D66",
    color: "hsl(var(--chart-2))",
  },
  PVV: {
    label: "PVV",
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
              dataKey="VVD"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="D66"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="PVV"
              type="monotone"
              strokeWidth={2}
              dot={false}
            />
          </RechartsLineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
