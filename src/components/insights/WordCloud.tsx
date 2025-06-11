
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { useState } from "react";

export const WordCloud = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

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

  const extractKeywords = () => {
    const filteredPositions = selectedTheme === 'all' 
      ? allPositions 
      : allPositions.filter(pos => pos.themeId === selectedTheme);

    const text = filteredPositions.map(pos => pos.summary + ' ' + pos.quote).join(' ').toLowerCase();
    
    // Common Dutch words to exclude
    const stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'voor', 'in', 'op', 'met', 'door', 'naar', 'bij', 'te', 'aan', 'om',
      'uit', 'over', 'zijn', 'hebben', 'worden', 'moet', 'kunnen', 'meer', 'nederland', 'nederlanders',
      'mensen', 'alle', 'ook', 'dit', 'dat', 'we', 'onze', 'maar', 'als', 'niet', 'geen', 'wel'
    ]);

    const words = text.match(/\b[a-zëïöüá-ÿ]{4,}\b/g) || [];
    const wordCount = words.reduce((acc: { [key: string]: number }, word) => {
      if (!stopWords.has(word)) {
        acc[word] = (acc[word] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(wordCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 30)
      .map(([word, count], index) => ({
        text: word,
        size: Math.max(12, Math.min(32, count * 3)),
        count,
        color: `hsl(${210 + index * 12}, 70%, ${50 + (count * 5)}%)`,
      }));
  };

  const keywords = extractKeywords();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Veelgebruikte termen</CardTitle>
        <CardDescription>
          Meest voorkomende woorden in partijstandpunten
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTheme('all')}
            className={`px-3 py-1 rounded text-xs ${
              selectedTheme === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Alle thema's
          </button>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1 rounded text-xs ${
                selectedTheme === theme.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {theme.title}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 p-4 min-h-[200px] bg-gradient-to-br from-background to-secondary/20 rounded-lg">
          {keywords.map((word, index) => (
            <span
              key={index}
              className="inline-block cursor-pointer transition-all duration-200 hover:scale-110 hover:text-primary"
              style={{
                fontSize: `${word.size}px`,
                color: word.color,
                fontWeight: Math.floor(word.size / 4) * 100 + 300,
              }}
              title={`"${word.text}" - ${word.count} keer gebruikt`}
            >
              {word.text}
            </span>
          ))}
        </div>

        {keywords.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            Gebaseerd op {allPositions.length} partijstandpunten
            {selectedTheme !== 'all' && (
              <span> voor {themes.find(t => t.id === selectedTheme)?.title}</span>
            )}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
