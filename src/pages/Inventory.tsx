
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Package, AlertCircle, TrendingUp, TrendingDown, Search, Filter, 
  Plus, Minus, ShoppingBag, FileText, History, PenSquare, ChevronDown,
  ChevronUp, BarChart, DollarSign
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock inventory data
const inventoryData = {
  inputs: [
    { 
      id: 1, 
      name: "Maize Seeds (H614D)", 
      category: "Seeds",
      quantity: 25, 
      unit: "kg", 
      location: "Main Storage",
      reorderPoint: 10,
      lastRestocked: "2025-04-01",
      supplier: "Kenya Seed Company"
    },
    { 
      id: 2, 
      name: "NPK Fertilizer", 
      category: "Fertilizer",
      quantity: 3, 
      unit: "50kg bags", 
      location: "Main Storage",
      reorderPoint: 2,
      lastRestocked: "2025-03-15",
      supplier: "MEA Ltd"
    },
    { 
      id: 3, 
      name: "Dairy Feed", 
      category: "Animal Feed",
      quantity: 5, 
      unit: "50kg bags", 
      location: "Feed Store",
      reorderPoint: 3,
      lastRestocked: "2025-05-01",
      supplier: "Unga Feeds"
    },
    { 
      id: 4, 
      name: "Chickick Mash", 
      category: "Animal Feed",
      quantity: 1, 
      unit: "70kg bags", 
      location: "Feed Store",
      reorderPoint: 2,
      lastRestocked: "2025-04-20",
      supplier: "Unga Feeds"
    },
    { 
      id: 5, 
      name: "Pesticide - General", 
      category: "Chemicals",
      quantity: 2, 
      unit: "liters", 
      location: "Chemical Cabinet",
      reorderPoint: 1,
      lastRestocked: "2025-03-20",
      supplier: "AgroVet Solutions"
    },
  ],
  produce: [
    { 
      id: 101, 
      name: "Maize", 
      quantity: 500, 
      unit: "kg", 
      harvestDate: "2025-01-15",
      location: "Grain Store",
      quality: "good",
      notes: "From North Field" 
    },
    { 
      id: 102, 
      name: "Eggs", 
      quantity: 120, 
      unit: "pieces", 
      harvestDate: "2025-05-07",
      location: "Cool Room",
      quality: "excellent",
      notes: "From Layer hens" 
    },
    { 
      id: 103, 
      name: "Milk", 
      quantity: 25, 
      unit: "liters", 
      harvestDate: "2025-05-08",
      location: "Cold Storage",
      quality: "excellent",
      notes: "Today's production" 
    },
    { 
      id: 104, 
      name: "Kale", 
      quantity: 30, 
      unit: "bundles", 
      harvestDate: "2025-05-08",
      location: "Packing Area",
      quality: "good",
      notes: "Ready for market tomorrow" 
    }
  ],
  sales: [
    {
      id: 201,
      date: "2025-05-07",
      customer: "Nairobi Traders",
      items: [
        { name: "Maize", quantity: 200, unit: "kg", unitPrice: 45 }
      ],
      total: 9000,
      status: "paid",
      paymentMethod: "M-Pesa"
    },
    {
      id: 202,
      date: "2025-05-05",
      customer: "Local Market",
      items: [
        { name: "Eggs", quantity: 150, unit: "pieces", unitPrice: 15 },
        { name: "Kale", quantity: 50, unit: "bundles", unitPrice: 20 }
      ],
      total: 3250,
      status: "paid",
      paymentMethod: "Cash"
    },
    {
      id: 203,
      date: "2025-05-02",
      customer: "Green Grocers Ltd",
      items: [
        { name: "Milk", quantity: 100, unit: "liters", unitPrice: 60 }
      ],
      total: 6000,
      status: "pending",
      paymentMethod: "Bank Transfer"
    }
  ]
};

// Find items below reorder point
const lowStockItems = inventoryData.inputs.filter(
  item => item.quantity <= item.reorderPoint
);

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedSales, setExpandedSales] = useState<number[]>([]);
  
  const toggleSaleDetails = (id: number) => {
    if (expandedSales.includes(id)) {
      setExpandedSales(expandedSales.filter(saleId => saleId !== id));
    } else {
      setExpandedSales([...expandedSales, id]);
    }
  };
  
  // Filter inputs based on search term
  const filteredInputs = inventoryData.inputs.filter(
    item => item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter produce based on search term
  const filteredProduce = inventoryData.produce.filter(
    item => item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Inventory & Sales</h1>
        <p className="text-muted-foreground">
          Manage your farm inputs, produce, and sales records
        </p>
      </div>

      <div className="mb-6">
        {lowStockItems.length > 0 && (
          <Card className="bg-amber-50 border-amber-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h3 className="font-medium text-amber-800">Low Stock Alert</h3>
                  <p className="text-sm text-amber-700 mb-2">
                    The following items are below their reorder points:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {lowStockItems.map(item => (
                      <Badge key={item.id} variant="outline" className="bg-white border-amber-300 text-amber-800">
                        {item.name}: {item.quantity} {item.unit} left
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-amber-100 px-4 py-2 border-t border-amber-200">
              <Button variant="outline" className="w-full border-amber-500 hover:bg-amber-100 text-amber-800">
                Create Purchase Order
              </Button>
            </CardFooter>
          </Card>
        )}

        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search inventory items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
            <Button variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="inputs" className="mb-6">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="inputs">Farm Inputs</TabsTrigger>
          <TabsTrigger value="produce">Harvested Produce</TabsTrigger>
          <TabsTrigger value="sales">Sales Records</TabsTrigger>
        </TabsList>

        <TabsContent value="inputs">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-xl flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Farm Inputs Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Last Restocked</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInputs.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="text-right">
                          <div className={`
                            font-medium 
                            ${item.quantity <= item.reorderPoint 
                              ? 'text-red-600' 
                              : item.quantity <= item.reorderPoint * 1.5 
                                ? 'text-amber-600' 
                                : ''
                            }
                          `}>
                            {item.quantity} {item.unit}
                          </div>
                          {item.quantity <= item.reorderPoint && (
                            <div className="text-xs text-red-600">
                              Below reorder point
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>{item.lastRestocked}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                            <Button size="sm" variant="outline">
                              <Minus className="h-3 w-3 mr-1" />
                              Use
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredInputs.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No items found matching your search criteria.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t py-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredInputs.length} of {inventoryData.inputs.length} items
              </div>
              <Button variant="outline">
                Order New Supplies
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="produce">
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-xl flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Harvested Produce Inventory
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Quantity</TableHead>
                      <TableHead>Harvest Date</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProduce.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="font-medium">{item.name}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="font-medium">{item.quantity} {item.unit}</div>
                        </TableCell>
                        <TableCell>{item.harvestDate}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <Badge variant={
                            item.quality === "excellent" ? "default" : 
                            item.quality === "good" ? "secondary" : 
                            "outline"
                          }>
                            {item.quality.charAt(0).toUpperCase() + item.quality.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px] truncate">{item.notes}</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="secondary">
                              <TrendingDown className="h-3 w-3 mr-1" />
                              Sell
                            </Button>
                            <Button size="sm" variant="outline">
                              <PenSquare className="h-3 w-3" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredProduce.length === 0 && (
                <div className="text-center py-10 text-muted-foreground">
                  No produce found matching your search criteria.
                </div>
              )}
            </CardContent>
            <CardFooter className="border-t py-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredProduce.length} of {inventoryData.produce.length} items
              </div>
              <Button>
                Record New Harvest
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <DollarSign className="h-4 w-4 mr-2 text-green-500" />
                  Total Sales (Past 30 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">KES 18,250</div>
                <div className="flex items-center text-sm text-green-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span>12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <History className="h-4 w-4 mr-2 text-blue-500" />
                  Transactions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">
                  This month
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <BarChart className="h-4 w-4 mr-2 text-purple-500" />
                  Top Product
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">Maize</div>
                <div className="text-sm text-muted-foreground">
                  KES 9,000 (200 kg)
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle className="text-xl flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Sales Records
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {inventoryData.sales.map((sale) => (
                      <>
                        <TableRow key={sale.id} className="cursor-pointer hover:bg-muted/50" onClick={() => toggleSaleDetails(sale.id)}>
                          <TableCell>{sale.date}</TableCell>
                          <TableCell>
                            <div className="font-medium">{sale.customer}</div>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            KES {sale.total.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={sale.status === "paid" ? "secondary" : "outline"} className={
                              sale.status === "paid" ? "bg-green-100 text-green-800 hover:bg-green-100" : 
                              "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }>
                              {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{sale.paymentMethod}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                              <Button variant="ghost" size="icon">
                                {expandedSales.includes(sale.id) ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                        {expandedSales.includes(sale.id) && (
                          <TableRow>
                            <TableCell colSpan={6} className="p-0">
                              <div className="bg-muted p-4">
                                <h4 className="font-medium mb-2">Items Sold</h4>
                                <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Item</TableHead>
                                      <TableHead className="text-right">Quantity</TableHead>
                                      <TableHead className="text-right">Unit Price</TableHead>
                                      <TableHead className="text-right">Total</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {sale.items.map((item, index) => (
                                      <TableRow key={index}>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell className="text-right">{item.quantity} {item.unit}</TableCell>
                                        <TableCell className="text-right">KES {item.unitPrice}</TableCell>
                                        <TableCell className="text-right">KES {item.quantity * item.unitPrice}</TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                                <div className="flex justify-end mt-4 space-x-2">
                                  <Button variant="outline" size="sm">
                                    <FileText className="h-4 w-4 mr-2" />
                                    Print Receipt
                                  </Button>
                                  {sale.status === "pending" && (
                                    <Button size="sm">
                                      <DollarSign className="h-4 w-4 mr-2" />
                                      Mark as Paid
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="border-t py-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {inventoryData.sales.length} recent sales
              </div>
              <div className="space-x-2">
                <Button variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Records
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Sale
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Inventory;
