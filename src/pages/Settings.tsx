
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { User, Bell, Shield, Globe, Moon, Sun, Smartphone, Cloud, Lock } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    weather: true,
    marketPrices: false,
    system: true,
  });

  // Mock profile data
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "+1234567890",
    bio: "I am a passionate farmer focusing on sustainable agriculture practices. I manage a mixed farm with crops and livestock.",
    location: "Kiambu County, Kenya",
    farmSize: "7.5",
    farmUnit: "acres",
  });

  const handleProfileUpdate = () => {
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });
    }, 500);
  };

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification preference updated",
      description: `${key.charAt(0).toUpperCase() + key.slice(1)} notifications ${!notifications[key] ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleAppearanceToggle = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would trigger a theme change
    toast({
      title: "Appearance updated",
      description: `${!isDarkMode ? 'Dark' : 'Light'} mode enabled.`,
    });
  };

  return (
    <div className="page-container">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid md:grid-cols-4 grid-cols-2 gap-2 h-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2 py-3">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex items-center gap-2 py-3">
            <Sun className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2 py-3">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and how it appears on your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback className="text-2xl">{profileData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2 flex-1">
                  <h3 className="font-medium text-lg">{profileData.name}</h3>
                  <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Change Photo</Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">Remove</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={profileData.name} 
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={profileData.email} 
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={profileData.phone} 
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={profileData.location} 
                    onChange={(e) => setProfileData({...profileData, location: e.target.value})} 
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    value={profileData.bio} 
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={3}
                    placeholder="Tell us about yourself and your farm..."
                    className="resize-none"
                  />
                </div>
              </div>

              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Farm Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Farm Size</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="farmSize" 
                        type="number"
                        value={profileData.farmSize} 
                        onChange={(e) => setProfileData({...profileData, farmSize: e.target.value})} 
                        className="flex-1"
                      />
                      <select 
                        className="bg-background border rounded-md p-2 text-sm"
                        value={profileData.farmUnit}
                        onChange={(e) => setProfileData({...profileData, farmUnit: e.target.value})}
                      >
                        <option value="acres">Acres</option>
                        <option value="hectares">Hectares</option>
                        <option value="sq-meters">Square Meters</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProfileUpdate}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Decide what notifications you want to receive and how
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Communication</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={notifications.email}
                    onCheckedChange={() => handleNotificationToggle('email')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications on your devices</p>
                  </div>
                  <Switch 
                    checked={notifications.push}
                    onCheckedChange={() => handleNotificationToggle('push')}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Alerts & Updates</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weather Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important weather updates affecting your farm</p>
                  </div>
                  <Switch 
                    checked={notifications.weather}
                    onCheckedChange={() => handleNotificationToggle('weather')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Market Price Updates</Label>
                    <p className="text-sm text-muted-foreground">Stay informed about crop and livestock market prices</p>
                  </div>
                  <Switch 
                    checked={notifications.marketPrices}
                    onCheckedChange={() => handleNotificationToggle('marketPrices')}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">System Notifications</Label>
                    <p className="text-sm text-muted-foreground">Important updates about your account and the platform</p>
                  </div>
                  <Switch 
                    checked={notifications.system}
                    onCheckedChange={() => handleNotificationToggle('system')}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks on your devices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Theme</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">Switch between light and dark themes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sun className="h-4 w-4" />
                    <Switch 
                      checked={isDarkMode}
                      onCheckedChange={handleAppearanceToggle}
                    />
                    <Moon className="h-4 w-4" />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-base">Language</Label>
                  <p className="text-sm text-muted-foreground mb-2">Select your preferred language</p>
                  <select className="w-full bg-background border rounded-md p-2 text-sm">
                    <option value="en">English</option>
                    <option value="sw">Swahili</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label className="text-base">Time Zone</Label>
                  <p className="text-sm text-muted-foreground mb-2">Set your local time zone</p>
                  <select className="w-full bg-background border rounded-md p-2 text-sm">
                    <option value="UTC+3">East Africa Time (UTC+3)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                    <option value="UTC+0">Greenwich Mean Time (UTC+0)</option>
                    <option value="UTC-5">Eastern Standard Time (UTC-5)</option>
                  </select>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Display</h3>
                
                <div className="space-y-2">
                  <Label className="text-base">Unit System</Label>
                  <p className="text-sm text-muted-foreground mb-2">Choose your preferred measurement system</p>
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <input type="radio" id="metric" name="unit-system" className="mr-2" defaultChecked />
                      <Label htmlFor="metric">Metric (°C, km, kg)</Label>
                    </div>
                    <div className="flex items-center">
                      <input type="radio" id="imperial" name="unit-system" className="mr-2" />
                      <Label htmlFor="imperial">Imperial (°F, mi, lb)</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your account security and login preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-base font-medium">Password</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                
                <Button>Update Password</Button>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium">Two-Factor Authentication</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-base font-medium text-destructive">Danger Zone</h3>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Delete Account</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data</p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
