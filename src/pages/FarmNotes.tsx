
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Search, Plus, FileText, Filter, MapPin, Clock, Tag, Trash2, PenSquare } from "lucide-react";
import FarmNoteEditor, { FarmNote } from '@/components/farm/FarmNoteEditor';

// Mock data for farm notes
const mockNotes: FarmNote[] = [
  {
    id: '1',
    title: 'Maize growth observations',
    content: 'The maize in the North field is showing excellent growth after the recent rainfall. Leaves are a healthy dark green color with no visible pest damage. Should be ready for fertilizer application in 7-10 days.',
    category: 'observation',
    createdAt: new Date('2025-05-01'),
    updatedAt: new Date('2025-05-01'),
    location: 'North Field',
    tags: ['maize', 'growth', 'rainfall']
  },
  {
    id: '2',
    title: 'Dairy cow health check',
    content: 'All four dairy cows received their scheduled health check today. The veterinarian confirmed they are in good health. Milk production has been consistent with an average of 15 liters per cow per day.',
    category: 'observation',
    createdAt: new Date('2025-05-03'),
    updatedAt: new Date('2025-05-03'),
    location: 'Main Farm - Cattle Shed',
    tags: ['dairy', 'health', 'veterinarian']
  },
  {
    id: '3',
    title: 'Purchase fertilizer next week',
    content: 'Need to purchase 5 bags of NPK fertilizer for the maize crop. Compare prices at Kilimo Shop and Farmers Co-op before buying.',
    category: 'task',
    createdAt: new Date('2025-05-05'),
    updatedAt: new Date('2025-05-05'),
    tags: ['purchase', 'fertilizer', 'maize']
  },
  {
    id: '4',
    title: 'Heavy rainfall warning',
    content: 'Weather forecast indicates heavy rainfall expected over the next 3 days. Need to ensure proper drainage in all fields and secure equipment.',
    category: 'weather',
    createdAt: new Date('2025-05-06'),
    updatedAt: new Date('2025-05-06'),
    tags: ['weather', 'rainfall', 'preparation']
  },
  {
    id: '5',
    title: 'Tomato harvest complete',
    content: 'Completed the harvest of tomatoes from the greenhouse today. Total yield: 120kg. Quality is excellent with minimal losses. 100kg sent to market, 20kg kept for home consumption and to give to neighbors.',
    category: 'harvest',
    createdAt: new Date('2025-05-07'),
    updatedAt: new Date('2025-05-07'),
    location: 'Greenhouse',
    tags: ['tomato', 'harvest', 'yield']
  }
];

const FarmNotes = () => {
  const [notes, setNotes] = useState<FarmNote[]>(mockNotes);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedNote, setSelectedNote] = useState<FarmNote | null>(null);
  
  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.tags && note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
      
    const matchesCategory = activeCategory === 'all' || note.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleSaveNote = (note: FarmNote) => {
    if (selectedNote) {
      // Update existing note
      setNotes(notes.map(n => n.id === note.id ? note : n));
      setSelectedNote(null);
    } else {
      // Add new note
      setNotes([note, ...notes]);
    }
    setIsCreating(false);
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  const handleEditNote = (note: FarmNote) => {
    setSelectedNote(note);
    setIsCreating(true);
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'observation': return 'bg-blue-100 text-blue-800';
      case 'task': return 'bg-amber-100 text-amber-800';
      case 'weather': return 'bg-purple-100 text-purple-800';
      case 'harvest': return 'bg-green-100 text-green-800';
      case 'purchase': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Farm Notes</h1>
        <p className="text-muted-foreground">
          Document observations, tasks, and insights from your farm
        </p>
      </div>
      
      {isCreating ? (
        <div className="mb-6">
          <FarmNoteEditor 
            onSave={handleSaveNote} 
            initialNote={selectedNote || undefined}
          />
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => {
              setIsCreating(false);
              setSelectedNote(null);
            }}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search notes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="mb-4 w-full max-w-full overflow-x-auto flex flex-nowrap">
              <TabsTrigger value="all">All Notes</TabsTrigger>
              <TabsTrigger value="observation">Observations</TabsTrigger>
              <TabsTrigger value="task">Tasks</TabsTrigger>
              <TabsTrigger value="weather">Weather</TabsTrigger>
              <TabsTrigger value="harvest">Harvests</TabsTrigger>
              <TabsTrigger value="purchase">Purchases</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              {filteredNotes.length === 0 ? (
                <Card className="border-dashed border-2">
                  <CardContent className="pt-10 pb-10 text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
                    <p className="text-lg font-medium mb-2">No notes found</p>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm ? 'Try a different search term or category filter' : 'Create your first farm note to start tracking your observations'}
                    </p>
                    <Button onClick={() => setIsCreating(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Note
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {filteredNotes.map(note => (
                    <Card key={note.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <div>
                            <CardTitle>{note.title}</CardTitle>
                            <CardDescription className="flex items-center mt-1">
                              {note.location && (
                                <>
                                  <MapPin className="h-3 w-3 mr-1" /> 
                                  <span className="mr-2">{note.location}</span>
                                </>
                              )}
                              <Clock className="h-3 w-3 mr-1" /> 
                              {note.createdAt.toLocaleDateString()}
                            </CardDescription>
                          </div>
                          <Badge className={getCategoryColor(note.category)}>
                            {note.category.charAt(0).toUpperCase() + note.category.slice(1)}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm whitespace-pre-wrap">{note.content}</div>
                        
                        {note.tags && note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-4">
                            <Tag className="h-3 w-3 mr-1 text-muted-foreground" />
                            {note.tags.map(tag => (
                              <Badge variant="outline" key={tag} className="text-xs bg-muted">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end pt-2 border-t">
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditNote(note)}
                          >
                            <PenSquare className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteNote(note.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default FarmNotes;
