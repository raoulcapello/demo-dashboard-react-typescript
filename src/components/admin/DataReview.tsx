
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Edit } from "lucide-react";

interface DataEntry {
  id: string;
  party: string;
  theme: string;
  summary: string;
  sourceUrl: string;
  confidence: number;
  status: 'pending' | 'approved' | 'rejected';
}

const mockDataEntries: DataEntry[] = [
  {
    id: '1',
    party: 'VVD',
    theme: 'Woningmarkt',
    summary: 'Meer sociale woningbouw door versnelde procedures en minder regelgeving.',
    sourceUrl: 'https://vvd.nl/verkiezingsprogramma',
    confidence: 0.85,
    status: 'pending'
  },
  {
    id: '2',
    party: 'PvdA',
    theme: 'Klimaat',
    summary: 'Versnelling naar 100% duurzame energie en CO2-neutraal in 2035.',
    sourceUrl: 'https://pvda.nl/standpunten/klimaat',
    confidence: 0.92,
    status: 'pending'
  },
  {
    id: '3',
    party: 'D66',
    theme: 'Onderwijs',
    summary: 'Investering in kleinere klassen en hogere salarissen voor leraren.',
    sourceUrl: 'https://d66.nl/onderwijs',
    confidence: 0.78,
    status: 'approved'
  }
];

export const DataReview = () => {
  const [entries, setEntries] = useState(mockDataEntries);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, status } : entry
    ));
  };

  const startEdit = (id: string, currentSummary: string) => {
    setEditingId(id);
    setEditText(currentSummary);
  };

  const saveEdit = (id: string) => {
    setEntries(prev => prev.map(entry => 
      entry.id === id ? { ...entry, summary: editText } : entry
    ));
    setEditingId(null);
    setEditText('');
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600';
    if (confidence >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Ingested Political Positions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Party</TableHead>
              <TableHead>Theme</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.party}</TableCell>
                <TableCell>{entry.theme}</TableCell>
                <TableCell className="max-w-sm">
                  {editingId === entry.id ? (
                    <div className="space-y-2">
                      <Textarea 
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="min-h-20"
                      />
                      <div className="flex gap-1">
                        <Button size="sm" onClick={() => saveEdit(entry.id)}>
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm">{entry.summary}</div>
                  )}
                </TableCell>
                <TableCell>
                  <a 
                    href={entry.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View Source
                  </a>
                </TableCell>
                <TableCell>
                  <span className={`font-medium ${getConfidenceColor(entry.confidence)}`}>
                    {(entry.confidence * 100).toFixed(0)}%
                  </span>
                </TableCell>
                <TableCell>
                  {getStatusBadge(entry.status)}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {entry.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatus(entry.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateStatus(entry.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => startEdit(entry.id, entry.summary)}
                      disabled={editingId === entry.id}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
