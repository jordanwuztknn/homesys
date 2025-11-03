import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, Film, Music, Image as ImageIcon, Folder } from 'lucide-react';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';

interface MediaCenterProps {
  isOverview?: boolean;
}

export function MediaCenter({ isOverview = false }: MediaCenterProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentMedia, setCurrentMedia] = useState({
    title: 'Summer Vibes Playlist',
    artist: 'Various Artists',
    type: 'music',
  });

  const musicLibrary = [
    { id: 1, title: 'Summer Vibes Playlist', artist: 'Various Artists', duration: '2:45:30' },
    { id: 2, title: 'Focus Flow', artist: 'Lo-Fi Beats', duration: '1:30:15' },
    { id: 3, title: 'Workout Energy', artist: 'EDM Mix', duration: '1:15:45' },
    { id: 4, title: 'Jazz Classics', artist: 'Miles Davis', duration: '3:20:10' },
  ];

  const videoLibrary = [
    { id: 1, title: 'Family Vacation 2024', duration: '45:30', size: '2.3 GB' },
    { id: 2, title: 'Movie Night Collection', duration: '8:15:00', size: '12.5 GB' },
    { id: 3, title: 'Home Videos', duration: '1:30:20', size: '5.2 GB' },
  ];

  const photoAlbums = [
    { id: 1, name: 'Summer 2024', count: 156 },
    { id: 2, name: 'Family Events', count: 89 },
    { id: 3, name: 'Nature Photography', count: 234 },
    { id: 4, name: 'Travel', count: 412 },
  ];

  if (isOverview) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Film className="w-5 h-5 text-purple-400" />
            Media Center
          </CardTitle>
          <CardDescription className="text-slate-400">Music, Videos & Photos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-300">Now Playing</span>
              <Badge variant="outline" className={isPlaying ? 'text-green-400 border-green-400' : 'text-slate-400 border-slate-400'}>
                {isPlaying ? 'Playing' : 'Paused'}
              </Badge>
            </div>
            <div className="p-3 bg-slate-700/50 rounded-lg">
              <p className="text-white">{currentMedia.title}</p>
              <p className="text-slate-400 text-sm">{currentMedia.artist}</p>
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
          <Film className="w-5 h-5 text-purple-400" />
          Media Center
        </CardTitle>
        <CardDescription className="text-slate-400">Your complete media library</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="music" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-700/50">
            <TabsTrigger value="music">
              <Music className="w-4 h-4 mr-2" />
              Music
            </TabsTrigger>
            <TabsTrigger value="videos">
              <Film className="w-4 h-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="photos">
              <ImageIcon className="w-4 h-4 mr-2" />
              Photos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="music" className="space-y-4 mt-4">
            {/* Now Playing */}
            <div className="p-4 bg-slate-700/50 rounded-lg">
              <div className="mb-4">
                <p className="text-white">{currentMedia.title}</p>
                <p className="text-slate-400 text-sm">{currentMedia.artist}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <Slider value={[35]} max={100} className="cursor-pointer" />
                <div className="flex justify-between mt-1">
                  <span className="text-slate-400 text-sm">1:25</span>
                  <span className="text-slate-400 text-sm">4:02</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-4">
                <Button size="sm" variant="ghost">
                  <SkipBack className="w-5 h-5 text-white" />
                </Button>
                <Button size="lg" onClick={() => setIsPlaying(!isPlaying)} className="bg-blue-600">
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </Button>
                <Button size="sm" variant="ghost">
                  <SkipForward className="w-5 h-5 text-white" />
                </Button>
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <Slider 
                  value={[volume]} 
                  onValueChange={([val]) => setVolume(val)}
                  max={100} 
                  className="cursor-pointer"
                />
                <span className="text-slate-400 text-sm w-10">{volume}%</span>
              </div>
            </div>

            {/* Music Library */}
            <ScrollArea className="h-[300px]">
              <div className="space-y-2">
                {musicLibrary.map((track) => (
                  <div 
                    key={track.id}
                    className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors"
                    onClick={() => setCurrentMedia({ title: track.title, artist: track.artist, type: 'music' })}
                  >
                    <div className="flex items-center gap-3">
                      <Music className="w-4 h-4 text-purple-400" />
                      <div>
                        <p className="text-white text-sm">{track.title}</p>
                        <p className="text-slate-400 text-xs">{track.artist}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 text-sm">{track.duration}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="videos" className="mt-4">
            <ScrollArea className="h-[400px]">
              <div className="space-y-2">
                {videoLibrary.map((video) => (
                  <div key={video.id} className="p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-slate-900 rounded flex items-center justify-center">
                        <Film className="w-6 h-6 text-slate-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white">{video.title}</p>
                        <div className="flex gap-3 mt-1">
                          <span className="text-slate-400 text-sm">{video.duration}</span>
                          <span className="text-slate-400 text-sm">{video.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="photos" className="mt-4">
            <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-2 gap-3">
                {photoAlbums.map((album) => (
                  <div key={album.id} className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 cursor-pointer transition-colors">
                    <div className="aspect-square bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-600" />
                    </div>
                    <p className="text-white">{album.name}</p>
                    <p className="text-slate-400 text-sm">{album.count} photos</p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
