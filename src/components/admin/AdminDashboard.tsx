
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameManagement from "./GameManagement";
import ScheduleResults from "./ScheduleResults";
import UserEngagement from "./UserEngagement";
import Statistics from "./Statistics";
import CustomizationPanel from "./CustomizationPanel";

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <span className="gold-text">Admin</span> Dashboard
        </h1>
      </div>
      
      <Tabs defaultValue="game-management" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-black/20 mb-8">
          <TabsTrigger 
            value="game-management" 
            className="data-[state=active]:bg-gold data-[state=active]:text-black"
          >
            Game Management
          </TabsTrigger>
          <TabsTrigger 
            value="schedule-results" 
            className="data-[state=active]:bg-gold data-[state=active]:text-black"
          >
            Schedule Results
          </TabsTrigger>
          <TabsTrigger 
            value="user-engagement" 
            className="data-[state=active]:bg-gold data-[state=active]:text-black"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="statistics" 
            className="data-[state=active]:bg-gold data-[state=active]:text-black"
          >
            Statistics
          </TabsTrigger>
          <TabsTrigger 
            value="customization" 
            className="data-[state=active]:bg-gold data-[state=active]:text-black"
          >
            Customization
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="game-management">
          <GameManagement />
        </TabsContent>
        
        <TabsContent value="schedule-results">
          <ScheduleResults />
        </TabsContent>
        
        <TabsContent value="user-engagement">
          <UserEngagement />
        </TabsContent>
        
        <TabsContent value="statistics">
          <Statistics />
        </TabsContent>
        
        <TabsContent value="customization">
          <CustomizationPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
