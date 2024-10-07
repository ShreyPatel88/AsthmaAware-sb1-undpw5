import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Activity, Bell, BookOpen, Settings as SettingsIcon } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import HealthInsights from '@/components/HealthInsights';
import Notifications from '@/components/Notifications';
import Resources from '@/components/Resources';
import Settings from '@/components/Settings';
import { Toaster } from "@/components/ui/toaster";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow overflow-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="dashboard">
            <Dashboard />
          </TabsContent>
          <TabsContent value="health">
            <HealthInsights />
          </TabsContent>
          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>
          <TabsContent value="resources">
            <Resources />
          </TabsContent>
          <TabsContent value="settings">
            <Settings />
          </TabsContent>
          <TabsList className="fixed bottom-0 left-0 right-0 justify-around bg-background border-t border-border">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
              <Home className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="health" onClick={() => setActiveTab("health")}>
              <Activity className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="notifications" onClick={() => setActiveTab("notifications")}>
              <Bell className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="resources" onClick={() => setActiveTab("resources")}>
              <BookOpen className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
              <SettingsIcon className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </main>
      <Toaster />
    </div>
  );
};

export default App;