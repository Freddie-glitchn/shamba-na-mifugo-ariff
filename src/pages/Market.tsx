
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, MapPin, Search } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock market price data
const marketData = [
  { date: "2023-05-01", maize: 35, beans: 120, potatoes: 45 },
  { date: "2023-05-08", maize: 38, beans: 110, potatoes: 50 },
  { date: "2023-05-15", maize: 40, beans: 115, potatoes: 48 },
  { date: "2023-05-22", maize: 42, beans: 125, potatoes: 52 },
  { date: "2023-05-29", maize: 45, beans: 130, potatoes: 55 },
  { date: "2023-06-05", maize: 43, beans: 128, potatoes: 54 },
  { date: "2023-06-12", maize: 40, beans: 120, potatoes: 50 },
];

// Mock buyers/markets data
const buyers = [
  {
    id: 1,
    name: "Nairobi Farmers Market",
    type: "Market",
    location: "Nairobi",
    contactNumber: "+254 700 123 456",
    products: ["Maize", "Beans", "Vegetables"],
    currentPrices: {
      Maize: "45 KES/kg",
      Beans: "130 KES/kg",
      Vegetables: "Varies"
    }
  },
  {
    id: 2,
    name: "Twiga Foods",
    type: "Distributor",
    location: "Multiple Locations",
    contactNumber: "+254 700 789 012",
    products: ["Maize", "Potatoes", "Vegetables", "Fruits"],
    currentPrices: {
      Maize: "47 KES/kg",
      Potatoes: "55 KES/kg",
      Vegetables: "Varies",
      Fruits: "Varies"
    }
  },
  {
    id: 3,
    name: "Mombasa Grain Exchange",
    type: "Market",
    location: "Mombasa",
    contactNumber: "+254 700 345 678",
    products: ["Maize", "Rice", "Beans"],
    currentPrices: {
      Maize: "44 KES/kg",
      Rice: "120 KES/kg",
      Beans: "125 KES/kg"
    }
  },
  {
    id: 4,
    name: "Kisumu Agricultural Cooperative",
    type: "Cooperative",
    location: "Kisumu",
    contactNumber: "+254 700 901 234",
    products: ["Maize", "Beans", "Fish"],
    currentPrices: {
      Maize: "43 KES/kg",
      Beans: "128 KES/kg",
      Fish: "200 KES/kg"
    }
  },
  {
    id: 5,
    name: "Nakuru Farm Supplies",
    type: "Distributor",
    location: "Nakuru",
    contactNumber: "+254 700 567 890",
    products: ["Maize", "Wheat", "Potatoes"],
    currentPrices: {
      Maize: "44 KES/kg",
      Wheat: "60 KES/kg",
      Potatoes: "52 KES/kg"
    }
  }
];

// Current price data
const currentPrices = [
  {
    id: 1,
    product: "Maize",
    price: 45,
    unit: "KES/kg",
    change: 2,
    trend: "up"
  },
  {
    id: 2,
    product: "Beans",
    price: 130,
    unit: "KES/kg",
    change: -2,
    trend: "down"
  },
  {
    id: 3,
    product: "Potatoes",
    price: 55,
    unit: "KES/kg",
    change: 1,
    trend: "up"
  },
  {
    id: 4,
    product: "Rice",
    price: 120,
    unit: "KES/kg",
    change: 0,
    trend: "stable"
  },
  {
    id: 5,
    product: "Wheat",
    price: 60,
    unit: "KES/kg",
    change: -1,
    trend: "down"
  },
  {
    id: 6,
    product: "Milk",
    price: 70,
    unit: "KES/L",
    change: 5,
    trend: "up"
  }
];

const BuyerCard = ({ buyer }: { buyer: typeof buyers[0] }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{buyer.name}</h3>
          <Badge variant="outline">{buyer.type}</Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {buyer.location}
        </div>
        
        <p className="text-sm mb-3">Products: {buyer.products.join(", ")}</p>
        
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-1">Current Prices:</h4>
          <ul className="text-sm space-y-1">
            {Object.entries(buyer.currentPrices).map(([product, price]) => (
              <li key={product}>
                {product}: <span className="font-medium">{price}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Contact: {buyer.contactNumber}
          </div>
          <Button variant="ghost" size="sm" className="text-farm-green-600 hover:text-farm-green-800 p-0">
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState("Maize");
  
  const locations = ["All", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Multiple Locations"];
  const products = ["Maize", "Beans", "Potatoes", "Rice", "Wheat", "Milk"];
  
  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || buyer.location === selectedLocation;
    
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Market Data & Pricing</h1>
        <p className="text-muted-foreground">
          Stay updated with current market prices, find buyers, and make informed decisions for your farm business.
        </p>
      </div>

      <div className="bg-farm-green-50 rounded-lg p-4 md:p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <BarChart3 className="mr-2 h-5 w-5 text-farm-green-700" /> Current Market Prices
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {currentPrices.map(item => (
            <Card key={item.id}>
              <CardContent className="p-3">
                <div className="text-sm font-medium mb-1">{item.product}</div>
                <div className="text-xl font-bold mb-1">{item.price} <span className="text-sm font-normal">{item.unit}</span></div>
                <div className={`flex items-center text-sm ${
                  item.trend === "up" ? "text-green-600" : 
                  item.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}>
                  {item.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : item.trend === "down" ? (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  ) : null}
                  {item.change === 0 ? "Stable" : `${item.change > 0 ? "+" : ""}${item.change}`}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Price Trends</h2>
        
        <div className="mb-4">
          <Select value={selectedProduct} onValueChange={setSelectedProduct}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Select product" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {products.map(product => (
                  <SelectItem key={product} value={product}>{product}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="h-[300px] border rounded-lg p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value} KES/kg`, selectedProduct.toLowerCase()]}
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-UK');
                }}
              />
              <Line 
                type="monotone" 
                dataKey={selectedProduct.toLowerCase()} 
                stroke="#5fa624" 
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Find Buyers & Markets</h2>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search buyers by name..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>{location}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="distributors">Distributors</TabsTrigger>
            <TabsTrigger value="cooperatives">Cooperatives</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {filteredBuyers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuyers.map(buyer => (
                  <BuyerCard key={buyer.id} buyer={buyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No buyers found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="markets">
            {filteredBuyers.filter(b => b.type === "Market").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuyers.filter(b => b.type === "Market").map(buyer => (
                  <BuyerCard key={buyer.id} buyer={buyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No markets found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="distributors">
            {filteredBuyers.filter(b => b.type === "Distributor").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuyers.filter(b => b.type === "Distributor").map(buyer => (
                  <BuyerCard key={buyer.id} buyer={buyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No distributors found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cooperatives">
            {filteredBuyers.filter(b => b.type === "Cooperative").length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBuyers.filter(b => b.type === "Cooperative").map(buyer => (
                  <BuyerCard key={buyer.id} buyer={buyer} />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">No cooperatives found matching your search criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Market;
