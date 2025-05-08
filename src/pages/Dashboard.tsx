
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Calendar,
  Crop,
  Landmark,
  LayoutDashboard,
  MapPin,
  Package,
  Plus,
  Tractor,
  TrendingUp,
  Bell,
  AlertTriangle
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

// Mock farm data
const farms = [
  { 
    id: 1, 
    name: "Main Farm", 
    location: "Kiambu County", 
    size: "5 acres",
    crops: ["Maize", "Beans", "Kale"],
    livestock: ["Dairy Cows", "Chickens"]
  },
  { 
    id: 2, 
    name: "River Plot", 
    location: "Kiambu County", 
    size: "2 acres",
    crops: ["Tomatoes", "Onions"],
    livestock: []
  }
];

// Mock crops data
const crops = [
  { 
    id: 1, 
    name: "Maize", 
    variety: "H614",
    plantingDate: "2023-03-15", 
    harvestDate: "2023-08-01",
    field: "Field 1",
    area: "2 acres",
    status: "Growing",
    progress: 65
  },
  { 
    id: 2, 
    name: "Beans", 
    variety: "KK8",
    plantingDate: "2023-03-20", 
    harvestDate: "2023-06-15",
    field: "Field 1",
    area: "1 acre",
    status: "Growing",
    progress: 70
  },
  { 
    id: 3, 
    name: "Kale", 
    variety: "Sukuma Wiki",
    plantingDate: "2023-04-01", 
    harvestDate: "Ongoing",
    field: "Field 2",
    area: "0.5 acres",
    status: "Harvesting",
    progress: 90
  },
  { 
    id: 4, 
    name: "Tomatoes", 
    variety: "Roma",
    plantingDate: "2023-04-10", 
    harvestDate: "2023-07-15",
    field: "River Plot - Section A",
    area: "1 acre",
    status: "Growing",
    progress: 45
  },
];

// Mock livestock data
const livestock = [
  {
    id: 1,
    type: "Dairy Cow",
    name: "Cow 1",
    breed: "Holstein",
    age: "4 years",
    status: "Lactating",
    notes: "Producing 15L per day"
  },
  {
    id: 2,
    type: "Dairy Cow",
    name: "Cow 2",
    breed: "Jersey",
    age: "3 years",
    status: "Pregnant",
    notes: "Due in 2 months"
  },
  {
    id: 3,
    type: "Chicken",
    name: "Layer Batch 1",
    breed: "ISA Brown",
    age: "8 months",
    status: "Laying",
    notes: "180 birds, avg 160 eggs/day"
  }
];

// Mock inventory data
const inventory = [
  {
    id: 1,
    name: "DAP Fertilizer",
    category: "Input",
    quantity: 5,
    unit: "50kg bags",
    lastUpdated: "2023-05-01",
    reorderLevel: 2,
    status: "Sufficient"
  },
  {
    id: 2,
    name: "Maize Seeds",
    category: "Input",
    quantity: 1,
    unit: "10kg bags",
    lastUpdated: "2023-05-01",
    reorderLevel: 1,
    status: "Low"
  },
  {
    id: 3,
    name: "Chicken Feed",
    category: "Input",
    quantity: 3,
    unit: "70kg bags",
    lastUpdated: "2023-05-05",
    reorderLevel: 2,
    status: "Sufficient"
  },
  {
    id: 4,
    name: "Maize",
    category: "Produce",
    quantity: 15,
    unit: "90kg bags",
    lastUpdated: "2023-05-01",
    status: "In Stock"
  },
  {
    id: 5,
    name: "Tomatoes",
    category: "Produce",
    quantity: 80,
    unit: "kg",
    lastUpdated: "2023-05-07",
    status: "In Stock"
  }
];

// Mock analytics data
const yieldData = [
  { month: "Jan", maize: 0, beans: 0, kale: 30 },
  { month: "Feb", maize: 0, beans: 0, kale: 45 },
  { month: "Mar", maize: 0, beans: 0, kale: 40 },
  { month: "Apr", maize: 0, beans: 0, kale: 50 },
  { month: "May", maize: 0, beans: 0, kale: 35 },
  { month: "Jun", maize: 0, beans: 120, kale: 40 },
  { month: "Jul", maize: 0, beans: 0, kale: 45 },
  { month: "Aug", maize: 380, beans: 0, kale: 40 },
  { month: "Sep", maize: 0, beans: 0, kale: 35 },
  { month: "Oct", maize: 0, beans: 0, kale: 30 },
  { month: "Nov", maize: 0, beans: 90, kale: 35 },
  { month: "Dec", maize: 0, beans: 0, kale: 40 }
];

const incomeData = [
  { month: "Jan", income: 12000, expenses: 5000 },
  { month: "Feb", income: 15000, expenses: 6000 },
  { month: "Mar", income: 18000, expenses: 8000 },
  { month: "Apr", income: 16000, expenses: 7500 },
  { month: "May", income: 21000, expenses: 9000 },
  { month: "Jun", income: 25000, expenses: 10000 }
];

// Mock upcoming tasks
const upcomingTasks = [
  {
    id: 1,
    title: "Apply Fertilizer",
    crop: "Maize",
    date: "2023-05-15",
    priority: "high"
  },
  {
    id: 2,
    title: "Vaccination",
    crop: "Dairy Cows",
    date: "2023-05-18",
    priority: "high"
  },
  {
    id: 3,
    title: "Pesticide Application",
    crop: "Tomatoes",
    date: "2023-05-20",
    priority: "medium"
  },
  {
    id: 4,
    title: "Harvest Kale",
    crop: "Kale",
    date: "2023-05-12",
    priority: "medium"
  }
];

const Dashboard = () => {
  const [selectedFarm, setSelectedFarm] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("6months");
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Growing":
        return <Badge className="bg-farm-green-600">Growing</Badge>;
      case "Harvesting":
        return <Badge className="bg-kenyan-gold-500 hover:bg-kenyan-gold-600">Harvesting</Badge>;
      case "Completed":
        return <Badge variant="outline">Completed</Badge>;
      case "Low":
        return <Badge variant="destructive">Low</Badge>;
      case "Sufficient":
        return <Badge className="bg-farm-green-600">Sufficient</Badge>;
      case "In Stock":
        return <Badge className="bg-kenyan-sky-500">In Stock</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="page-container">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-farm-green-800">Farm Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your farm activities, track crops, livestock, and monitor performance.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <Select value={selectedFarm} onValueChange={setSelectedFarm}>
            <SelectTrigger className="w-[180px] mr-2">
              <SelectValue placeholder="Select farm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Farms</SelectItem>
                {farms.map((farm) => (
                  <SelectItem key={farm.id} value={farm.id.toString()}>
                    {farm.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Farm
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Crop className="h-5 w-5 mr-2 text-farm-green-600" /> Crop Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{crops.length}</div>
            <p className="text-muted-foreground">Active crops</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set(crops.map(crop => crop.name))).map((crop, index) => (
                <Badge key={index} variant="outline">
                  {crop}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Tractor className="h-5 w-5 mr-2 text-farm-green-600" /> Livestock Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{livestock.length}</div>
            <p className="text-muted-foreground">Animals tracked</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {Array.from(new Set(livestock.map(animal => animal.type))).map((type, index) => (
                <Badge key={index} variant="outline">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Package className="h-5 w-5 mr-2 text-farm-green-600" /> Inventory Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inventory.length}</div>
            <p className="text-muted-foreground">Items in inventory</p>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Inputs</span>
                <Badge variant="outline">{inventory.filter(item => item.category === "Input").length}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Produce</span>
                <Badge variant="outline">{inventory.filter(item => item.category === "Produce").length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-farm-green-600" /> Farm Performance
            </CardTitle>
            <CardDescription>
              Track yields, income, and expenses over time
            </CardDescription>
            <div className="flex gap-2 mt-2">
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="yield">
              <TabsList>
                <TabsTrigger value="yield">Yield</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>
              <TabsContent value="yield" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="maize" name="Maize (kg)" fill="#5fa624" />
                    <Bar dataKey="beans" name="Beans (kg)" fill="#a68161" />
                    <Bar dataKey="kale" name="Kale (kg)" fill="#1e99ef" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="financial" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} KES`]} />
                    <Legend />
                    <Line type="monotone" dataKey="income" name="Income (KES)" stroke="#5fa624" strokeWidth={2} />
                    <Line type="monotone" dataKey="expenses" name="Expenses (KES)" stroke="#ef4444" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-farm-green-600" /> Upcoming Tasks
            </CardTitle>
            <CardDescription>
              Tasks and activities requiring attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start justify-between pb-3 border-b last:border-b-0">
                  <div>
                    <div className="font-medium mb-1">{task.title}</div>
                    <div className="text-sm text-muted-foreground mb-1">
                      {task.crop}
                    </div>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" /> {new Date(task.date).toLocaleDateString()}
                    </div>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Tabs defaultValue="crops">
          <TabsList>
            <TabsTrigger value="crops" className="flex items-center">
              <Crop className="h-4 w-4 mr-2" /> Crops
            </TabsTrigger>
            <TabsTrigger value="livestock" className="flex items-center">
              <Tractor className="h-4 w-4 mr-2" /> Livestock
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="h-4 w-4 mr-2" /> Inventory
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="crops" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Active Crops</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Crop
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2 pl-0">Crop</th>
                    <th className="text-left font-medium p-2">Variety</th>
                    <th className="text-left font-medium p-2">Field</th>
                    <th className="text-left font-medium p-2">Area</th>
                    <th className="text-left font-medium p-2">Planting Date</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {crops.map((crop) => (
                    <tr key={crop.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 pl-0">
                        <div className="font-medium">{crop.name}</div>
                      </td>
                      <td className="p-2">{crop.variety}</td>
                      <td className="p-2">{crop.field}</td>
                      <td className="p-2">{crop.area}</td>
                      <td className="p-2">{new Date(crop.plantingDate).toLocaleDateString()}</td>
                      <td className="p-2">{getStatusBadge(crop.status)}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-full bg-muted rounded-full h-2 mr-2">
                            <div 
                              className="bg-farm-green-600 h-2 rounded-full" 
                              style={{ width: `${crop.progress}%` }}
                            />
                          </div>
                          <span className="text-xs">{crop.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="livestock" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Livestock</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Animal
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2 pl-0">Type</th>
                    <th className="text-left font-medium p-2">Name/ID</th>
                    <th className="text-left font-medium p-2">Breed</th>
                    <th className="text-left font-medium p-2">Age</th>
                    <th className="text-left font-medium p-2">Status</th>
                    <th className="text-left font-medium p-2">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {livestock.map((animal) => (
                    <tr key={animal.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 pl-0">
                        <div className="font-medium">{animal.type}</div>
                      </td>
                      <td className="p-2">{animal.name}</td>
                      <td className="p-2">{animal.breed}</td>
                      <td className="p-2">{animal.age}</td>
                      <td className="p-2">{getStatusBadge(animal.status)}</td>
                      <td className="p-2">{animal.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="inventory" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Inventory</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Item
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium p-2 pl-0">Item</th>
                    <th className="text-left font-medium p-2">Category</th>
                    <th className="text-left font-medium p-2">Quantity</th>
                    <th className="text-left font-medium p-2">Unit</th>
                    <th className="text-left font-medium p-2">Last Updated</th>
                    <th className="text-left font-medium p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item) => (
                    <tr key={item.id} className="border-b hover:bg-muted/50">
                      <td className="p-2 pl-0">
                        <div className="font-medium">{item.name}</div>
                      </td>
                      <td className="p-2">{item.category}</td>
                      <td className="p-2">{item.quantity}</td>
                      <td className="p-2">{item.unit}</td>
                      <td className="p-2">{new Date(item.lastUpdated).toLocaleDateString()}</td>
                      <td className="p-2">
                        <div className="flex items-center">
                          {getStatusBadge(item.status)}
                          {item.status === "Low" && (
                            <AlertTriangle className="h-4 w-4 text-destructive ml-2" />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-farm-green-600" /> Farm Properties
            </CardTitle>
            <CardDescription>
              Manage your farmland properties
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {farms.map((farm) => (
                <div key={farm.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-base mb-1">{farm.name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {farm.location} • {farm.size}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {farm.crops.map((crop, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {crop}
                          </Badge>
                        ))}
                        
                        {farm.livestock.map((animal, index) => (
                          <Badge key={`animal-${index}`} variant="outline" className="text-xs">
                            {animal}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Landmark className="h-5 w-5 mr-2 text-farm-green-600" /> Financial Summary
            </CardTitle>
            <CardDescription>
              Recent income and expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Total Income (This Month)</div>
                  <div className="text-2xl font-bold mt-1">21,000 KES</div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm text-muted-foreground">Total Expenses (This Month)</div>
                  <div className="text-2xl font-bold mt-1">9,000 KES</div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <div className="text-sm text-muted-foreground">Projected Profit (This Month)</div>
                <div className="text-2xl font-bold text-farm-green-700 mt-1">12,000 KES</div>
                <div className="text-xs text-muted-foreground flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> 15% increase from last month
                </div>
              </div>
              
              <Button className="w-full">
                <LayoutDashboard className="h-4 w-4 mr-2" /> View Financial Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
