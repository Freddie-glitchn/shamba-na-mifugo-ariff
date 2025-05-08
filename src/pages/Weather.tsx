
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CloudSun, 
  CloudRain, 
  Droplets, 
  Wind, 
  Thermometer, 
  Calendar, 
  CloudLightning, 
  Sun, 
  Cloud 
} from "lucide-react";

// Mock weather data
const regions = [
  "Nairobi",
  "Mombasa",
  "Kisumu",
  "Nakuru",
  "Eldoret",
  "Nyeri",
  "Machakos"
];

const currentWeather = {
  Nairobi: {
    temperature: 22,
    condition: "Partly Cloudy",
    icon: CloudSun,
    humidity: 65,
    windSpeed: 12,
    rainfall: 0,
    alerts: []
  },
  Mombasa: {
    temperature: 29,
    condition: "Sunny",
    icon: Sun,
    humidity: 78,
    windSpeed: 15,
    rainfall: 0,
    alerts: []
  },
  Kisumu: {
    temperature: 27,
    condition: "Cloudy",
    icon: Cloud,
    humidity: 70,
    windSpeed: 8,
    rainfall: 20,
    alerts: [{ type: "rain", message: "Moderate rainfall expected" }]
  },
  Nakuru: {
    temperature: 20,
    condition: "Light Rain",
    icon: CloudRain,
    humidity: 75,
    windSpeed: 10,
    rainfall: 15,
    alerts: [{ type: "rain", message: "Light rainfall expected" }]
  },
  Eldoret: {
    temperature: 19,
    condition: "Thunderstorm",
    icon: CloudLightning,
    humidity: 80,
    windSpeed: 18,
    rainfall: 35,
    alerts: [
      { type: "severe", message: "Thunderstorms with possible flooding" },
      { type: "wind", message: "Strong winds up to 18 km/h" }
    ]
  },
  Nyeri: {
    temperature: 21,
    condition: "Cloudy",
    icon: Cloud,
    humidity: 60,
    windSpeed: 5,
    rainfall: 0,
    alerts: []
  },
  Machakos: {
    temperature: 24,
    condition: "Sunny",
    icon: Sun,
    humidity: 55,
    windSpeed: 7,
    rainfall: 0,
    alerts: []
  }
};

const forecast = {
  Nairobi: [
    { day: "Today", temp: 22, condition: "Partly Cloudy", icon: CloudSun, rainfall: 0 },
    { day: "Tomorrow", temp: 23, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Wed", temp: 22, condition: "Partly Cloudy", icon: CloudSun, rainfall: 0 },
    { day: "Thu", temp: 21, condition: "Light Rain", icon: CloudRain, rainfall: 10 },
    { day: "Fri", temp: 20, condition: "Rain", icon: CloudRain, rainfall: 25 },
    { day: "Sat", temp: 21, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sun", temp: 22, condition: "Sunny", icon: Sun, rainfall: 0 },
  ],
  Mombasa: [
    { day: "Today", temp: 29, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Tomorrow", temp: 30, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Wed", temp: 30, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Thu", temp: 29, condition: "Partly Cloudy", icon: CloudSun, rainfall: 0 },
    { day: "Fri", temp: 29, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sat", temp: 28, condition: "Light Rain", icon: CloudRain, rainfall: 15 },
    { day: "Sun", temp: 28, condition: "Light Rain", icon: CloudRain, rainfall: 20 },
  ],
  Kisumu: [
    { day: "Today", temp: 27, condition: "Cloudy", icon: Cloud, rainfall: 20 },
    { day: "Tomorrow", temp: 26, condition: "Light Rain", icon: CloudRain, rainfall: 30 },
    { day: "Wed", temp: 25, condition: "Rain", icon: CloudRain, rainfall: 40 },
    { day: "Thu", temp: 25, condition: "Light Rain", icon: CloudRain, rainfall: 25 },
    { day: "Fri", temp: 26, condition: "Partly Cloudy", icon: CloudSun, rainfall: 10 },
    { day: "Sat", temp: 27, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sun", temp: 28, condition: "Sunny", icon: Sun, rainfall: 0 },
  ],
  Nakuru: [
    { day: "Today", temp: 20, condition: "Light Rain", icon: CloudRain, rainfall: 15 },
    { day: "Tomorrow", temp: 19, condition: "Rain", icon: CloudRain, rainfall: 30 },
    { day: "Wed", temp: 18, condition: "Heavy Rain", icon: CloudRain, rainfall: 45 },
    { day: "Thu", temp: 19, condition: "Light Rain", icon: CloudRain, rainfall: 20 },
    { day: "Fri", temp: 20, condition: "Partly Cloudy", icon: CloudSun, rainfall: 10 },
    { day: "Sat", temp: 21, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sun", temp: 21, condition: "Cloudy", icon: Cloud, rainfall: 10 },
  ],
  Eldoret: [
    { day: "Today", temp: 19, condition: "Thunderstorm", icon: CloudLightning, rainfall: 35 },
    { day: "Tomorrow", temp: 18, condition: "Heavy Rain", icon: CloudRain, rainfall: 40 },
    { day: "Wed", temp: 18, condition: "Rain", icon: CloudRain, rainfall: 30 },
    { day: "Thu", temp: 19, condition: "Light Rain", icon: CloudRain, rainfall: 20 },
    { day: "Fri", temp: 20, condition: "Cloudy", icon: Cloud, rainfall: 10 },
    { day: "Sat", temp: 20, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sun", temp: 19, condition: "Cloudy", icon: Cloud, rainfall: 15 },
  ],
  Nyeri: [
    { day: "Today", temp: 21, condition: "Cloudy", icon: Cloud, rainfall: 0 },
    { day: "Tomorrow", temp: 22, condition: "Partly Cloudy", icon: CloudSun, rainfall: 0 },
    { day: "Wed", temp: 22, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Thu", temp: 21, condition: "Light Rain", icon: CloudRain, rainfall: 15 },
    { day: "Fri", temp: 20, condition: "Light Rain", icon: CloudRain, rainfall: 20 },
    { day: "Sat", temp: 21, condition: "Cloudy", icon: Cloud, rainfall: 10 },
    { day: "Sun", temp: 22, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
  ],
  Machakos: [
    { day: "Today", temp: 24, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Tomorrow", temp: 25, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Wed", temp: 25, condition: "Sunny", icon: Sun, rainfall: 0 },
    { day: "Thu", temp: 24, condition: "Partly Cloudy", icon: CloudSun, rainfall: 0 },
    { day: "Fri", temp: 23, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
    { day: "Sat", temp: 22, condition: "Cloudy", icon: Cloud, rainfall: 10 },
    { day: "Sun", temp: 23, condition: "Partly Cloudy", icon: CloudSun, rainfall: 5 },
  ]
};

const farmingTips = [
  {
    condition: "Sunny",
    tips: [
      "Consider providing shade for sensitive crops",
      "Increase watering frequency to prevent wilting",
      "Early morning or evening is best for any field work",
      "Monitor soil moisture levels to prevent drying"
    ]
  },
  {
    condition: "Rainy",
    tips: [
      "Ensure proper drainage to prevent waterlogging",
      "Delay pesticide or fertilizer application",
      "Monitor for signs of diseases that thrive in wet conditions",
      "Protect harvested crops from moisture"
    ]
  },
  {
    condition: "Cloudy",
    tips: [
      "Good conditions for transplanting seedlings",
      "Reduced evaporation means less watering needed",
      "Suitable time for applying foliar sprays",
      "Good day for field work that would be difficult in heat"
    ]
  },
  {
    condition: "Thunderstorm",
    tips: [
      "Secure livestock in sheltered areas",
      "Ensure farm equipment is protected",
      "Stay indoors during lightning",
      "Check for crop damage after the storm passes"
    ]
  }
];

// Helper function to get tips based on weather condition
const getTipsForCondition = (condition: string) => {
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes("rain") || lowerCondition.includes("thunderstorm")) {
    return farmingTips.find(tip => tip.condition === "Rainy")?.tips || [];
  } else if (lowerCondition.includes("sunny")) {
    return farmingTips.find(tip => tip.condition === "Sunny")?.tips || [];
  } else if (lowerCondition.includes("cloud")) {
    return farmingTips.find(tip => tip.condition === "Cloudy")?.tips || [];
  } else if (lowerCondition.includes("thunderstorm")) {
    return farmingTips.find(tip => tip.condition === "Thunderstorm")?.tips || [];
  }
  return farmingTips.find(tip => tip.condition === "Cloudy")?.tips || [];
};

const Weather = () => {
  const [selectedRegion, setSelectedRegion] = useState("Nairobi");
  const weather = currentWeather[selectedRegion as keyof typeof currentWeather];
  const forecastData = forecast[selectedRegion as keyof typeof forecast];
  const tips = getTipsForCondition(weather.condition);
  
  const getAlertVariant = (type: string) => {
    switch (type) {
      case "severe":
        return "destructive";
      case "rain":
        return "default";
      case "wind":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-green-800 mb-2">Weather Information</h1>
        <p className="text-muted-foreground">
          Get up-to-date weather data and forecasts to plan your farming activities effectively.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start">
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full md:w-[200px]">
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
        
        <Button variant="outline" className="w-full md:w-auto">
          <Calendar className="mr-2 h-4 w-4" /> Crop Calendar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl flex items-center">
              Current Weather in {selectedRegion}
            </CardTitle>
            <CardDescription>Last updated: Today, 8:00 AM</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between">
              <div className="flex flex-col items-center mb-4 md:mb-0">
                <weather.icon className="h-16 w-16 text-kenyan-sky-500 mb-2" />
                <h3 className="text-4xl font-bold mb-1">{weather.temperature}°C</h3>
                <p className="text-muted-foreground">{weather.condition}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
                <div className="flex flex-col items-center">
                  <Droplets className="h-5 w-5 text-kenyan-sky-500 mb-1" />
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{weather.humidity}%</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <Wind className="h-5 w-5 text-kenyan-sky-500 mb-1" />
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-semibold">{weather.windSpeed} km/h</p>
                </div>
                
                <div className="flex flex-col items-center">
                  <CloudRain className="h-5 w-5 text-kenyan-sky-500 mb-1" />
                  <p className="text-sm text-muted-foreground">Rainfall</p>
                  <p className="font-semibold">{weather.rainfall} mm</p>
                </div>
              </div>
            </div>
            
            {weather.alerts.length > 0 && (
              <div className="mt-6 border-t pt-4">
                <h4 className="text-sm font-semibold mb-2">Weather Alerts:</h4>
                <div className="flex flex-wrap gap-2">
                  {weather.alerts.map((alert, index) => (
                    <Badge key={index} variant={getAlertVariant(alert.type)} className="py-1 px-3">
                      {alert.message}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Farming Tips</CardTitle>
            <CardDescription>Based on current weather</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-farm-green-100 text-farm-green-800 rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm">{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">7-Day Forecast</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {forecastData.map((day, index) => (
            <Card key={index} className={`${index === 0 ? 'bg-accent/50' : ''}`}>
              <CardContent className="p-4 text-center">
                <p className="font-semibold mb-2">{day.day}</p>
                <day.icon className="h-8 w-8 mx-auto mb-2 text-kenyan-sky-500" />
                <p className="text-lg font-semibold mb-1">{day.temp}°C</p>
                <p className="text-xs text-muted-foreground mb-2">{day.condition}</p>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-muted-foreground">Rainfall</p>
                  <div className="w-full mt-1">
                    <Progress value={day.rainfall * 2} max={100} className="h-1" />
                  </div>
                  <p className="text-xs mt-1">{day.rainfall} mm</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <Tabs defaultValue="rainfall">
          <TabsList className="mb-4">
            <TabsTrigger value="rainfall">Rainfall Map</TabsTrigger>
            <TabsTrigger value="temperature">Temperature Map</TabsTrigger>
            <TabsTrigger value="forecast">Seasonal Forecast</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rainfall">
            <Card>
              <CardHeader>
                <CardTitle>Rainfall Distribution Map</CardTitle>
                <CardDescription>Current rainfall patterns across Kenya</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <CloudRain className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Rainfall map visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="temperature">
            <Card>
              <CardHeader>
                <CardTitle>Temperature Map</CardTitle>
                <CardDescription>Current temperature patterns across Kenya</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <Thermometer className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Temperature map visualization will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="forecast">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Forecast</CardTitle>
                <CardDescription>Long-term weather predictions for planning</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Seasonal forecast data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Weather;
