
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar, MapPin, Shovel, Plants, RefreshCw, CircleAlert, 
  ListChecks, TrendingUp, Clipboard, AlertCircle, Tractor,
  Trash2, PenSquare, Leaf, Egg, Cow
} from "lucide-react";

// Mock farm data
const farmData = {
  farms: [
    {
      id: 1,
      name: "Main Farm",
      location: "Kiambu County",
      size: 5,
      sizeUnit: "acres",
      fields: [
        {
          id: 101,
          name: "North Field",
          size: 2,
          sizeUnit: "acres",
          crops: [
            {
              id: 1001,
              name: "Maize",
              variety: "H614D",
              plantedDate: "2025-03-15",
              expectedHarvestDate: "2025-07-30",
              status: "growing",
              healthStatus: "good",
              notes: "Applied first fertilizer on April 10th",
              tasks: [
                { id: 10001, name: "Apply second fertilizer", dueDate: "2025-05-15", completed: false },
                { id: 10002, name: "Weeding", dueDate: "2025-05-20", completed: false },
              ]
            }
          ]
        },
        {
          id: 102,
          name: "South Field",
          size: 1.5,
          sizeUnit: "acres",
          crops: [
            {
              id: 1002,
              name: "Beans",
              variety: "KK8",
              plantedDate: "2025-04-05",
              expectedHarvestDate: "2025-06-20",
              status: "growing",
              healthStatus: "fair",
              notes: "Some pest damage observed. Applied pesticide on May 2nd",
              tasks: [
                { id: 10003, name: "Check pest situation", dueDate: "2025-05-12", completed: false },
              ]
            }
          ]
        },
        {
          id: 103,
          name: "Eastern Plot",
          size: 1,
          sizeUnit: "acres",
          crops: [
            {
              id: 1003,
              name: "Sweet Potatoes",
              variety: "Local Orange",
              plantedDate: "2025-02-10",
              expectedHarvestDate: "2025-06-10",
              status: "growing",
              healthStatus: "excellent",
              notes: "Good growth so far. May be ready for early harvest.",
              tasks: []
            }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "River Plot",
      location: "Kiambu County",
      size: 2,
      sizeUnit: "acres",
      fields: [
        {
          id: 201,
          name: "Riverside Field",
          size: 2,
          sizeUnit: "acres",
          crops: [
            {
              id: 2001,
              name: "Vegetables (Mixed)",
              variety: "Various",
              plantedDate: "2025-04-01",
              expectedHarvestDate: "Ongoing",
              status: "growing",
              healthStatus: "good",
              notes: "Rotating harvests. Irrigation system working well.",
              tasks: [
                { id: 20001, name: "Harvest kale", dueDate: "2025-05-10", completed: false },
              ]
            }
          ]
        }
      ]
    }
  ],
  livestock: [
    {
      id: 1,
      type: "Cattle",
      breed: "Friesian",
      count: 4,
      notes: "Dairy cows",
      health: "good",
      records: [
        { id: 1001, date: "2025-04-20", type: "Vaccination", details: "Annual vaccination for FMD" },
        { id: 1002, date: "2025-05-01", type: "Health Check", details: "Regular checkup - all healthy" },
      ],
      tasks: [
        { id: 10001, name: "Schedule vet visit", dueDate: "2025-06-01", completed: false },
      ]
    },
    {
      id: 2,
      type: "Poultry",
      breed: "Broilers",
      count: 50,
      notes: "Meat birds",
      health: "good",
      records: [
        { id: 2001, date: "2025-04-25", type: "Feed Change", details: "Switched to finisher feed" }
      ],
      tasks: [
        { id: 20001, name: "Market birds", dueDate: "2025-05-20", completed: false },
      ]
    },
    {
      id: 3,
      type: "Poultry",
      breed: "Layers",
      count: 30,
      notes: "Egg production",
      health: "fair",
      records: [
        { id: 3001, date: "2025-04-15", type: "Health Issue", details: "Treated for mites" }
      ],
      tasks: [
        { id: 30001, name: "Collect eggs", dueDate: "Daily", completed: false },
        { id: 30002, name: "Check for mites again", dueDate: "2025-05-15", completed: false },
      ]
    }
  ],
  equipment: [
    { 
      id: 1, 
      name: "Tractor", 
      model: "John Deere 5055E", 
      purchaseDate: "2023-06-10",
      lastMaintenanceDate: "2025-03-05",
      nextMaintenanceDate: "2025-06-05",
      status: "operational"
    },
    { 
      id: 2, 
      name: "Water Pump", 
      model: "Honda WB20XT", 
      purchaseDate: "2024-01-15",
      lastMaintenanceDate: "2025-04-10",
      nextMaintenanceDate: "2025-07-10",
      status: "operational"
    },
    { 
      id: 3, 
      name: "Sprayer", 
      model: "Knapsack 16L", 
      purchaseDate: "2024-02-20",
      lastMaintenanceDate: "2025-04-01",
      nextMaintenanceDate: "2025-06-01",
      status: "needs maintenance"
    }
  ]
};

const FarmManagement = () => {
  const [selectedFarm, setSelectedFarm] = useState(farmData.farms[0].id.toString());
  const [activeTab, setActiveTab] = useState("crops");
  
  // Get the currently selected farm
  const currentFarm = farmData.farms.find(farm => farm.id.toString() === selectedFarm);

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Farm Management</h1>
        <p className="text-muted-foreground">
          Track your crops, livestock, and equipment in one place
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={selectedFarm} onValueChange={setSelectedFarm}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Select farm" />
          </SelectTrigger>
          <SelectContent>
            {farmData.farms.map(farm => (
              <SelectItem key={farm.id} value={farm.id.toString()}>
                {farm.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button className="w-full md:w-auto">
          <Plants className="h-4 w-4 mr-2" />
          Add New Farm
        </Button>
      </div>

      {currentFarm && (
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{currentFarm.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" /> {currentFarm.location}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total Size</div>
                <div className="font-medium">{currentFarm.size} {currentFarm.sizeUnit}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-muted">
                {currentFarm.fields.length} Fields
              </Badge>
              <Badge variant="outline" className="bg-muted">
                {currentFarm.fields.reduce((acc, field) => acc + field.crops.length, 0)} Crops
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end pt-0">
            <Button size="sm" variant="ghost" className="text-farm-green-600 hover:text-farm-green-800">
              <PenSquare className="h-4 w-4 mr-2" /> Edit Farm
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="crops">
              <Leaf className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Crops</span>
            </TabsTrigger>
            <TabsTrigger value="livestock">
              <Cow className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Livestock</span>
            </TabsTrigger>
            <TabsTrigger value="equipment">
              <Tractor className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Equipment</span>
            </TabsTrigger>
            <TabsTrigger value="tasks">
              <ListChecks className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crops">
            <div className="space-y-4">
              {currentFarm && currentFarm.fields.map(field => (
                <Card key={field.id} className="overflow-hidden">
                  <CardHeader className="bg-muted pb-2">
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{field.name}</CardTitle>
                      <div className="text-sm text-muted-foreground">{field.size} {field.sizeUnit}</div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    {field.crops.map(crop => (
                      <div key={crop.id} className="p-4 border-b last:border-b-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-base">{crop.name} ({crop.variety})</h4>
                            <div className="text-sm text-muted-foreground">
                              Planted: {new Date(crop.plantedDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Badge 
                            variant={crop.healthStatus === "excellent" ? "default" : 
                                    crop.healthStatus === "good" ? "secondary" : 
                                    "outline"}
                            className={crop.healthStatus === "fair" ? "bg-amber-100 text-amber-800" : ""}
                          >
                            {crop.healthStatus.charAt(0).toUpperCase() + crop.healthStatus.slice(1)}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Harvest: {new Date(crop.expectedHarvestDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center">
                            <RefreshCw className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Status: {crop.status.charAt(0).toUpperCase() + crop.status.slice(1)}</span>
                          </div>
                        </div>
                        
                        <div className="text-sm mb-3">
                          <span className="font-medium">Notes:</span> {crop.notes}
                        </div>
                        
                        {crop.tasks.length > 0 && (
                          <div className="bg-muted p-3 rounded-md">
                            <div className="font-medium text-sm mb-2">Upcoming Tasks</div>
                            <ul className="space-y-2">
                              {crop.tasks.map(task => (
                                <li key={task.id} className="flex items-center justify-between">
                                  <div className="flex items-center">
                                    <ListChecks className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <span className="text-sm">{task.name}</span>
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    Due: {task.dueDate}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter className="bg-muted border-t flex justify-between py-2">
                    <Button size="sm" variant="outline">
                      <Shovel className="h-4 w-4 mr-2" />
                      Add Crop
                    </Button>
                    <Button size="sm" variant="ghost">
                      View Field Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <div className="text-center">
                <Button>
                  <Plants className="h-4 w-4 mr-2" />
                  Add New Field
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="livestock">
            <div className="space-y-4">
              {farmData.livestock.map(animal => (
                <Card key={animal.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{animal.type}</CardTitle>
                        <CardDescription>{animal.breed} - {animal.notes}</CardDescription>
                      </div>
                      <Badge 
                        variant={animal.health === "excellent" ? "default" : 
                                animal.health === "good" ? "secondary" : 
                                "outline"}
                        className={animal.health === "fair" ? "bg-amber-100 text-amber-800" : ""}
                      >
                        {animal.health.charAt(0).toUpperCase() + animal.health.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold flex items-center">
                        {animal.type === "Poultry" ? (
                          <Egg className="h-5 w-5 mr-2 text-muted-foreground" />
                        ) : (
                          <Cow className="h-5 w-5 mr-2 text-muted-foreground" />
                        )}
                        {animal.count}
                      </div>
                      <div>
                        <Button size="sm" variant="outline">Record Activity</Button>
                      </div>
                    </div>
                    
                    {animal.records.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Recent Records</h4>
                        <div className="bg-muted p-3 rounded-md">
                          {animal.records.map(record => (
                            <div key={record.id} className="mb-2 last:mb-0 text-sm">
                              <div className="flex justify-between">
                                <span className="font-medium">{record.type}</span>
                                <span className="text-muted-foreground">{record.date}</span>
                              </div>
                              <p className="text-muted-foreground">{record.details}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {animal.tasks.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium text-sm mb-2">Upcoming Tasks</h4>
                        <ul className="space-y-2">
                          {animal.tasks.map(task => (
                            <li key={task.id} className="flex items-center justify-between p-2 border rounded-md">
                              <div className="flex items-center">
                                <ListChecks className="h-4 w-4 mr-2 text-muted-foreground" />
                                <span className="text-sm">{task.name}</span>
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Due: {task.dueDate}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end border-t pt-4">
                    <Button size="sm" variant="ghost" className="text-farm-green-600 hover:text-farm-green-800">
                      <PenSquare className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              <div className="text-center">
                <Button>
                  <Cow className="h-4 w-4 mr-2" />
                  Add Livestock
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="equipment">
            <div className="space-y-4">
              {farmData.equipment.map(item => (
                <Card key={item.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{item.name}</CardTitle>
                        <CardDescription>{item.model}</CardDescription>
                      </div>
                      <Badge 
                        variant={item.status === "operational" ? "secondary" : "outline"}
                        className={item.status !== "operational" ? "bg-amber-100 text-amber-800" : ""}
                      >
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Purchase Date:</span><br/>
                        {new Date(item.purchaseDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Last Maintenance:</span><br/>
                        {new Date(item.lastMaintenanceDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Next Service:</span><br/>
                        {new Date(item.nextMaintenanceDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {item.status === "needs maintenance" && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-amber-800">Maintenance Required</p>
                          <p className="text-amber-700">Schedule service for this equipment as soon as possible.</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button size="sm" variant="outline">
                      <ListChecks className="h-4 w-4 mr-2" />
                      Log Maintenance
                    </Button>
                    <div className="space-x-2">
                      <Button size="sm" variant="ghost" className="text-farm-green-600 hover:text-farm-green-800">
                        <PenSquare className="h-4 w-4 mr-2" /> Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              <div className="text-center">
                <Button>
                  <Tractor className="h-4 w-4 mr-2" />
                  Add Equipment
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ListChecks className="h-5 w-5 mr-2" />
                  All Tasks
                </CardTitle>
                <CardDescription>Manage all farm tasks in one place</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2 flex items-center">
                      <CircleAlert className="h-4 w-4 mr-2 text-red-500" /> 
                      Overdue Tasks
                    </h3>
                    <Card className="bg-red-50">
                      <CardContent className="p-2">
                        <div className="text-center py-4 text-muted-foreground">
                          No overdue tasks
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Today's Tasks</h3>
                    <Card>
                      <CardContent className="p-2">
                        <div className="p-3 border-b flex justify-between items-center">
                          <div className="flex items-start">
                            <ListChecks className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Collect eggs</div>
                              <div className="text-sm text-muted-foreground">Poultry - Layers</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Complete</Button>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-start">
                            <ListChecks className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Check pest situation</div>
                              <div className="text-sm text-muted-foreground">South Field - Beans</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Complete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Upcoming Tasks</h3>
                    <Card>
                      <CardContent className="p-2">
                        <div className="p-3 border-b flex justify-between items-center">
                          <div className="flex items-start">
                            <ListChecks className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Apply second fertilizer</div>
                              <div className="text-sm text-muted-foreground">North Field - Maize</div>
                              <div className="text-xs text-muted-foreground">Due: 2025-05-15</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Complete</Button>
                        </div>
                        <div className="p-3 border-b flex justify-between items-center">
                          <div className="flex items-start">
                            <ListChecks className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Check for mites again</div>
                              <div className="text-sm text-muted-foreground">Poultry - Layers</div>
                              <div className="text-xs text-muted-foreground">Due: 2025-05-15</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Complete</Button>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                          <div className="flex items-start">
                            <ListChecks className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                            <div>
                              <div className="font-medium">Market birds</div>
                              <div className="text-sm text-muted-foreground">Poultry - Broilers</div>
                              <div className="text-xs text-muted-foreground">Due: 2025-05-20</div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline">Complete</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <ListChecks className="h-4 w-4 mr-2" />
                  Add New Task
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FarmManagement;
