
import { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="app-container">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      {isMobile && <MobileNav />}
    </div>
  );
};

export default MainLayout;
