
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Position, Party } from "@/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PositionTableProps {
  positions: Position[];
  parties: Party[];
  selectedParties: string[];
}

export const PositionTable = ({ positions, parties, selectedParties }: PositionTableProps) => {
  const selectedPositions = positions.filter(position => 
    selectedParties.includes(position.partyId)
  );

  if (selectedParties.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center py-8">
            Selecteer een of meer partijen om hun standpunten te vergelijken.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Standpunten vergelijking</h3>
        <div className="grid gap-4">
          {selectedPositions.map((position) => {
            const party = parties.find(p => p.id === position.partyId);
            if (!party) return null;

            return (
              <Card key={position.id} className="transition-all duration-200 hover:shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-3 text-base">
                    <span 
                      className="inline-block w-4 h-4 rounded-full"
                      style={{ backgroundColor: party.color }}
                      aria-hidden="true"
                    />
                    {party.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-foreground leading-relaxed">
                    {position.summary}
                  </p>
                  <div className="flex items-start gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-auto p-0 font-normal text-muted-foreground hover:text-foreground"
                        >
                          Bekijk citaat →
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-sm">
                        <p className="text-sm italic">"{position.quote}"</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="h-auto p-0 mt-2 text-xs"
                          onClick={() => window.open(position.sourceUrl, '_blank')}
                        >
                          Lees verkiezingsprogramma
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </Button>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
};
