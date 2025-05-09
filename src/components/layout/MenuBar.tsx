
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { 
  Home, 
  Leaf, 
  ShoppingCart, 
  Cloud, 
  BarChart3, 
  Users, 
  MessageSquare,
  Settings, 
  FileText, 
  LogOut,
  User,
  HelpCircle,
  Info
} from 'lucide-react';

const MenuBar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const handleNavigate = (path: string) => {
    navigate(path);
  };
  
  return (
    <Menubar className="border-none bg-transparent">
      <MenubarMenu>
        <MenubarTrigger className="font-medium text-muted-foreground">Navigation</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => handleNavigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/plants')}>
            <Leaf className="mr-2 h-4 w-4" />
            Plants
            <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/market')}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Market
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/weather')}>
            <Cloud className="mr-2 h-4 w-4" />
            Weather
          </MenubarItem>
          <MenubarItem onClick={() => handleNavigate('/social')}>
            <Users className="mr-2 h-4 w-4" />
            Community
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      {isAuthenticated && (
        <MenubarMenu>
          <MenubarTrigger className="font-medium text-muted-foreground">Farm Tools</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleNavigate('/dashboard')}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Dashboard
              <MenubarShortcut>⌘D</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigate('/farm-management')}>
              <Leaf className="mr-2 h-4 w-4" />
              Farm Management
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigate('/farm-notes')}>
              <FileText className="mr-2 h-4 w-4" />
              Farm Notes
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigate('/inventory')}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Inventory
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => handleNavigate('/messages')}>
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
              <MenubarShortcut>⌘M</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}
      
      <MenubarMenu>
        <MenubarTrigger className="font-medium text-muted-foreground">Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <HelpCircle className="mr-2 h-4 w-4" />
            Documentation
          </MenubarItem>
          <MenubarItem>
            <Info className="mr-2 h-4 w-4" />
            About
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      
      {isAuthenticated && (
        <MenubarMenu>
          <MenubarTrigger className="font-medium text-muted-foreground">Account</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={() => handleNavigate('/settings')}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </MenubarItem>
            <MenubarItem onClick={() => handleNavigate('/settings')}>
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      )}
    </Menubar>
  );
};

export default MenuBar;
