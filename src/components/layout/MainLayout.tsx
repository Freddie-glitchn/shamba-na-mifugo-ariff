
import { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  const location = useLocation();
  
  // Check if the current route is a full-screen route like login or signup
  const isFullScreenPage = ['/login', '/signup'].includes(location.pathname);
  
  // Adjust padding based on whether it's a full-screen page
  const contentPadding = isFullScreenPage ? 'pb-16 md:pb-0' : 'pt-4 pb-20 md:pb-8';
  
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Navbar />
      <main className={cn("flex-grow", contentPadding)}>
        <div className={cn(
          "mx-auto", 
          !isFullScreenPage && "container max-w-6xl px-4"
        )}>
          {children}
        </div>
      </main>
      <Footer />
      {isMobile && <MobileNav />}
    </div>
  );
};

export default MainLayout;
