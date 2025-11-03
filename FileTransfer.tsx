import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Upload, Download, File, Folder, Trash2, Eye, Share2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface FileItem {
  id: number;
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  uploading?: boolean;
  progress?: number;
}

export function FileTransfer() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: 1, name: 'Documents', type: 'folder', modified: '2024-11-01' },
    { id: 2, name: 'Family Photos.zip', type: 'file', size: '2.3 GB', modified: '2024-10-28' },
    { id: 3, name: 'Music Collection', type: 'folder', modified: '2024-10-25' },
    { id: 4, name: 'Vacation Video.mp4', type: 'file', size: '1.5 GB', modified: '2024-10-20' },
    { id: 5, name: 'Tax Documents 2024.pdf', type: 'file', size: '3.2 MB', modified: '2024-10-15' },
    { id: 6, name: 'Work Presentations', type: 'folder', modified: '2024-10-10' },
  ]);

  const [uploadQueue, setUploadQueue] = useState<FileItem[]>([
    { id: 100, name: 'New Video.mp4', type: 'file', size: '850 MB', modified: 'Uploading...', uploading: true, progress: 67 },
  ]);

  const handleFileUpload = () => {
    const newFile: FileItem = {
      id: Date.now(),
      name: 'NewFile_' + Date.now() + '.pdf',
      type: 'file',
      size: '5.2 MB',
      modified: 'Uploading...',
      uploading: true,
      progress: 0,
    };
    setUploadQueue([...uploadQueue, newFile]);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadQueue(prev => 
        prev.map(f => f.id === newFile.id ? { ...f, progress } : f)
      );
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploadQueue(prev => prev.filter(f => f.id !== newFile.id));
          setFiles(prev => [...prev, { ...newFile, uploading: false, modified: new Date().toISOString().split('T')[0] }]);
        }, 500);
      }
    }, 300);
  };

  const deleteFile = (id: number) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-blue-400" />
            File Transfer Center
          </CardTitle>
          <CardDescription className="text-slate-400">Upload and manage your files across devices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
               onClick={handleFileUpload}>
            <Upload className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-white mb-1">Click to upload files</p>
            <p className="text-slate-400 text-sm">or drag and drop</p>
          </div>

          {/* Upload Queue */}
          {uploadQueue.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="text-white">Uploading</h3>
              {uploadQueue.map((file) => (
                <div key={file.id} className="p-3 bg-slate-700/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-blue-400" />
                      <span className="text-white text-sm">{file.name}</span>
                    </div>
                    <span className="text-slate-400 text-sm">{file.progress}%</span>
                  </div>
                  <Progress value={file.progress} className="h-1" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* File Browser */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <Folder className="w-5 h-5 text-yellow-400" />
                My Files
              </CardTitle>
              <CardDescription className="text-slate-400">Browse and manage your files</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {files.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors group">
                  <div className="flex items-center gap-3 flex-1">
                    {file.type === 'folder' ? (
                      <Folder className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    ) : (
                      <File className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-white truncate">{file.name}</p>
                      <div className="flex gap-3 text-slate-400 text-sm">
                        <span>{file.modified}</span>
                        {file.size && <span>{file.size}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Eye className="w-4 h-4 text-slate-400" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Download className="w-4 h-4 text-slate-400" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Share2 className="w-4 h-4 text-slate-400" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0"
                      onClick={() => deleteFile(file.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Storage Info */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Used Storage</span>
              <span className="text-white">45.2 GB of 100 GB</span>
            </div>
            <Progress value={45} className="h-2" />
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                <File className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-white text-sm">Documents</p>
                <p className="text-slate-400 text-xs">12.3 GB</p>
              </div>
              <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                <File className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-white text-sm">Media</p>
                <p className="text-slate-400 text-xs">28.5 GB</p>
              </div>
              <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                <File className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-white text-sm">Other</p>
                <p className="text-slate-400 text-xs">4.4 GB</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
