
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const words = [
  { text: "duurzaam", size: 32, party: "Partij A", color: "hsl(var(--chart-1))" },
  { text: "groene energie", size: 28, party: "Partij C", color: "hsl(var(--chart-3))" },
  { text: "klimaatverandering", size: 24, party: "Partij A", color: "hsl(var(--chart-1))" },
  { text: "CO2-uitstoot", size: 22, party: "Partij B", color: "hsl(var(--chart-2))" },
  { text: "windenergie", size: 20, party: "Partij C", color: "hsl(var(--chart-3))" },
  { text: "zonnepanelen", size: 18, party: "Partij A", color: "hsl(var(--chart-1))" },
  { text: "milieu", size: 16, party: "Partij B", color: "hsl(var(--chart-2))" },
  { text: "transitie", size: 15, party: "Partij C", color: "hsl(var(--chart-3))" },
  { text: "innovatie", size: 14, party: "Partij B", color: "hsl(var(--chart-2))" },
  { text: "biomassa", size: 13, party: "Partij A", color: "hsl(var(--chart-1))" },
  { text: "waterstof", size: 12, party: "Partij C", color: "hsl(var(--chart-3))" },
  { text: "recycling", size: 11, party: "Partij B", color: "hsl(var(--chart-2))" },
];

export const WordCloud = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Veelgebruikte woorden</CardTitle>
        <CardDescription>
          Meest gebruikte termen in klimaat-gerelateerde content per partij
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center justify-center gap-2 p-4 min-h-[200px]">
          {words.map((word, index) => (
            <span
              key={index}
              className="inline-block cursor-pointer transition-all duration-200 hover:scale-110"
              style={{
                fontSize: `${word.size}px`,
                color: word.color,
                fontWeight: Math.floor(word.size / 4) * 100 + 300,
              }}
              title={`${word.text} - ${word.party}`}
            >
              {word.text}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-1))" }}></div>
            <span>Partij A</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-2))" }}></div>
            <span>Partij B</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(var(--chart-3))" }}></div>
            <span>Partij C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
