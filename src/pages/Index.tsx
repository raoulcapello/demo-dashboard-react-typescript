
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeCard } from "@/components/ThemeCard";
import { Header } from "@/components/Header";
import { fetchThemes } from "@/services/mockApi";
import { Theme } from "@/types";

const Index = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadThemes = async () => {
      try {
        const fetchedThemes = await fetchThemes();
        setThemes(fetchedThemes);
      } catch (error) {
        console.error('Failed to fetch themes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadThemes();
  }, []);

  const handleViewPositions = (slug: string) => {
    navigate(`/theme/${slug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-muted/40 animate-pulse rounded-lg border border-border/50" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-4">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-primary">Live Verkiezingsdata</span>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Vergelijk eenvoudig de standpunten van Nederlandse politieke partijen 
              op belangrijke thema's voor de verkiezingen.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {themes.map((theme, index) => (
              <ThemeCard
                key={theme.id}
                theme={theme}
                themeIndex={index}
                onViewPositions={handleViewPositions}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
