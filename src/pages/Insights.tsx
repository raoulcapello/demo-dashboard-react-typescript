
import { Header } from "@/components/Header";
import { RadarChart } from "@/components/insights/RadarChart";
import { BarChart } from "@/components/insights/BarChart";
import { PartyHeatmap } from "@/components/insights/PartyHeatmap";
import { WordCloud } from "@/components/insights/WordCloud";

const Insights = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Inzicht in standpunten van partijen
          </h1>
          <p className="text-muted-foreground">
            Visuele analyse van partijstandpunten en gedrag op verschillende thema's
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RadarChart />
          <PartyHeatmap />
          <BarChart />
          <WordCloud />
        </div>
      </main>
    </div>
  );
};

export default Insights;
