
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Plants from "./pages/Plants";
import Market from "./pages/Market";
import Weather from "./pages/Weather";
import Social from "./pages/Social";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";
import FarmManagement from "./pages/FarmManagement";
import Inventory from "./pages/Inventory";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<MainLayout><Index /></MainLayout>} />
      <Route path="/plants" element={<MainLayout><Plants /></MainLayout>} />
      <Route path="/market" element={<MainLayout><Market /></MainLayout>} />
      <Route path="/weather" element={<MainLayout><Weather /></MainLayout>} />
      <Route path="/social" element={<MainLayout><Social /></MainLayout>} />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <MainLayout>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoute>
          </MainLayout>
        } 
      />
      <Route 
        path="/messages" 
        element={
          <MainLayout>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Messages />
            </ProtectedRoute>
          </MainLayout>
        } 
      />
      <Route 
        path="/farm-management" 
        element={
          <MainLayout>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <FarmManagement />
            </ProtectedRoute>
          </MainLayout>
        } 
      />
      <Route 
        path="/inventory" 
        element={
          <MainLayout>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Inventory />
            </ProtectedRoute>
          </MainLayout>
        } 
      />
      
      {/* Auth routes */}
      <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
