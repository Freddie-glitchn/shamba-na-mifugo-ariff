
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const Navbar = () => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <Link to="/plants" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Plants</Link>
              <Link to="/market" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Market</Link>
              <Link to="/weather" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Weather</Link>
              <Link to="/social" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Community</Link>
              <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            </div>
            <div>
              <Link to="/login">
                <Button variant="outline" className="mr-2">Login</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </nav>
        ) : (
          <div className="flex items-center justify-end flex-1">
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
          <Link 
            to="/plants" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Plants
          </Link>
          <Link 
            to="/market" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Market
          </Link>
          <Link 
            to="/weather" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Weather
          </Link>
          <Link 
            to="/social" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Community
          </Link>
          <Link 
            to="/dashboard" 
            className="block px-4 py-2 text-base font-medium hover:bg-accent rounded-md transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <div className="pt-2 border-t border-border flex flex-col space-y-2">
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full">Login</Button>
            </Link>
            <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
