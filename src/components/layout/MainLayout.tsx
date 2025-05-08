
import { ReactNode } from 'react';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="app-container min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-4 pb-20 md:pb-8">
        {children}
      </main>
      <Footer />
      {isMobile && <MobileNav />}
    </div>
  );
};

export default MainLayout;
