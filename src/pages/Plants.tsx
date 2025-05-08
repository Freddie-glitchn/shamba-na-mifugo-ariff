
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
import { Search, Filter, ArrowRight, Cube } from "lucide-react";

// Mock data for plants
const plants = [
  {
    id: 1,
    name: "Maize (Mahindi)",
    scientificName: "Zea mays",
    category: "Cereal",
    region: "Nationwide",
    climate: "Various",
    nutrients: ["Carbohydrates", "Fiber", "Protein"],
    description: "Maize is a staple food crop in Kenya, grown in many regions. It requires moderate rainfall and grows well in well-drained soils.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: true
  },
  {
    id: 2,
    name: "Beans (Maharagwe)",
    scientificName: "Phaseolus vulgaris",
    category: "Legume",
    region: "Central, Western",
    climate: "Moderate",
    nutrients: ["Protein", "Fiber", "Iron"],
    description: "Common beans are a key source of protein. They can be intercropped with maize and prefer well-drained soils with moderate rainfall.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: false
  },
  {
    id: 3,
    name: "Cassava (Mihogo)",
    scientificName: "Manihot esculenta",
    category: "Tuber",
    region: "Coastal, Western",
    climate: "Warm",
    nutrients: ["Carbohydrates", "Vitamin C"],
    description: "Cassava is drought-resistant and grows well in poor soils. It's an important food security crop in many regions of Kenya.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: true
  },
  {
    id: 4,
    name: "Sweet Potato (Viazi vitamu)",
    scientificName: "Ipomoea batatas",
    category: "Tuber",
    region: "Western, Nyanza",
    climate: "Various",
    nutrients: ["Vitamin A", "Fiber", "Potassium"],
    description: "Sweet potatoes are easy to grow and drought-resistant. They're rich in nutrients and can grow in various soil types.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: true
  },
  {
    id: 5,
    name: "Kale (Sukuma wiki)",
    scientificName: "Brassica oleracea",
    category: "Vegetable",
    region: "Nationwide",
    climate: "Cool to moderate",
    nutrients: ["Vitamin K", "Vitamin C", "Iron"],
    description: "Kale is a popular leafy vegetable in Kenya. It grows quickly and can be harvested multiple times from the same plant.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: false
  },
  {
    id: 6,
    name: "Cowpea (Kunde)",
    scientificName: "Vigna unguiculata",
    category: "Legume",
    region: "Eastern, Coast",
    climate: "Warm, dry",
    nutrients: ["Protein", "Folate", "Iron"],
    description: "Cowpeas are drought-tolerant legumes that fix nitrogen in the soil. Both the leaves and seeds are edible.",
    imageUrl: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    hasArModel: false
  },
];

// Filter options
const categories = ["All", "Cereal", "Legume", "Tuber", "Vegetable"];
const regions = ["All", "Nationwide", "Central", "Eastern", "Western", "Nyanza", "Coast"];
const climates = ["All", "Various", "Warm", "Cool to moderate", "Moderate", "Warm, dry"];
const nutrients = ["All", "Protein", "Carbohydrates", "Fiber", "Vitamin A", "Vitamin C", "Vitamin K", "Iron", "Potassium", "Folate"];

const PlantCard = ({ plant }: { plant: typeof plants[0] }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{plant.name}</h3>
          {plant.hasArModel && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Cube className="h-3 w-3" />
              AR
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground italic mb-2">{plant.scientificName}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {plant.nutrients.map((nutrient, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
              {nutrient}
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
          {plant.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            <span className="font-medium">Region:</span> {plant.region}
          </div>
          <Button variant="ghost" size="sm" className="text-farm-green-600 hover:text-farm-green-800 p-0">
            View Details <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Plants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedClimate, setSelectedClimate] = useState("All");
  const [selectedNutrient, setSelectedNutrient] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPlants = plants.filter(plant => {
    // Search filter
    const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedCategory === "All" || plant.category === selectedCategory;
    
    // Region filter - check if any of the plant regions includes the selected region
    const matchesRegion = selectedRegion === "All" || plant.region.includes(selectedRegion);
    
    // Climate filter
    const matchesClimate = selectedClimate === "All" || plant.climate === selectedClimate;
    
    // Nutrient filter
    const matchesNutrient = selectedNutrient === "All" || plant.nutrients.includes(selectedNutrient);
    
    return matchesSearch && matchesCategory && matchesRegion && matchesClimate && matchesNutrient;
  });

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Plant Knowledge Base</h1>
        <p className="text-muted-foreground">
          Explore our database of local crops and edible plants native to Kenya. 
          Learn about their nutritional benefits, growing conditions, and pest management.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-10"
            placeholder="Search plants by name..."
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
          <div>
            <label className="text-sm font-medium mb-1 block">Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
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
          
          <div>
            <label className="text-sm font-medium mb-1 block">Climate</label>
            <Select value={selectedClimate} onValueChange={setSelectedClimate}>
              <SelectTrigger>
                <SelectValue placeholder="Select climate" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {climates.map(climate => (
                    <SelectItem key={climate} value={climate}>{climate}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Nutrient</label>
            <Select value={selectedNutrient} onValueChange={setSelectedNutrient}>
              <SelectTrigger>
                <SelectValue placeholder="Select nutrient" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {nutrients.map(nutrient => (
                    <SelectItem key={nutrient} value={nutrient}>{nutrient}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Plants</TabsTrigger>
          <TabsTrigger value="ar">AR Available</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          {filteredPlants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No plants found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="ar" className="mt-4">
          {filteredPlants.filter(p => p.hasArModel).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlants.filter(p => p.hasArModel).map(plant => (
                <PlantCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No plants with AR models found matching your search criteria.</p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="popular" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlants.slice(0, 3).map(plant => (
              <PlantCard key={plant.id} plant={plant} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Plants;
