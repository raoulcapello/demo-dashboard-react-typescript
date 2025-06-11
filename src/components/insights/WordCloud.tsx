
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { useState } from "react";

export const WordCloud = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  // Fetch themes and parties
  const { data: themes = [] } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  const { data: parties = [] } = useQuery({
    queryKey: ['parties'],
    queryFn: fetchParties,
  });

  // Fetch positions based on selected theme
  const { data: positions = [] } = useQuery({
    queryKey: ['positions-for-wordcloud', selectedTheme],
    queryFn: async () => {
      console.log('Fetching positions for theme:', selectedTheme);
      
      if (selectedTheme === 'all') {
        // Fetch all positions across all themes
        const allPositions = await Promise.all(
          themes.map(theme => fetchPositionsByTheme(theme.id))
        );
        const flatPositions = allPositions.flat();
        console.log('All positions fetched:', flatPositions.length);
        return flatPositions;
      } else {
        // Fetch positions for specific theme
        const themePositions = await fetchPositionsByTheme(selectedTheme);
        console.log(`Positions for theme ${selectedTheme}:`, themePositions.length);
        return themePositions;
      }
    },
    enabled: themes.length > 0, // Only run when themes are loaded
  });

  /**
   * Extract and process keywords from position data
   * Returns array of keyword objects with text, size, count, and color
   */
  const extractKeywords = () => {
    console.log('Processing positions:', positions.length);
    console.log('Selected theme:', selectedTheme);
    
    // Validate that we have the correct positions for the selected theme
    if (selectedTheme !== 'all') {
      const correctThemePositions = positions.filter(pos => pos.themeId === selectedTheme);
      console.log(`Positions matching theme ${selectedTheme}:`, correctThemePositions.length);
      
      if (correctThemePositions.length !== positions.length) {
        console.warn('Mismatch in theme filtering detected!');
      }
    }

    // Filter out positions with empty or whitespace-only summary/quote
    const validPositions = positions.filter(pos => {
      const hasValidSummary = pos.summary && pos.summary.trim().length > 0;
      const hasValidQuote = pos.quote && pos.quote.trim().length > 0;
      return hasValidSummary || hasValidQuote;
    });

    console.log('Valid positions count:', validPositions.length);

    // Safely concatenate text from valid positions
    const textParts = validPositions.map(pos => {
      const summary = pos.summary ? pos.summary.trim() : '';
      const quote = pos.quote ? pos.quote.trim() : '';
      
      // Only include non-empty text parts
      const parts = [summary, quote].filter(text => text.length > 0);
      return parts.join(' ');
    }).filter(text => text.length > 0);

    const combinedText = textParts.join(' ').toLowerCase();
    console.log('Total text length:', combinedText.length);
    
    // Common Dutch stop words to exclude from word cloud
    const stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'voor', 'in', 'op', 'met', 'door', 'naar', 'bij', 'te', 'aan', 'om',
      'uit', 'over', 'zijn', 'hebben', 'worden', 'moet', 'kunnen', 'meer', 'nederland', 'nederlanders',
      'mensen', 'alle', 'ook', 'dit', 'dat', 'we', 'onze', 'maar', 'als', 'niet', 'geen', 'wel'
    ]);

    // Extract words using robust regex pattern for Dutch text
    const words = combinedText.match(/\b[a-zëïöüá-ÿ]{4,}\b/g);
    console.log('Extracted words count:', words ? words.length : 0);
    
    if (!words || words.length === 0) return [];

    // Count word frequencies with strict validation
    const wordCount = words.reduce((acc: Record<string, number>, word: string) => {
      const cleanWord = word.trim().toLowerCase();
      
      // Strict validation: must be valid Dutch word, not a stop word
      if (cleanWord && 
          cleanWord.length >= 4 && 
          /^[a-zëïöüá-ÿ]+$/.test(cleanWord) && 
          !stopWords.has(cleanWord)) {
        acc[cleanWord] = (acc[cleanWord] || 0) + 1;
      }
      return acc;
    }, {});

    console.log('Word count entries:', Object.keys(wordCount).length);

    // Convert to keyword objects and sort by frequency
    const keywords = Object.entries(wordCount)
      .filter(([word, count]) => {
        // Final validation before creating keyword objects
        return word && 
               typeof word === 'string' && 
               word.trim().length >= 4 && 
               count > 0 &&
               /^[a-zëïöüá-ÿ]+$/.test(word.trim());
      })
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 30) // Top 30 most frequent words
      .map(([word, count], index) => {
        const cleanWord = word.trim();
        return {
          text: cleanWord,
          size: Math.max(12, Math.min(32, (count as number) * 3)), // Dynamic font size
          count: count as number,
          color: `hsl(${210 + index * 12}, 70%, ${50 + ((count as number) * 5)}%)`, // Dynamic color
        };
      })
      .filter(item => {
        // Final safety check before rendering
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
        {/* Theme filter buttons */}
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

        {/* Word cloud display */}
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
              Gebaseerd op {positions.length} partijstandpunten
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
