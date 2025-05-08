
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, MessageCircle, BarChart3, Users, ShoppingCart, Cloud, FileText, Menu, X, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const MobileNav = () => {
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();
  const [expanded, setExpanded] = useState(false);
  
  const primaryNavItems = [
    {
      label: "Home",
      icon: Home,
      href: "/"
    },
    {
      label: "Plants",
      icon: Leaf,
      href: "/plants"
    },
    {
      label: "Market",
      icon: ShoppingCart,
      href: "/market"
    },
    {
      label: "Weather",
      icon: Cloud,
      href: "/weather"
    },
    {
      label: isAuthenticated ? "Dashboard" : "Community",
      icon: isAuthenticated ? BarChart3 : Users,
      href: isAuthenticated ? "/dashboard" : "/social"
    },
    {
      label: "Notes",
      icon: FileText,
      href: "/farm-notes",
      requiresAuth: true
    }
  ];
  
  const secondaryNavItems = [
    {
      label: "Farm Management",
      icon: Leaf,
      href: "/farm-management",
      requiresAuth: true
    },
    {
      label: "Inventory",
      icon: ShoppingCart,
      href: "/inventory",
      requiresAuth: true
    },
    {
      label: "Messages",
      icon: MessageCircle,
      href: "/messages",
      requiresAuth: true
    },
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      requiresAuth: true
    }
  ];
  
  // Filter out routes that require auth if not authenticated
  const filteredPrimaryNavItems = primaryNavItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  ).slice(0, 5); // Only show 5 items max in mobile nav
  
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-background border-t border-border md:hidden">
        <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${filteredPrimaryNavItems.length}, 1fr)` }}>
          {filteredPrimaryNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center relative",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
                <span className="text-xs mt-1">{item.label}</span>
                
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 mx-auto w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
          
          <Sheet>
            <SheetTrigger asChild>
              <button className="flex flex-col items-center justify-center text-muted-foreground">
                <Menu className="h-5 w-5" />
                <span className="text-xs mt-1">More</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] pb-safe rounded-t-xl">
              <div className="px-2 py-6">
                {isAuthenticated && (
                  <div className="flex items-center mb-6 pb-4 border-b">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage src={user?.profileImage} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">{user?.name || "User"}</h4>
                      <p className="text-sm text-muted-foreground">{user?.email || ""}</p>
                    </div>
                    <Button 
                      variant="ghost"
                      size="icon"
                      className="ml-auto relative"
                    >
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                        3
                      </Badge>
                    </Button>
                  </div>
                )}
                
                <div className="space-y-1">
                  {secondaryNavItems
                    .filter(item => !item.requiresAuth || (item.requiresAuth && isAuthenticated))
                    .map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <SheetClose key={item.href} asChild>
                          <Link
                            to={item.href}
                            className={cn(
                              "flex items-center py-3 px-4 rounded-lg",
                              isActive 
                                ? "bg-primary/10 text-primary" 
                                : "hover:bg-accent text-foreground"
                            )}
                          >
                            <item.icon className="mr-3 h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        </SheetClose>
                      );
                  })}
                </div>
                
                {isAuthenticated ? (
                  <div className="mt-6 pt-4 border-t">
                    <SheetClose asChild>
                      <Button variant="outline" className="w-full" onClick={handleLogout}>
                        Log out
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className="mt-6 pt-4 border-t space-y-2">
                    <SheetClose asChild>
                      <Link to="/login">
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/signup">
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
