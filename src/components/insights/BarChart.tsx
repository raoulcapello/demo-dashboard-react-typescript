
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";

const data = [
  {
    party: "Partij A",
    percentage: 78,
    fill: "var(--color-partij-a)",
  },
  {
    party: "Partij B",
    percentage: 65,
    fill: "var(--color-partij-b)",
  },
  {
    party: "Partij C",
    percentage: 82,
    fill: "var(--color-partij-c)",
  },
];

const chartConfig = {
  percentage: {
    label: "Percentage",
  },
  "partij-a": {
    label: "Partij A",
    color: "hsl(var(--chart-1))",
  },
  "partij-b": {
    label: "Partij B",
    color: "hsl(var(--chart-2))",
  },
  "partij-c": {
    label: "Partij C",
    color: "hsl(var(--chart-3))",
  },
};

export const BarChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stemmen in lijn met programma</CardTitle>
        <CardDescription>
          Percentage stemgedrag dat overeenkomt met verkiezingsprogramma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RechartsBarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="percentage" hide />
            <YAxis
              dataKey="party"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 8)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="percentage" layout="horizontal" radius={4} />
          </RechartsBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
