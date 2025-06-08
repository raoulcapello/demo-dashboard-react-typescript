
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Play, AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'failed';
  lastRun: string;
  logs: string[];
}

const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Program Scraper',
    status: 'idle',
    lastRun: '2024-06-08 14:30:00',
    logs: [
      '2024-06-08 14:30:00 - Successfully scraped VVD program',
      '2024-06-08 14:29:45 - Processing housing policy section',
      '2024-06-08 14:29:30 - Starting program analysis'
    ]
  },
  {
    id: '2',
    name: 'Media Monitor',
    status: 'running',
    lastRun: '2024-06-08 15:00:00',
    logs: [
      '2024-06-08 15:00:00 - Analyzing climate coverage in NOS',
      '2024-06-08 14:58:15 - Found 15 relevant articles',
      '2024-06-08 14:55:30 - Starting media scan'
    ]
  },
  {
    id: '3',
    name: 'Sentiment Classifier',
    status: 'failed',
    lastRun: '2024-06-08 13:15:00',
    logs: [
      '2024-06-08 13:15:00 - ERROR: API rate limit exceeded',
      '2024-06-08 13:14:45 - Processing sentiment for healthcare positions',
      '2024-06-08 13:14:30 - Starting sentiment analysis'
    ]
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'running':
      return <Clock className="h-4 w-4" />;
    case 'failed':
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <CheckCircle className="h-4 w-4" />;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'running':
      return 'default';
    case 'failed':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const AgentStatus = () => {
  const [agents, setAgents] = useState(mockAgents);

  const runAgent = (agentId: string) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'running' as const, lastRun: new Date().toLocaleString('sv-SE') }
        : agent
    ));

    // Simulate completion after 3 seconds
    setTimeout(() => {
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'idle' as const }
          : agent
      ));
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {agents.map((agent) => (
          <Card key={agent.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusVariant(agent.status)} className="flex items-center gap-1">
                    {getStatusIcon(agent.status)}
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last run: {agent.lastRun}
                </div>
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{agent.name} - Logs</DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-64 w-full">
                        <div className="space-y-2">
                          {agent.logs.map((log, index) => (
                            <div key={index} className="text-sm font-mono bg-muted p-2 rounded">
                              {log}
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                  <Button 
                    size="sm" 
                    onClick={() => runAgent(agent.id)}
                    disabled={agent.status === 'running'}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Run Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
