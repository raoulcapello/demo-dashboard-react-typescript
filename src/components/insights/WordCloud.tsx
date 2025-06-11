
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { fetchThemes, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { useState } from "react";

export const WordCloud = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('all');

  // Fetch themes and parties with error handling
  const { data: themes = [], isLoading: themesLoading, error: themesError } = useQuery({
    queryKey: ['themes'],
    queryFn: fetchThemes,
  });

  const { data: parties = [], isLoading: partiesLoading, error: partiesError } = useQuery({
    queryKey: ['parties'],
    queryFn: fetchParties,
  });

  // Fetch positions based on selected theme with error handling
  const { data: allPositions = [], isLoading: allPositionsLoading, error: allPositionsError } = useQuery({
    queryKey: ['all-positions-wordcloud'],
    queryFn: async () => {
      const allPositions = await Promise.all(
        themes.map(theme => fetchPositionsByTheme(theme.id))
      );
      return allPositions.flat();
    },
    enabled: themes.length > 0 && selectedTheme === 'all',
  });

  const { data: themePositions = [], isLoading: themePositionsLoading, error: themePositionsError } = useQuery({
    queryKey: ['theme-positions-wordcloud', selectedTheme],
    queryFn: () => fetchPositionsByTheme(selectedTheme),
    enabled: selectedTheme !== 'all',
  });

  // Use the correct positions based on selected theme
  const positions = selectedTheme === 'all' ? allPositions : themePositions;
  const isLoading = themesLoading || partiesLoading || allPositionsLoading || themePositionsLoading;
  const error = themesError || partiesError || allPositionsError || themePositionsError;

  /**
   * Simple color palette with guaranteed contrast
   */
  const getWordColor = (index: number) => {
    const colorPalette = [
      'hsl(220, 70%, 50%)', // Blue
      'hsl(160, 60%, 45%)', // Green
      'hsl(280, 65%, 55%)', // Purple
      'hsl(30, 80%, 50%)',  // Orange
      'hsl(350, 70%, 50%)', // Red
      'hsl(200, 65%, 45%)', // Teal
    ];
    
    return colorPalette[index % colorPalette.length];
  };

  /**
   * Extract keywords from position data with improved validation
   */
  const extractKeywords = () => {
    // Validate positions array
    if (!Array.isArray(positions) || positions.length === 0) return [];

    // Filter valid positions with proper content and improved validation
    const validPositions = positions.filter(pos => {
      if (!pos || typeof pos !== 'object') return false;
      
      const summary = pos.summary && typeof pos.summary === 'string' ? pos.summary.trim() : '';
      const quote = pos.quote && typeof pos.quote === 'string' ? pos.quote.trim() : '';
      
      return summary.length > 3 || quote.length > 3;
    });

    if (validPositions.length === 0) return [];

    // Extract and clean text from positions with better error handling
    const textParts = validPositions
      .map(pos => {
        const summary = pos.summary && typeof pos.summary === 'string' ? pos.summary.trim() : '';
        const quote = pos.quote && typeof pos.quote === 'string' ? pos.quote.trim() : '';
        
        return [summary, quote]
          .filter(text => text.length > 3)
          .map(text => {
            try {
              return text.replace(/[^\w\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/gi, ' ');
            } catch (e) {
              console.warn('Error processing text:', e);
              return '';
            }
          })
          .join(' ');
      })
      .filter(text => text.trim().length > 0);

    if (textParts.length === 0) return [];

    const combinedText = textParts.join(' ').toLowerCase();

    // Dutch stop words
    const stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'voor', 'in', 'op', 'met', 'door', 'naar', 'bij', 'te', 'aan', 'om',
      'uit', 'over', 'zijn', 'hebben', 'worden', 'moet', 'kunnen', 'meer', 'nederland', 'nederlanders',
      'mensen', 'alle', 'ook', 'dit', 'dat', 'we', 'onze', 'maar', 'als', 'niet', 'geen', 'wel', 'die',
      'zij', 'hun', 'haar', 'hem', 'hen', 'ons', 'jullie', 'mij', 'jij', 'jou', 'waar', 'wat', 'wie',
      'hoe', 'wanneer', 'waarom', 'omdat', 'sinds', 'tijdens', 'binnen', 'buiten', 'onder', 'boven'
    ]);

    // Extract words and count frequency with better error handling
    let wordMatches: string[] = [];
    try {
      const matches = combinedText.match(/\b[a-zëïöüáéíóúàèìòùâêîôûäëïöüÿç]{4,}\b/g);
      wordMatches = matches || [];
    } catch (e) {
      console.warn('Error matching words:', e);
      return [];
    }
    
    // Create word frequency map with explicit typing
    const wordCount: Record<string, number> = {};
    
    wordMatches.forEach(word => {
      try {
        const cleanWord = word.trim().toLowerCase();
        if (cleanWord.length >= 4 && !stopWords.has(cleanWord)) {
          wordCount[cleanWord] = (wordCount[cleanWord] || 0) + 1;
        }
      } catch (e) {
        console.warn('Error processing word:', word, e);
      }
    });

    // Create keyword objects with validation
    const keywords = Object.entries(wordCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 30)
      .map(([word, count], index) => ({
        text: word,
        size: Math.max(14, Math.min(36, count * 3 + 12)),
        count: count,
        color: getWordColor(index),
      }))
      .filter(keyword => keyword.text && keyword.size && keyword.count); // Additional validation

    return keywords;
  };

  // Show loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Veelgebruikte termen</CardTitle>
          <CardDescription>Laden van gegevens...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-muted-foreground">Gegevens worden geladen...</div>
        </CardContent>
      </Card>
    );
  }

  // Show error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Veelgebruikte termen</CardTitle>
          <CardDescription>Er is een fout opgetreden bij het laden van gegevens</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-[300px]">
          <div className="text-muted-foreground">Kon gegevens niet laden</div>
        </CardContent>
      </Card>
    );
  }

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
                  className="inline-block cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80"
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
