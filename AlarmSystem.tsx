import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Shield, Camera, Lock, Unlock, AlertTriangle, Bell, DoorOpen, DoorClosed } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { Switch } from './ui/switch';

interface AlarmSystemProps {
  isOverview?: boolean;
}

export function AlarmSystem({ isOverview = false }: AlarmSystemProps) {
  const [systemArmed, setSystemArmed] = useState(false);
  const [mode, setMode] = useState<'disarmed' | 'home' | 'away'>('disarmed');
  
  const [cameras, setCameras] = useState([
    { id: 1, name: 'Front Door', status: 'online', recording: true },
    { id: 2, name: 'Backyard', status: 'online', recording: true },
    { id: 3, name: 'Garage', status: 'online', recording: false },
    { id: 4, name: 'Driveway', status: 'online', recording: true },
  ]);

  const [sensors, setSensors] = useState([
    { id: 1, name: 'Front Door', type: 'door', status: 'closed' },
    { id: 2, name: 'Back Door', type: 'door', status: 'closed' },
    { id: 3, name: 'Living Room Window', type: 'window', status: 'closed' },
    { id: 4, name: 'Bedroom Window', type: 'window', status: 'closed' },
  ]);

  const toggleRecording = (id: number) => {
    setCameras(cameras.map(cam => 
      cam.id === id ? { ...cam, recording: !cam.recording } : cam
    ));
  };

  const setAlarmMode = (newMode: 'disarmed' | 'home' | 'away') => {
    setMode(newMode);
    setSystemArmed(newMode !== 'disarmed');
  };

  if (isOverview) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-green-400" />
            Ring Security System
          </CardTitle>
          <CardDescription className="text-slate-400">Home Protection & Monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">System Status</span>
              <Badge 
                variant="outline" 
                className={systemArmed ? 'text-green-400 border-green-400' : 'text-slate-400 border-slate-400'}
              >
                {systemArmed ? 'Armed' : 'Disarmed'}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <span className="text-slate-300">Cameras Active</span>
              </div>
              <span className="text-white">{cameras.filter(c => c.recording).length}/{cameras.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Ring Alarm Control Panel
          </CardTitle>
          <CardDescription className="text-slate-400">Arm or disarm your security system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {systemArmed && (
              <Alert className="bg-green-900/20 border-green-600">
                <Shield className="h-4 w-4 text-green-400" />
                <AlertDescription className="text-green-300">
                  System armed in {mode} mode. All sensors are monitoring.
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-3 gap-4">
              <Button
                variant={mode === 'disarmed' ? 'default' : 'outline'}
                onClick={() => setAlarmMode('disarmed')}
                className={`h-24 flex flex-col gap-2 ${mode === 'disarmed' ? 'bg-slate-600' : ''}`}
              >
                <Unlock className="w-6 h-6" />
                <span>Disarmed</span>
              </Button>
              <Button
                variant={mode === 'home' ? 'default' : 'outline'}
                onClick={() => setAlarmMode('home')}
                className={`h-24 flex flex-col gap-2 ${mode === 'home' ? 'bg-blue-600' : ''}`}
              >
                <Lock className="w-6 h-6" />
                <span>Home</span>
              </Button>
              <Button
                variant={mode === 'away' ? 'default' : 'outline'}
                onClick={() => setAlarmMode('away')}
                className={`h-24 flex flex-col gap-2 ${mode === 'away' ? 'bg-red-600' : ''}`}
              >
                <Shield className="w-6 h-6" />
                <span>Away</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ring Cameras */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            Ring Cameras
          </CardTitle>
          <CardDescription className="text-slate-400">Monitor your property in real-time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cameras.map((camera) => (
              <div key={camera.id} className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Camera className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{camera.name}</span>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-400">
                    {camera.status}
                  </Badge>
                </div>
                
                <div className="aspect-video bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-slate-600" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Recording</span>
                  <Switch
                    checked={camera.recording}
                    onCheckedChange={() => toggleRecording(camera.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sensors */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-yellow-400" />
            Door & Window Sensors
          </CardTitle>
          <CardDescription className="text-slate-400">All entry points monitored</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sensors.map((sensor) => (
              <div key={sensor.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3">
                  {sensor.type === 'door' ? (
                    sensor.status === 'closed' ? 
                      <DoorClosed className="w-5 h-5 text-green-400" /> : 
                      <DoorOpen className="w-5 h-5 text-red-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-green-400" />
                  )}
                  <div>
                    <p className="text-white">{sensor.name}</p>
                    <p className="text-slate-400 text-sm capitalize">{sensor.type}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className={sensor.status === 'closed' ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'}
                >
                  {sensor.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
