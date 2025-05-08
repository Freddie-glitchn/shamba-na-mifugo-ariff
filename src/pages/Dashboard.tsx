
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Leaf, Users, MessageCircle, LineChart, ShoppingCart, PlusCircle, ArrowRight } from 'lucide-react';

// Mock user data
const user = {
  name: "John Kamau",
  farms: [
    {
      id: 1,
      name: "Main Farm",
      location: "Kiambu County",
      size: "5 acres",
      crops: [
        { id: 1, name: "Maize", area: "2 acres", plantDate: "2025-03-15", harvestDate: "2025-08-30", status: "growing", progress: 40 },
        { id: 2, name: "Beans", area: "1 acre", plantDate: "2025-04-01", harvestDate: "2025-06-15", status: "growing", progress: 65 }
      ],
      livestock: [
        { id: 1, type: "Dairy Cows", count: 5, status: "healthy" },
        { id: 2, type: "Goats", count: 8, status: "healthy" },
        { id: 3, type: "Chickens", count: 25, status: "healthy" }
      ]
    },
    {
      id: 2,
      name: "Secondary Plot",
      location: "Kiambu County",
      size: "1.5 acres",
      crops: [
        { id: 3, name: "Kale", area: "0.5 acres", plantDate: "2025-04-10", harvestDate: "2025-05-25", status: "growing", progress: 75 },
        { id: 4, name: "Onions", area: "0.5 acres", plantDate: "2025-03-20", harvestDate: "2025-07-10", status: "growing", progress: 50 }
      ],
      livestock: []
    }
  ]
};

// Mock inventory data
const inventory = [
  { id: 1, name: "Maize Seeds (Hybrid)", quantity: 15, unit: "kg", status: "ok" },
  { id: 2, name: "NPK Fertilizer", quantity: 2, unit: "bags", status: "low" },
  { id: 3, name: "Pesticide", quantity: 5, unit: "liters", status: "ok" },
  { id: 4, name: "Animal Feed", quantity: 3, unit: "bags", status: "low" },
  { id: 5, name: "Fuel", quantity: 20, unit: "liters", status: "ok" }
];

// Mock upcoming events
const events = [
  { id: 1, title: "Fertilizer Application - Maize", date: "2025-05-10", farm: "Main Farm" },
  { id: 2, title: "Vaccination - Cattle", date: "2025-05-15", farm: "Main Farm" },
  { id: 3, title: "Harvest - Kale", date: "2025-05-25", farm: "Secondary Plot" }
];

// Mock sales data
const salesTransactions = [
  { id: 1, item: "Milk", quantity: 120, unit: "liters", amount: 7200, date: "2025-05-07", status: "completed" },
  { id: 2, item: "Eggs", quantity: 30, unit: "trays", amount: 9000, date: "2025-05-05", status: "completed" },
  { id: 3, item: "Kale", quantity: 50, unit: "bundles", amount: 2500, date: "2025-05-02", status: "completed" }
];

const Dashboard = () => {
  const [selectedFarm, setSelectedFarm] = useState(user.farms[0]);

  // Calculate total stats
  const totalCrops = user.farms.reduce((total, farm) => total + farm.crops.length, 0);
  const totalLivestock = user.farms.reduce((total, farm) => total + farm.livestock.reduce((t, l) => t + l.count, 0), 0);
  const totalFarmArea = user.farms.reduce((total, farm) => total + parseFloat(farm.size.split(' ')[0]), 0);
  
  // Calculate sales metrics
  const totalSales = salesTransactions.reduce((total, sale) => total + sale.amount, 0);
  
  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Farm Dashboard</h1>
        <p className="text-muted-foreground">
          Track and manage your farm activities, inventory, and sales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <Leaf className="h-8 w-8 text-farm-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Total Crops</p>
            <h3 className="text-2xl font-bold">{totalCrops}</h3>
            <p className="text-xs text-muted-foreground mt-1">Across all farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <Users className="h-8 w-8 text-farm-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Total Livestock</p>
            <h3 className="text-2xl font-bold">{totalLivestock}</h3>
            <p className="text-xs text-muted-foreground mt-1">Heads across all farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <LineChart className="h-8 w-8 text-farm-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Total Farm Area</p>
            <h3 className="text-2xl font-bold">{totalFarmArea} acres</h3>
            <p className="text-xs text-muted-foreground mt-1">Combined land area</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center p-6">
            <ShoppingCart className="h-8 w-8 text-farm-green-600 mb-2" />
            <p className="text-sm text-muted-foreground">Recent Sales</p>
            <h3 className="text-2xl font-bold">KES {totalSales.toLocaleString()}</h3>
            <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Farm Management</CardTitle>
              <Select
                value={selectedFarm.id.toString()}
                onValueChange={(value) => setSelectedFarm(user.farms.find(f => f.id.toString() === value) || user.farms[0])}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select farm" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {user.farms.map(farm => (
                      <SelectItem key={farm.id} value={farm.id.toString()}>
                        {farm.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>
              {selectedFarm.location} | {selectedFarm.size}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="crops">
              <TabsList className="mb-4">
                <TabsTrigger value="crops">Crops</TabsTrigger>
                <TabsTrigger value="livestock">Livestock</TabsTrigger>
              </TabsList>
              
              <TabsContent value="crops">
                {selectedFarm.crops.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFarm.crops.map(crop => (
                      <div key={crop.id} className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{crop.name}</h4>
                            <p className="text-sm text-muted-foreground">{crop.area}</p>
                          </div>
                          <Badge variant={crop.status === "ready" ? "default" : "outline"}>
                            {crop.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{crop.progress}%</span>
                          </div>
                          <Progress value={crop.progress} className="h-2" />
                        </div>
                        
                        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                          <div>Planted: {new Date(crop.plantDate).toLocaleDateString()}</div>
                          <div>Expected harvest: {new Date(crop.harvestDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add New Crop
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">No crops recorded for this farm yet.</p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add First Crop
                    </Button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="livestock">
                {selectedFarm.livestock.length > 0 ? (
                  <div className="space-y-4">
                    {selectedFarm.livestock.map(animal => (
                      <div key={animal.id} className="bg-muted/50 p-4 rounded-lg flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{animal.type}</h4>
                          <p className="text-sm text-muted-foreground">Count: {animal.count}</p>
                        </div>
                        <Badge variant={animal.status === "healthy" ? "default" : "destructive"}>
                          {animal.status}
                        </Badge>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Livestock
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground mb-4">No livestock recorded for this farm yet.</p>
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Livestock
                    </Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map(event => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      <Calendar className="h-5 w-5 text-farm-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</div>
                      <div className="text-xs text-muted-foreground">{event.farm}</div>
                    </div>
                  </div>
                ))}
                
                <Button variant="ghost" className="w-full text-farm-green-600">
                  View All Tasks <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-muted-foreground mb-4">No upcoming tasks.</p>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" /> Schedule Task
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Inventory Status</CardTitle>
            <CardDescription>Farm inputs and supplies</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inventory.map(item => (
                <div key={item.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  <Badge variant={item.status === "ok" ? "outline" : "destructive"}>
                    {item.status === "low" ? "Low Stock" : "In Stock"}
                  </Badge>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Inventory Item
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesTransactions.map(sale => (
                <div key={sale.id} className="flex justify-between items-center bg-muted/50 p-3 rounded-md">
                  <div>
                    <h4 className="font-medium">{sale.item}</h4>
                    <p className="text-sm text-muted-foreground">
                      {sale.quantity} {sale.unit} | KES {sale.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(sale.date).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Completed
                  </Badge>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Record New Sale
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="flex flex-col h-24 gap-2">
                <PlusCircle className="h-6 w-6" />
                <span>Add Crop</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 gap-2">
                <PlusCircle className="h-6 w-6" />
                <span>Add Livestock</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 gap-2">
                <MessageCircle className="h-6 w-6" />
                <span>Contact Expert</span>
              </Button>
              <Button variant="outline" className="flex flex-col h-24 gap-2">
                <ShoppingCart className="h-6 w-6" />
                <span>Record Sale</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
