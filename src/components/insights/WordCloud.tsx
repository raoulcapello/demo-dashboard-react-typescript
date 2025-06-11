
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

  // Fetch positions based on selected theme using separate queries
  const { data: allPositions = [] } = useQuery({
    queryKey: ['all-positions-wordcloud'],
    queryFn: async () => {
      console.log('Fetching all positions for word cloud');
      const allPositions = await Promise.all(
        themes.map(theme => fetchPositionsByTheme(theme.id))
      );
      const flatPositions = allPositions.flat();
      console.log('All positions fetched:', flatPositions.length);
      return flatPositions;
    },
    enabled: themes.length > 0 && selectedTheme === 'all',
  });

  const { data: themePositions = [] } = useQuery({
    queryKey: ['theme-positions-wordcloud', selectedTheme],
    queryFn: async () => {
      console.log('Fetching positions for theme:', selectedTheme);
      const themePositions = await fetchPositionsByTheme(selectedTheme);
      console.log(`Positions for theme ${selectedTheme}:`, themePositions.length);
      return themePositions;
    },
    enabled: selectedTheme !== 'all',
  });

  // Use the correct positions based on selected theme
  const positions = selectedTheme === 'all' ? allPositions : themePositions;

  /**
   * Predefined color palette with guaranteed contrast
   * Uses theme-aware colors that work well against card backgrounds
   */
  const getWordColor = (index: number, count: number) => {
    const colorPalette = [
      'hsl(220, 70%, 50%)', // Blue
      'hsl(160, 60%, 45%)', // Green
      'hsl(280, 65%, 55%)', // Purple
      'hsl(30, 80%, 50%)',  // Orange
      'hsl(350, 70%, 50%)', // Red
      'hsl(200, 65%, 45%)', // Teal
      'hsl(260, 70%, 55%)', // Violet
      'hsl(40, 75%, 50%)',  // Yellow-orange
      'hsl(320, 65%, 50%)', // Magenta
      'hsl(180, 60%, 45%)', // Cyan
      'hsl(120, 60%, 40%)', // Forest green
      'hsl(240, 70%, 55%)', // Indigo
    ];
    
    // Cycle through the palette
    const baseColor = colorPalette[index % colorPalette.length];
    
    // Adjust saturation and lightness based on word frequency for variation
    const saturationAdjust = Math.min(10, count * 2);
    const lightnessAdjust = Math.min(5, count);
    
    // Parse HSL values and apply adjustments
    const hslMatch = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (hslMatch) {
      const [, h, s, l] = hslMatch.map(Number);
      const adjustedS = Math.min(100, s + saturationAdjust);
      const adjustedL = Math.max(35, Math.min(65, l + lightnessAdjust)); // Keep lightness in safe range
      return `hsl(${h}, ${adjustedS}%, ${adjustedL}%)`;
    }
    
    return baseColor; // Fallback to original color
  };

  /**
   * Enhanced keyword extraction with comprehensive validation
   * Returns array of validated keyword objects with text, size, count, and color
   */
  const extractKeywords = () => {
    console.log('Processing positions:', positions.length);
    console.log('Selected theme:', selectedTheme);
    
    // Enhanced validation: filter out positions with empty or invalid content
    const validPositions = positions.filter(pos => {
      if (!pos || typeof pos !== 'object') return false;
      
      const hasValidSummary = pos.summary && 
                             typeof pos.summary === 'string' && 
                             pos.summary.trim().length > 3;
      const hasValidQuote = pos.quote && 
                           typeof pos.quote === 'string' && 
                           pos.quote.trim().length > 3;
      
      return hasValidSummary || hasValidQuote;
    });

    console.log('Valid positions count:', validPositions.length);

    if (validPositions.length === 0) {
      console.log('No valid positions found');
      return [];
    }

    // Enhanced text processing with better cleaning
    const textParts = validPositions.map(pos => {
      const summary = pos.summary ? pos.summary.trim() : '';
      const quote = pos.quote ? pos.quote.trim() : '';
      
      // Clean and validate text parts
      const cleanParts = [summary, quote]
        .filter(text => text && typeof text === 'string' && text.length > 3)
        .map(text => text.replace(/[^\w\s\-àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/gi, ' '))
        .filter(text => text.trim().length > 0);
      
      return cleanParts.join(' ');
    }).filter(text => text && text.trim().length > 0);

    if (textParts.length === 0) {
      console.log('No valid text parts found');
      return [];
    }

    const combinedText = textParts.join(' ').toLowerCase();
    console.log('Total text length:', combinedText.length);
    
    // Enhanced Dutch stop words list
    const stopWords = new Set([
      'de', 'het', 'een', 'en', 'van', 'voor', 'in', 'op', 'met', 'door', 'naar', 'bij', 'te', 'aan', 'om',
      'uit', 'over', 'zijn', 'hebben', 'worden', 'moet', 'kunnen', 'meer', 'nederland', 'nederlanders',
      'mensen', 'alle', 'ook', 'dit', 'dat', 'we', 'onze', 'maar', 'als', 'niet', 'geen', 'wel', 'die',
      'zij', 'hun', 'haar', 'hem', 'hen', 'ons', 'jullie', 'mij', 'jij', 'jou', 'waar', 'wat', 'wie',
      'hoe', 'wanneer', 'waarom', 'omdat', 'sinds', 'tijdens', 'binnen', 'buiten', 'onder', 'boven'
    ]);

    // Enhanced word extraction with stricter validation
    const words = combinedText.match(/\b[a-zëïöüáéíóúàèìòùâêîôûäëïöüÿç]{4,}\b/g);
    console.log('Extracted words count:', words ? words.length : 0);
    
    if (!words || words.length === 0) {
      console.log('No words extracted from text');
      return [];
    }

    // Enhanced word counting with comprehensive validation
    const wordCount = words.reduce((acc: Record<string, number>, word: string) => {
      if (!word || typeof word !== 'string') return acc;
      
      const cleanWord = word.trim().toLowerCase();
      
      // Comprehensive validation for Dutch words
      if (cleanWord && 
          cleanWord.length >= 4 && 
          cleanWord.length <= 20 && // Reasonable max length
          /^[a-zëïöüáéíóúàèìòùâêîôûäëïöüÿç]+$/.test(cleanWord) && 
          !stopWords.has(cleanWord) &&
          !cleanWord.match(/^\d+$/) && // No pure numbers
          cleanWord !== cleanWord.charAt(0).repeat(cleanWord.length)) { // No repeated characters
        acc[cleanWord] = (acc[cleanWord] || 0) + 1;
      }
      return acc;
    }, {});

    console.log('Word count entries:', Object.keys(wordCount).length);

    if (Object.keys(wordCount).length === 0) {
      console.log('No valid words after filtering');
      return [];
    }

    // Enhanced keyword object creation with improved color assignment
    const keywords = Object.entries(wordCount)
      .filter(([word, count]) => {
        // Final validation before creating keyword objects
        return word && 
               typeof word === 'string' && 
               word.trim().length >= 4 && 
               count && 
               typeof count === 'number' &&
               count > 0 &&
               /^[a-zëïöüáéíóúàèìòùâêîôûäëïöüÿç]+$/.test(word.trim());
      })
      .sort(([,a], [,b]) => (b as number) - (a as number))
      .slice(0, 30) // Top 30 most frequent words
      .map(([word, count], index) => {
        const cleanWord = word.trim();
        const wordCount = count as number;
        
        // Ensure we create valid keyword objects with contrasting colors
        return {
          text: cleanWord,
          size: Math.max(14, Math.min(36, wordCount * 3 + 12)), // Enhanced size calculation
          count: wordCount,
          color: getWordColor(index, wordCount), // Use the new color function
        };
      })
      .filter(item => {
        // Final safety check before returning
        return item && 
               item.text && 
               typeof item.text === 'string' && 
               item.text.trim().length >= 4 &&
               item.size && 
               item.count &&
               item.color &&
               /^[a-zëïöüáéíóúàèìòùâêîôûäëïöüÿç]+$/.test(item.text.trim());
      });

    console.log('Final keywords count:', keywords.length);
    console.log('Final keywords:', keywords.map(k => k.text));

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

        {/* Enhanced word cloud display with contrasting colors */}
        {keywords.length > 0 ? (
          <>
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 min-h-[200px] bg-gradient-to-br from-background to-secondary/20 rounded-lg">
              {keywords
                .filter(word => word && word.text && word.text.trim().length >= 4)
                .map((word, index) => {
                  // Additional safety check during rendering
                  if (!word || !word.text || typeof word.text !== 'string' || word.text.trim().length < 4) {
                    return null;
                  }
                  
                  return (
                    <span
                      key={`${word.text}-${index}-${word.count}`}
                      className="inline-block cursor-pointer transition-all duration-200 hover:scale-110 hover:opacity-80"
                      style={{
                        fontSize: `${word.size || 16}px`,
                        color: word.color,
                        fontWeight: Math.floor((word.size || 16) / 4) * 100 + 300,
                      }}
                      title={`"${word.text}" - ${word.count} keer gebruikt`}
                    >
                      {word.text}
                    </span>
                  );
                })
                .filter(Boolean) // Remove any null elements
              }
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
