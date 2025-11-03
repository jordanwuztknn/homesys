import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Lightbulb, Thermometer, Wind, Droplets, Sun, Moon, Sunset, Sunrise } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface SmartDevicesProps {
  isOverview?: boolean;
}

export function SmartDevices({ isOverview = false }: SmartDevicesProps) {
  const [lights, setLights] = useState([
    { id: 1, name: 'Living Room', on: true, brightness: 75, color: 'warm' },
    { id: 2, name: 'Bedroom', on: false, brightness: 50, color: 'cool' },
    { id: 3, name: 'Kitchen', on: true, brightness: 100, color: 'daylight' },
    { id: 4, name: 'Bathroom', on: true, brightness: 60, color: 'warm' },
  ]);

  const [thermostat, setThermostat] = useState({
    currentTemp: 72,
    targetTemp: 70,
    mode: 'cool',
    on: true,
  });

  const toggleLight = (id: number) => {
    setLights(lights.map(light => 
      light.id === id ? { ...light, on: !light.on } : light
    ));
  };

  const updateBrightness = (id: number, brightness: number) => {
    setLights(lights.map(light => 
      light.id === id ? { ...light, brightness } : light
    ));
  };

  const colorSchemes = [
    { name: 'warm', icon: Sunset, color: 'bg-orange-500' },
    { name: 'cool', icon: Moon, color: 'bg-blue-500' },
    { name: 'daylight', icon: Sun, color: 'bg-yellow-400' },
    { name: 'sunrise', icon: Sunrise, color: 'bg-pink-500' },
  ];

  const updateLightColor = (id: number, color: string) => {
    setLights(lights.map(light => 
      light.id === id ? { ...light, color } : light
    ));
  };

  if (isOverview) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            Smart Devices
          </CardTitle>
          <CardDescription className="text-slate-400">Philips Hue & Nest Control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-slate-300">
                <p>{lights.filter(l => l.on).length} of {lights.length} lights on</p>
              </div>
              <Badge variant="outline" className="text-blue-400 border-blue-400">Active</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-red-400" />
                <span className="text-slate-300">Temperature</span>
              </div>
              <span className="text-white">{thermostat.currentTemp}°F</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="lights" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="lights">Philips Hue Lights</TabsTrigger>
          <TabsTrigger value="climate">Nest Climate</TabsTrigger>
        </TabsList>

        <TabsContent value="lights" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lights.map((light) => {
              const ColorIcon = colorSchemes.find(c => c.name === light.color)?.icon || Sun;
              return (
                <Card key={light.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Lightbulb className={`w-5 h-5 ${light.on ? 'text-yellow-400' : 'text-slate-500'}`} />
                        {light.name}
                      </CardTitle>
                      <Switch
                        checked={light.on}
                        onCheckedChange={() => toggleLight(light.id)}
                      />
                    </div>
                    <CardDescription className="text-slate-400">Philips Hue Smart Bulb</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-slate-300">Brightness</span>
                        <span className="text-white">{light.brightness}%</span>
                      </div>
                      <Slider
                        value={[light.brightness]}
                        onValueChange={([value]) => updateBrightness(light.id, value)}
                        max={100}
                        step={1}
                        disabled={!light.on}
                        className="cursor-pointer"
                      />
                    </div>
                    <div>
                      <p className="text-slate-300 mb-2">Color Scheme</p>
                      <div className="flex gap-2">
                        {colorSchemes.map((scheme) => {
                          const Icon = scheme.icon;
                          return (
                            <Button
                              key={scheme.name}
                              size="sm"
                              variant={light.color === scheme.name ? 'default' : 'outline'}
                              onClick={() => updateLightColor(light.id, scheme.name)}
                              disabled={!light.on}
                              className={light.color === scheme.name ? 'bg-blue-600' : ''}
                            >
                              <Icon className="w-4 h-4" />
                            </Button>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="climate" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-400" />
                  Nest Thermostat
                </CardTitle>
                <CardDescription className="text-slate-400">Climate Control</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">System Power</span>
                  <Switch
                    checked={thermostat.on}
                    onCheckedChange={(checked) => setThermostat({ ...thermostat, on: checked })}
                  />
                </div>
                
                <div className="text-center py-8">
                  <div className="text-slate-400 mb-2">Current Temperature</div>
                  <div className="text-white mb-6">{thermostat.currentTemp}°F</div>
                  
                  <div className="text-slate-400 mb-2">Target Temperature</div>
                  <div className="text-white mb-4">{thermostat.targetTemp}°F</div>
                  
                  <Slider
                    value={[thermostat.targetTemp]}
                    onValueChange={([value]) => setThermostat({ ...thermostat, targetTemp: value })}
                    min={60}
                    max={85}
                    step={1}
                    disabled={!thermostat.on}
                    className="cursor-pointer"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={thermostat.mode === 'cool' ? 'default' : 'outline'}
                    onClick={() => setThermostat({ ...thermostat, mode: 'cool' })}
                    disabled={!thermostat.on}
                    className={`flex-1 ${thermostat.mode === 'cool' ? 'bg-blue-600' : ''}`}
                  >
                    <Wind className="w-4 h-4 mr-2" />
                    Cool
                  </Button>
                  <Button
                    variant={thermostat.mode === 'heat' ? 'default' : 'outline'}
                    onClick={() => setThermostat({ ...thermostat, mode: 'heat' })}
                    disabled={!thermostat.on}
                    className={`flex-1 ${thermostat.mode === 'heat' ? 'bg-blue-600' : ''}`}
                  >
                    <Thermometer className="w-4 h-4 mr-2" />
                    Heat
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-blue-400" />
                  Air Quality
                </CardTitle>
                <CardDescription className="text-slate-400">Environmental Monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Humidity</span>
                  <span className="text-white">45%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">Air Quality Index</span>
                  <Badge className="bg-green-600">Good</Badge>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">CO₂ Level</span>
                  <span className="text-white">420 ppm</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
                  <span className="text-slate-300">VOC Level</span>
                  <Badge className="bg-green-600">Low</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
