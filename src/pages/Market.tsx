
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Search, Filter, TrendingUp, ShoppingCart, MapPin, Calendar, Percent } from "lucide-react";

// Mock market data
const marketPrices = [
  {
    id: 1,
    name: "Maize (90kg bag)",
    price: 3200,
    lastWeekPrice: 3000,
    lastMonthPrice: 2800,
    region: "Nairobi",
    trend: "up",
    changePercent: 6.67
  },
  {
    id: 2,
    name: "Beans (90kg bag)",
    price: 7800,
    lastWeekPrice: 8000,
    lastMonthPrice: 8200,
    region: "Nairobi",
    trend: "down",
    changePercent: -2.5
  },
  {
    id: 3,
    name: "Rice (Pishori, 25kg bag)",
    price: 3500,
    lastWeekPrice: 3500,
    lastMonthPrice: 3400,
    region: "Mombasa",
    trend: "stable",
    changePercent: 0
  },
  {
    id: 4,
    name: "Potatoes (110kg bag)",
    price: 2200,
    lastWeekPrice: 2500,
    lastMonthPrice: 2800,
    region: "Nakuru",
    trend: "down",
    changePercent: -12
  },
  {
    id: 5,
    name: "Tomatoes (64kg crate)",
    price: 5800,
    lastWeekPrice: 4500,
    lastMonthPrice: 4000,
    region: "Nairobi",
    trend: "up",
    changePercent: 28.89
  },
  {
    id: 6,
    name: "Milk (1 liter)",
    price: 60,
    lastWeekPrice: 60,
    lastMonthPrice: 55,
    region: "Nationwide",
    trend: "stable",
    changePercent: 0
  }
];

const buyers = [
  {
    id: 1,
    name: "Twiga Foods Ltd",
    type: "Wholesale Buyer",
    products: ["Fruits", "Vegetables", "Cereals"],
    region: "Nationwide",
    contact: "+254 700 123 456",
    email: "procurement@twigafoods.com"
  },
  {
    id: 2,
    name: "Kenya Cereals Board",
    type: "Government Agency",
    products: ["Maize", "Rice", "Wheat"],
    region: "Nationwide",
    contact: "+254 700 789 123",
    email: "procurement@cereals.go.ke"
  },
  {
    id: 3,
    name: "Nairobi Farmers Market",
    type: "Retail Market",
    products: ["All Farm Produce"],
    region: "Nairobi",
    contact: "+254 711 222 333",
    email: "info@nairobifarmersmarket.co.ke"
  },
  {
    id: 4,
    name: "Brookside Dairy",
    type: "Dairy Processor",
    products: ["Milk", "Dairy Products"],
    region: "Nationwide",
    contact: "+254 722 444 555",
    email: "farmers@brookside.co.ke"
  }
];

const regions = ["All Regions", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Nationwide"];

const Market = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPrices = marketPrices.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === "All Regions" || item.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          buyer.products.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRegion = selectedRegion === "All Regions" || buyer.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Market Information</h1>
        <p className="text-muted-foreground">
          Access current market prices and find buyers for your agricultural products.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search commodity or buyer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 md:w-auto w-full"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <Filter className="h-4 w-4" /> Filters
        </Button>
      </div>

      {isFilterOpen && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-muted rounded-lg">
          <div>
            <label className="text-sm font-medium mb-1 block">Region</label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="secondary" className="w-full" onClick={() => {
              setSearchTerm("");
              setSelectedRegion("All Regions");
            }}>
              Reset Filters
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="prices" className="mb-6">
        <TabsList>
          <TabsTrigger value="prices">Market Prices</TabsTrigger>
          <TabsTrigger value="buyers">Buyers Directory</TabsTrigger>
        </TabsList>

        <TabsContent value="prices" className="mt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 border-b">Commodity</th>
                  <th className="text-right p-3 border-b">Current Price (KES)</th>
                  <th className="text-right p-3 border-b hidden md:table-cell">Last Week</th>
                  <th className="text-right p-3 border-b hidden md:table-cell">Last Month</th>
                  <th className="text-right p-3 border-b">Change</th>
                  <th className="text-left p-3 border-b hidden md:table-cell">Region</th>
                </tr>
              </thead>
              <tbody>
                {filteredPrices.map(item => (
                  <tr key={item.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-right font-medium">
                      {item.price.toLocaleString()} KES
                    </td>
                    <td className="p-3 text-right hidden md:table-cell">
                      {item.lastWeekPrice.toLocaleString()} KES
                    </td>
                    <td className="p-3 text-right hidden md:table-cell">
                      {item.lastMonthPrice.toLocaleString()} KES
                    </td>
                    <td className={`p-3 text-right ${
                      item.trend === 'up' ? 'text-green-600' : 
                      item.trend === 'down' ? 'text-red-600' : 
                      'text-amber-600'
                    }`}>
                      <div className="flex items-center justify-end gap-1">
                        {item.trend === 'up' && <TrendingUp className="h-4 w-4" />}
                        {item.trend === 'down' && <TrendingUp className="h-4 w-4 rotate-180" />}
                        {item.trend === 'stable' && <Percent className="h-4 w-4" />}
                        <span>{item.changePercent > 0 ? '+' : ''}{item.changePercent}%</span>
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">{item.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPrices.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No price data found matching your search criteria.</p>
            </div>
          )}
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p className="flex items-center"><Calendar className="h-3 w-3 mr-1" /> Last updated: May 8, 2025</p>
            <p>Prices may vary by location and quality of produce.</p>
          </div>
        </TabsContent>

        <TabsContent value="buyers" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBuyers.map(buyer => (
              <Card key={buyer.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{buyer.name}</CardTitle>
                  <CardDescription>{buyer.type}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div>
                      <div className="text-sm font-medium">Products:</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {buyer.products.map((product, i) => (
                          <Badge key={i} variant="secondary">{product}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{buyer.region}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start pt-2">
                  <Separator className="w-full mb-2" />
                  <div className="text-sm">
                    <div><span className="font-medium">Contact:</span> {buyer.contact}</div>
                    <div><span className="font-medium">Email:</span> {buyer.email}</div>
                  </div>
                  <Button className="mt-3 w-full" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" /> Request Quote
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          {filteredBuyers.length === 0 && (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No buyers found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-muted p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Market Tip of the Day</h2>
        <p>When selling bulk produce, contacting multiple buyers for quotes can help you negotiate better prices. Always check current market rates before agreeing to a sale.</p>
      </div>
    </div>
  );
};

export default Market;
