
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Cloud, CloudRain, Droplets, Sun, Wind, Thermometer, 
  CloudLightning, Umbrella, Calendar, MapPin, AlertTriangle 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock weather data
const weatherData = {
  current: {
    location: "Nairobi, Kenya",
    date: "Thu, 8 May 2025",
    temperature: 23,
    humidity: 65,
    description: "Partly Cloudy",
    windSpeed: 12,
    rainChance: 20,
    uv: 6,
    icon: "cloud",
  },
  forecast: [
    { day: "Today", temp: 23, icon: "cloud", description: "Partly Cloudy", rainChance: 20 },
    { day: "Fri", temp: 25, icon: "sun", description: "Sunny", rainChance: 0 },
    { day: "Sat", temp: 24, icon: "cloud-sun", description: "Mostly Sunny", rainChance: 10 },
    { day: "Sun", temp: 22, icon: "cloud-rain", description: "Light Rain", rainChance: 60 },
    { day: "Mon", temp: 21, icon: "cloud-rain", description: "Scattered Showers", rainChance: 70 },
    { day: "Tue", temp: 20, icon: "cloud", description: "Overcast", rainChance: 30 },
    { day: "Wed", temp: 22, icon: "sun", description: "Sunny", rainChance: 0 },
  ],
  farmingAdvice: {
    general: "Current conditions are suitable for outdoor farm activities. Light rain expected on Sunday may help with irrigation needs.",
    crops: [
      { name: "Maize", advice: "Good conditions for growth. Consider scheduling fertilizer application before Friday for best results." },
      { name: "Beans", advice: "Ideal planting conditions. Expected rainfall on Sunday will support germination." },
      { name: "Tomatoes", advice: "Maintain regular watering schedule. Watch for increased humidity which may contribute to fungal diseases." }
    ],
    warnings: [
      { level: "moderate", message: "Potential for heavy rainfall on Sunday evening through Monday morning." },
    ]
  }
};

const locations = [
  { name: "Nairobi", county: "Nairobi" },
  { name: "Mombasa", county: "Mombasa" },
  { name: "Kisumu", county: "Kisumu" },
  { name: "Nakuru", county: "Nakuru" },
  { name: "Eldoret", county: "Uasin Gishu" },
  { name: "Thika", county: "Kiambu" },
  { name: "Nyeri", county: "Nyeri" },
  { name: "Machakos", county: "Machakos" },
];

type WeatherIcon = "sun" | "cloud" | "cloud-sun" | "cloud-rain" | "cloud-lightning";

const WeatherIcon = ({ icon, size = 24 }: { icon: WeatherIcon, size?: number }) => {
  switch (icon) {
    case "sun":
      return <Sun size={size} className="text-yellow-500" />;
    case "cloud":
      return <Cloud size={size} className="text-gray-500" />;
    case "cloud-sun":
      return <Sun size={size} className="text-yellow-500" />;
    case "cloud-rain":
      return <CloudRain size={size} className="text-blue-500" />;
    case "cloud-lightning":
      return <CloudLightning size={size} className="text-purple-500" />;
    default:
      return <Cloud size={size} className="text-gray-500" />;
  }
};

const Weather = () => {
  const [selectedLocation, setSelectedLocation] = useState("Nairobi");
  const [userLocation, setUserLocation] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Simulate geolocation
    setTimeout(() => {
      setUserLocation("Nairobi, Kenya");
      toast({
        title: "Location detected",
        description: "Using your current location: Nairobi, Kenya",
      });
    }, 1500);
  }, [toast]);

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Weather & Climate Information</h1>
        <p className="text-muted-foreground">
          Access real-time weather data, forecasts, and agricultural weather advisories.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden h-full">
            <CardHeader className="bg-gradient-to-r from-farm-green-600/90 to-farm-green-700/90 text-white pb-12">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    {weatherData.current.location}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-base mt-1">
                    {weatherData.current.date}
                  </CardDescription>
                </div>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[180px] bg-white/20 border-white/20 text-white">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc.name} value={loc.name}>
                        {loc.name}, {loc.county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <div className="relative -mt-10">
              <div className="flex items-center justify-between p-6 bg-white rounded-t-xl mx-4 shadow-lg">
                <div className="flex items-center gap-4">
                  <WeatherIcon icon={weatherData.current.icon as WeatherIcon} size={64} />
                  <div>
                    <div className="text-4xl font-bold">{weatherData.current.temperature}°C</div>
                    <div className="text-muted-foreground">{weatherData.current.description}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <span>Humidity: {weatherData.current.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-gray-500" />
                    <span>Wind: {weatherData.current.windSpeed} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Umbrella className="h-5 w-5 text-blue-400" />
                    <span>Rain: {weatherData.current.rainChance}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-orange-400" />
                    <span>UV Index: {weatherData.current.uv} (High)</span>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="pt-4 pb-0">
              <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
              <div className="grid grid-cols-7 gap-2">
                {weatherData.forecast.map((day, index) => (
                  <div key={index} className="flex flex-col items-center p-2 rounded-lg hover:bg-muted transition-colors">
                    <span className="font-medium text-sm">{day.day}</span>
                    <WeatherIcon icon={day.icon as WeatherIcon} size={28} />
                    <span className="font-bold mt-1">{day.temp}°</span>
                    <span className="text-xs text-muted-foreground">{day.rainChance}%</span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-between pt-4">
              <div className="text-xs text-muted-foreground">
                <Calendar className="inline mr-1 h-3 w-3" /> Last updated: 10:30 AM
              </div>
              <Button variant="ghost" size="sm">View Full Forecast</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                Weather Alerts & Advisories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weatherData.farmingAdvice.warnings.map((warning, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-md ${
                    warning.level === 'high' 
                      ? 'bg-red-100 border-l-4 border-red-500' 
                      : warning.level === 'moderate'
                        ? 'bg-amber-100 border-l-4 border-amber-500'
                        : 'bg-blue-100 border-l-4 border-blue-500'
                  }`}
                >
                  <p className="text-sm">
                    {warning.message}
                  </p>
                </div>
              ))}

              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-medium mb-2">General Farming Advice</h4>
                <p className="text-sm text-muted-foreground">
                  {weatherData.farmingAdvice.general}
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-2">Crop-Specific Advice</h4>
                <div className="space-y-3">
                  {weatherData.farmingAdvice.crops.map((crop, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-medium">{crop.name}: </span>
                      <span className="text-muted-foreground">{crop.advice}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Set Weather Alerts</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="rainfall" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
            <TabsTrigger value="rainfall">Rainfall</TabsTrigger>
            <TabsTrigger value="temperature">Temperature</TabsTrigger>
            <TabsTrigger value="humidity">Humidity</TabsTrigger>
          </TabsList>
          <TabsContent value="rainfall" className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Monthly Rainfall Patterns</h3>
            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Rainfall chart will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="temperature" className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Temperature Trends</h3>
            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Temperature chart will be displayed here</p>
            </div>
          </TabsContent>
          <TabsContent value="humidity" className="p-4 bg-white rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Humidity Levels</h3>
            <div className="h-64 bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Humidity chart will be displayed here</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weather-Based Planting Calendar</CardTitle>
          <CardDescription>Optimal planting times based on local climate data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Short Rains Season (Oct-Dec)</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Beans - Early October</li>
                <li>Maize - Mid October</li>
                <li>Kale - Throughout season</li>
                <li>Tomatoes - Early November</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Long Rains Season (Mar-May)</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Maize - Early March</li>
                <li>Beans - Mid March</li>
                <li>Sweet Potatoes - Late March</li>
                <li>Cassava - Early April</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Dry Season (Jun-Sep)</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Drought resistant crops</li>
                <li>Sorghum - Early June</li>
                <li>Millet - Mid June</li>
                <li>Cowpeas - July</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;
