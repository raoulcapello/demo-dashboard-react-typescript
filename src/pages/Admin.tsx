
import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AgentStatus } from "@/components/admin/AgentStatus";
import { DataReview } from "@/components/admin/DataReview";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const { toast } = useToast();
  
  // Mock authentication check - in real app this would be from auth context
  const isAdmin = true;

  // Show one-time info toast about demo nature
  useEffect(() => {
    const hasSeenAdminToast = localStorage.getItem('hasSeenAdminToast');
    
    if (!hasSeenAdminToast) {
      toast({
        title: "Demo Admin Panel",
        description: "This is a demonstration admin panel and is not behind authentication. In a real application, this would require proper admin credentials.",
        duration: 8000,
      });
      
      localStorage.setItem('hasSeenAdminToast', 'true');
    }
  }, [toast]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-orange-500" />
            <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded">
              ADMIN
            </span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Admin Control Panel
          </h1>
          <p className="text-muted-foreground">
            Monitor and manage party data ingestion
          </p>
        </div>
        
        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">LLM Agent Status</TabsTrigger>
            <TabsTrigger value="review">Data Review & Override</TabsTrigger>
            <TabsTrigger value="settings">Settings & Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="agents" className="mt-6">
            <AgentStatus />
          </TabsContent>
          
          <TabsContent value="review" className="mt-6">
            <DataReview />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <AdminSettings />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
