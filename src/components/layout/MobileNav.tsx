
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, MessageCircle, BarChart3, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const location = useLocation();
  
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
      label: "Community",
      icon: Users,
      href: "/social"
    },
    {
      label: "Messages",
      icon: MessageCircle,
      href: "/messages"
    },
    {
      label: "Dashboard",
      icon: BarChart3,
      href: "/dashboard"
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 z-40 w-full h-16 bg-background border-t border-border md:hidden">
      <div className="grid h-full grid-cols-5">
        {navItems.map((item) => {
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
