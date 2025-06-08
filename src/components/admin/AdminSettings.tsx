
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Info } from "lucide-react";

interface Settings {
  crawlingFrequency: number;
  sourceDomains: string;
  maxSummaryLength: number;
  flagLowConfidence: boolean;
  confidenceThreshold: number;
}

const mockSettings: Settings = {
  crawlingFrequency: 24,
  sourceDomains: 'vvd.nl\npvda.nl\nd66.nl\ngroenlinks.nl\ncda.nl\npartijvoordedieren.nl',
  maxSummaryLength: 200,
  flagLowConfidence: true,
  confidenceThreshold: 0.7
};

const mockLogs = [
  { timestamp: '2024-06-08 15:30:00', level: 'INFO', message: 'Data ingestion completed successfully' },
  { timestamp: '2024-06-08 15:25:00', level: 'WARNING', message: 'Low confidence score detected for PVV climate position' },
  { timestamp: '2024-06-08 15:20:00', level: 'INFO', message: 'Started scheduled crawling of party websites' },
  { timestamp: '2024-06-08 15:15:00', level: 'ERROR', message: 'Failed to access groenlinks.nl - connection timeout' },
  { timestamp: '2024-06-08 15:10:00', level: 'INFO', message: 'Successfully processed 25 new political statements' }
];

export const AdminSettings = () => {
  const [settings, setSettings] = useState(mockSettings);

  const handleSave = () => {
    // In real app, this would save to backend
    console.log('Saving settings:', settings);
  };

  const getLogIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Configuration Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="frequency">Crawling Frequency (hours)</Label>
            <Input
              id="frequency"
              type="number"
              value={settings.crawlingFrequency}
              onChange={(e) => setSettings(prev => ({ ...prev, crawlingFrequency: Number(e.target.value) }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domains">Source Domains Whitelist</Label>
            <Textarea
              id="domains"
              value={settings.sourceDomains}
              onChange={(e) => setSettings(prev => ({ ...prev, sourceDomains: e.target.value }))}
              placeholder="Enter one domain per line"
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxLength">Max Summary Length (characters)</Label>
            <Input
              id="maxLength"
              type="number"
              value={settings.maxSummaryLength}
              onChange={(e) => setSettings(prev => ({ ...prev, maxSummaryLength: Number(e.target.value) }))}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="flagLow">Flag Low-Confidence Summaries</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically flag summaries below confidence threshold
                </p>
              </div>
              <Switch
                id="flagLow"
                checked={settings.flagLowConfidence}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, flagLowConfidence: checked }))}
              />
            </div>

            {settings.flagLowConfidence && (
              <div className="space-y-2">
                <Label htmlFor="threshold">Confidence Threshold</Label>
                <Input
                  id="threshold"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={settings.confidenceThreshold}
                  onChange={(e) => setSettings(prev => ({ ...prev, confidenceThreshold: Number(e.target.value) }))}
                />
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Logs & Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {mockLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                  {getLogIcon(log.level)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {log.timestamp}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                        log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {log.level}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{log.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
