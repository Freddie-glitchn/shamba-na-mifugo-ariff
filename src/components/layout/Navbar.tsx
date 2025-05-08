
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, X, User, LogOut, Bell, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Plants",
      href: "/plants"
    },
    {
      label: "Market",
      href: "/market"
    },
    {
      label: "Weather",
      href: "/weather"
    },
    {
      label: "Community",
      href: "/social"
    }
  ];

  const authenticatedNavItems = [
    {
      label: "Dashboard",
      href: "/dashboard"
    },
    {
      label: "Farm Management",
      href: "/farm-management"
    },
    {
      label: "Inventory",
      href: "/inventory"
    },
    {
      label: "Messages",
      href: "/messages"
    }
  ];

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container flex h-14 max-w-6xl items-center">
        <Link to="/" className="flex items-center mr-4">
          <div className="hidden md:flex items-center space-x-2">
            <span className="font-bold text-xl text-farm-green-700">Mifugo Shamba Arifa</span>
          </div>
          <div className="flex md:hidden items-center space-x-2">
            <span className="font-bold text-xl text-farm-green-700">MSA</span>
          </div>
        </Link>

        {!isMobile ? (
          <nav className="flex items-center justify-between flex-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                      Farm Tools <span className="ml-1">▾</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {authenticatedNavItems.map((item) => (
                      <DropdownMenuItem key={item.href} onClick={() => navigate(item.href)}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                          3
                        </Badge>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-auto">
                        <DropdownMenuItem className="cursor-pointer py-4 flex flex-col items-start">
                          <div className="font-medium">New comment on your post</div>
                          <div className="text-sm text-muted-foreground">Mary commented: "They look amazing! Which variety..."</div>
                          <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-4 flex flex-col items-start">
                          <div className="font-medium">Weather Alert</div>
                          <div className="text-sm text-muted-foreground">Expected rainfall in your region in the next 24 hours</div>
                          <div className="text-xs text-muted-foreground mt-1">4 hours ago</div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer py-4 flex flex-col items-start">
                          <div className="font-medium">Upcoming event reminder</div>
                          <div className="text-sm text-muted-foreground">Soil Health Workshop tomorrow at 10:00 AM</div>
                          <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-center font-medium text-primary">
                        View all notifications
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative flex items-center space-x-2" size="sm">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.profileImage} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium hidden sm:inline">{user?.name}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/dashboard')}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" className="mr-2">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        ) : (
          <div className="flex items-center justify-end flex-1">
            {isAuthenticated && (
              <Button variant="ghost" size="icon" className="relative mr-2">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center">
                  3
                </Badge>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        )}
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={cn(
          "fixed inset-x-0 top-14 z-50 w-full bg-background border-b border-border transition-all duration-300 ease-in-out transform md:hidden",
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        )}
      >
        <div className="container py-4 space-y-4">
          {navItems.map((item) => (
            <Link 
              key={item.href}
              to={item.href} 
              className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {isAuthenticated && (
            <>
              <div className="pt-2 border-t border-border" />
              {authenticatedNavItems.map((item) => (
                <Link 
                  key={item.href}
                  to={item.href} 
                  className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border flex items-center px-4 py-2">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={user?.profileImage} />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{user?.name}</h4>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Button>
            </>
          )}
          
          {!isAuthenticated && (
            <div className="pt-2 border-t border-border flex flex-col space-y-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
