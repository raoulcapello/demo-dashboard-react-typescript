
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { PartySelector } from "@/components/PartySelector";
import { PositionTable } from "@/components/PositionTable";
import { fetchThemeBySlug, fetchParties, fetchPositionsByTheme } from "@/services/mockApi";
import { Theme, Party, Position } from "@/types";
import { Button } from "@/components/ui/button";

const ThemeDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [theme, setTheme] = useState<Theme | null>(null);
  const [parties, setParties] = useState<Party[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedParties, setSelectedParties] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      if (!slug) return;
      
      try {
        const [fetchedTheme, fetchedParties] = await Promise.all([
          fetchThemeBySlug(slug),
          fetchParties()
        ]);

        if (fetchedTheme) {
          setTheme(fetchedTheme);
          const fetchedPositions = await fetchPositionsByTheme(fetchedTheme.id);
          setPositions(fetchedPositions);
        }

        setParties(fetchedParties);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [slug]);

  const handlePartyToggle = (partyId: string) => {
    setSelectedParties(prev =>
      prev.includes(partyId)
        ? prev.filter(id => id !== partyId)
        : [...prev, partyId]
    );
  };

  const handleSelectAll = () => {
    if (selectedParties.length === parties.length) {
      setSelectedParties([]);
    } else {
      setSelectedParties(parties.map(party => party.id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="h-8 bg-muted animate-pulse rounded" />
            <div className="h-32 bg-muted animate-pulse rounded" />
            <div className="h-64 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Thema niet gevonden</h2>
            <p className="text-muted-foreground">Het opgevraagde thema bestaat niet.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">{theme.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {theme.description}
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Selecteer partijen</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedParties.length === parties.length ? 'Deselecteer alles' : 'Selecteer alles'}
              </Button>
            </div>

            <PartySelector
              parties={parties}
              selectedParties={selectedParties}
              onPartyToggle={handlePartyToggle}
            />

            <PositionTable
              positions={positions}
              parties={parties}
              selectedParties={selectedParties}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThemeDetail;
