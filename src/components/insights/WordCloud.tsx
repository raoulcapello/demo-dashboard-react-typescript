
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

    console.log('Filtered positions count:', filteredPositions.length);
    
    // Filter out positions with empty or whitespace-only summary/quote
    const validPositions = filteredPositions.filter(pos => {
      const hasValidSummary = pos.summary && pos.summary.trim().length > 0;
      const hasValidQuote = pos.quote && pos.quote.trim().length > 0;
      return hasValidSummary || hasValidQuote;
    });

    console.log('Valid positions count:', validPositions.length);

    // Concatenate text more carefully, ensuring no empty strings
    const textParts = validPositions.map(pos => {
      const summary = pos.summary ? pos.summary.trim() : '';
      const quote = pos.quote ? pos.quote.trim() : '';
      return [summary, quote].filter(text => text.length > 0).join(' ');
    }).filter(text => text.length > 0);

    const text = textParts.join(' ').toLowerCase();
    console.log('Total text length:', text.length);
    
    // Common Dutch words to exclude
    const stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'voor', 'in', 'op', 'met', 'door', 'naar', 'bij', 'te', 'aan', 'om',
      'uit', 'over', 'zijn', 'hebben', 'worden', 'moet', 'kunnen', 'meer', 'nederland', 'nederlanders',
      'mensen', 'alle', 'ook', 'dit', 'dat', 'we', 'onze', 'maar', 'als', 'niet', 'geen', 'wel'
    ]);

    // Improved regex pattern to match only valid Dutch words
    const words = text.match(/\b[a-zëïöüá-ÿ]{4,}\b/g);
    console.log('Extracted words count:', words ? words.length : 0);
    
    if (!words) return [];

    // More robust word counting with validation
    const wordCount = words.reduce((acc: Record<string, number>, word: string) => {
      const cleanWord = word.trim().toLowerCase();
      // Ensure word is valid: not empty, not just punctuation, not a stop word
      if (cleanWord && 
          cleanWord.length >= 4 && 
          /^[a-zëïöüá-ÿ]+$/.test(cleanWord) && 
          !stopWords.has(cleanWord)) {
        acc[cleanWord] = (acc[cleanWord] || 0) + 1;
      }
      return acc;
    }, {});

    console.log('Word count entries:', Object.keys(wordCount).length);

    const keywords = Object.entries(wordCount)
      .filter(([word, count]) => {
        // Strict filtering: word must exist, be non-empty after trim, and have count > 0
        const isValid = word && 
                       typeof word === 'string' && 
                       word.trim().length >= 4 && 
                       count > 0 &&
                       /^[a-zëïöüá-ÿ]+$/.test(word.trim());
        return isValid;
      })
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 30)
      .map(([word, count], index) => {
        const cleanWord = word.trim();
        return {
          text: cleanWord,
          size: Math.max(12, Math.min(32, (count as number) * 3)),
          count: count as number,
          color: `hsl(${210 + index * 12}, 70%, ${50 + ((count as number) * 5)}%)`,
        };
      })
      .filter(item => {
        // Final validation before rendering
        return item.text && 
               typeof item.text === 'string' && 
               item.text.length >= 4 &&
               /^[a-zëïöüá-ÿ]+$/.test(item.text);
      });

    console.log('Final keywords count:', keywords.length);
    console.log('Keywords:', keywords.map(k => k.text));

    return keywords;
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
      <CardContent className={keywords.length > 0 ? "space-y-1" : ""}>
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

        {keywords.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 min-h-[200px] bg-gradient-to-br from-background to-secondary/20 rounded-lg">
              {keywords.map((word, index) => (
                <span
                  key={`${word.text}-${index}`}
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

            <p className="text-xs text-muted-foreground text-center">
              Gebaseerd op {allPositions.length} partijstandpunten
              {selectedTheme !== 'all' && (
                <span> voor {themes.find(t => t.id === selectedTheme)?.title}</span>
              )}
            </p>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-sm text-muted-foreground">
              Geen termen gevonden voor de geselecteerde filter
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
