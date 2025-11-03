import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Tv, Volume2, Power, Maximize2, Youtube, Twitch, Video, Radio } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EntertainmentProps {
  isOverview?: boolean;
}

export function Entertainment({ isOverview = false }: EntertainmentProps) {
  const [tvPower, setTvPower] = useState(true);
  const [volume, setVolume] = useState(30);
  const [currentChannel, setCurrentChannel] = useState('Netflix');

  const streamingApps = [
    { id: 1, name: 'Netflix', icon: Video, color: 'bg-red-600' },
    { id: 2, name: 'YouTube', icon: Youtube, color: 'bg-red-500' },
    { id: 3, name: 'Twitch', icon: Twitch, color: 'bg-purple-600' },
    { id: 4, name: 'Spotify', icon: Radio, color: 'bg-green-600' },
  ];

  const channels = [
    { id: 1, name: 'HBO Max', number: 201 },
    { id: 2, name: 'Disney+', number: 202 },
    { id: 3, name: 'Prime Video', number: 203 },
    { id: 4, name: 'Apple TV+', number: 204 },
  ];

  if (isOverview) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Tv className="w-5 h-5 text-indigo-400" />
            Entertainment
          </CardTitle>
          <CardDescription className="text-slate-400">TV & Streaming Control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">TV Status</span>
              <Badge variant="outline" className={tvPower ? 'text-green-400 border-green-400' : 'text-slate-400 border-slate-400'}>
                {tvPower ? 'On' : 'Off'}
              </Badge>
            </div>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <p className="text-white">Now Watching</p>
              <p className="text-slate-400 text-sm">{currentChannel}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Tv className="w-5 h-5 text-indigo-400" />
          Entertainment System
        </CardTitle>
        <CardDescription className="text-slate-400">Smart TV & Streaming Control</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="remote" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-700/50">
            <TabsTrigger value="remote">Remote Control</TabsTrigger>
            <TabsTrigger value="apps">Apps & Channels</TabsTrigger>
          </TabsList>

          <TabsContent value="remote" className="space-y-6 mt-4">
            {/* TV Preview */}
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border-2 border-slate-700">
              {tvPower ? (
                <div className="text-center">
                  <Tv className="w-16 h-16 text-slate-600 mx-auto mb-2" />
                  <p className="text-white">{currentChannel}</p>
                  <p className="text-slate-400 text-sm">Now Playing</p>
                </div>
              ) : (
                <p className="text-slate-600">TV is Off</p>
              )}
            </div>

            {/* Power & Basic Controls */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                variant={tvPower ? 'default' : 'outline'}
                onClick={() => setTvPower(!tvPower)}
                className={`h-16 ${tvPower ? 'bg-green-600' : ''}`}
              >
                <Power className="w-5 h-5" />
              </Button>
              <Button variant="outline" disabled={!tvPower} className="h-16">
                <Maximize2 className="w-5 h-5" />
              </Button>
              <Button variant="outline" disabled={!tvPower} className="h-16">
                Input
              </Button>
            </div>

            {/* Volume Control */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white">Volume</span>
                <span className="text-slate-400">{volume}%</span>
              </div>
              <div className="flex items-center gap-3">
                <Volume2 className="w-5 h-5 text-slate-400" />
                <Slider
                  value={[volume]}
                  onValueChange={([val]) => setVolume(val)}
                  max={100}
                  disabled={!tvPower}
                  className="cursor-pointer"
                />
              </div>
            </div>

            {/* D-Pad */}
            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
              <div></div>
              <Button variant="outline" disabled={!tvPower}>↑</Button>
              <div></div>
              <Button variant="outline" disabled={!tvPower}>←</Button>
              <Button variant="default" disabled={!tvPower} className="bg-blue-600">OK</Button>
              <Button variant="outline" disabled={!tvPower}>→</Button>
              <div></div>
              <Button variant="outline" disabled={!tvPower}>↓</Button>
              <div></div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="sm" disabled={!tvPower}>Home</Button>
              <Button variant="outline" size="sm" disabled={!tvPower}>Back</Button>
              <Button variant="outline" size="sm" disabled={!tvPower}>Menu</Button>
              <Button variant="outline" size="sm" disabled={!tvPower}>Guide</Button>
            </div>
          </TabsContent>

          <TabsContent value="apps" className="space-y-4 mt-4">
            {/* Streaming Apps */}
            <div>
              <h3 className="text-white mb-3">Streaming Apps</h3>
              <div className="grid grid-cols-2 gap-3">
                {streamingApps.map((app) => {
                  const Icon = app.icon;
                  return (
                    <Button
                      key={app.id}
                      variant="outline"
                      className={`h-24 flex flex-col gap-2 ${currentChannel === app.name ? 'border-blue-500' : ''}`}
                      onClick={() => {
                        setCurrentChannel(app.name);
                        setTvPower(true);
                      }}
                    >
                      <div className={`w-12 h-12 ${app.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white">{app.name}</span>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Channel List */}
            <div>
              <h3 className="text-white mb-3">Premium Channels</h3>
              <div className="space-y-2">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                      currentChannel === channel.name
                        ? 'bg-blue-600'
                        : 'bg-slate-700/30 hover:bg-slate-700/50'
                    }`}
                    onClick={() => {
                      setCurrentChannel(channel.name);
                      setTvPower(true);
                    }}
                  >
                    <span className="text-white">{channel.name}</span>
                    <Badge variant="outline" className="text-slate-400 border-slate-500">
                      {channel.number}
                    </Badge>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
