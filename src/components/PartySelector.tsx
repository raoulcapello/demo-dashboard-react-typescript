
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Party } from "@/types";

interface PartySelectorProps {
  parties: Party[];
  selectedParties: string[];
  onPartyToggle: (partyId: string) => void;
}

export const PartySelector = ({ parties, selectedParties, onPartyToggle }: PartySelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Selecteer partijen</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {parties.map((party) => (
          <div key={party.id} className="flex items-center space-x-2">
            <Checkbox
              id={party.id}
              checked={selectedParties.includes(party.id)}
              onCheckedChange={() => onPartyToggle(party.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={party.id} 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              <span 
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: party.color }}
                aria-hidden="true"
              />
              {party.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
