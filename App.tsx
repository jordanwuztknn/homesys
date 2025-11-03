import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { FileTransfer } from './components/FileTransfer';
import { MediaCenter } from './components/MediaCenter';
import { AlarmSystem } from './components/AlarmSystem';
import { SmartDevices } from './components/SmartDevices';
import { Entertainment } from './components/Entertainment';
import { Home, Upload, Film, Shield, Lightbulb, Tv } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Home className="w-8 h-8 text-blue-400" />
            <h1 className="text-white">Smart Home Control Center</h1>
          </div>
          <p className="text-slate-400">Manage all your smart devices, media, and security from one place</p>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="home" className="data-[state=active]:bg-blue-600">
              <Home className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="devices" className="data-[state=active]:bg-blue-600">
              <Lightbulb className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Devices</span>
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-blue-600">
              <Film className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Media</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-600">
              <Shield className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-blue-600">
              <Upload className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Files</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SmartDevices isOverview />
              <AlarmSystem isOverview />
              <MediaCenter isOverview />
              <Entertainment isOverview />
            </div>
          </TabsContent>

          <TabsContent value="devices" className="mt-6">
            <SmartDevices />
          </TabsContent>

          <TabsContent value="media" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MediaCenter />
              <Entertainment />
            </div>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <AlarmSystem />
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <FileTransfer />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
