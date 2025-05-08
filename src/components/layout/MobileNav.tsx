
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, MessageCircle, BarChart3, Users, ShoppingCart, Cloud, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

const MobileNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  const navItems = [
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
  
  // Filter out routes that require auth if not authenticated
  const filteredNavItems = navItems.filter(item => 
    !item.requiresAuth || (item.requiresAuth && isAuthenticated)
  ).slice(0, 5); // Only show 5 items max in mobile nav
  
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full" style={{ gridTemplateColumns: `repeat(${filteredNavItems.length}, 1fr)` }}>
        {filteredNavItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", isActive && "text-primary")} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
