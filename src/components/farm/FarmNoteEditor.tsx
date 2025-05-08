
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar, Save, FileText, Image, Link, MapPin } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FarmNoteEditorProps {
  onSave?: (note: FarmNote) => void;
  defaultCategory?: string;
  initialNote?: FarmNote;
}

export interface FarmNote {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
  location?: string;
  images?: string[];
  tags?: string[];
}

const noteCategories = [
  { id: 'observation', label: 'Observation' },
  { id: 'task', label: 'Task' },
  { id: 'weather', label: 'Weather' },
  { id: 'harvest', label: 'Harvest' },
  { id: 'purchase', label: 'Purchase' },
  { id: 'other', label: 'Other' }
];

export const FarmNoteEditor: React.FC<FarmNoteEditorProps> = ({ 
  onSave,
  defaultCategory = 'observation',
  initialNote
}) => {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [content, setContent] = useState(initialNote?.content || '');
  const [category, setCategory] = useState(initialNote?.category || defaultCategory);
  const [location, setLocation] = useState(initialNote?.location || '');
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please enter a title for your note",
        variant: "destructive",
      });
      return;
    }
    
    setIsSaving(true);
    
    // Create new note object
    const note: FarmNote = {
      id: initialNote?.id || crypto.randomUUID(),
      title,
      content,
      category,
      location,
      createdAt: initialNote?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    
    // Simulate API delay
    setTimeout(() => {
      if (onSave) {
        onSave(note);
      }
      
      toast({
        title: "Note saved",
        description: "Your farm note has been saved successfully",
      });
      
      setIsSaving(false);
      
      // Clear form if it's a new note
      if (!initialNote) {
        setTitle('');
        setContent('');
      }
    }, 600);
  };
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          {initialNote ? 'Edit Note' : 'Create Farm Note'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3">
          <Tabs defaultValue={category} onValueChange={setCategory} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-2">
              {noteCategories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="grid gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
            />
            
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Add location (optional)"
                className="flex-1 text-sm px-2 py-1 border-b focus:outline-none focus:border-primary"
              />
              <span className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            
            <ScrollArea className="h-auto max-h-[400px]">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your farm note here..."
                className="min-h-[200px] resize-none"
                showCount
                maxCount={1000}
              />
            </ScrollArea>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-3">
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Image className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Link className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <>Saving<span className="animate-pulse">...</span></>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FarmNoteEditor;
