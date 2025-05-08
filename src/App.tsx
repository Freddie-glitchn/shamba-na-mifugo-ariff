
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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

// For demo purposes, we'll simulate authentication with a constant
// In a real app, this would come from a context or hook
const isAuthenticated = true; // Set to false to test protected routes redirecting to login

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          
          {/* Auth routes */}
          <Route path="/login" element={<MainLayout><Login /></MainLayout>} />
          <Route path="/signup" element={<MainLayout><Signup /></MainLayout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
