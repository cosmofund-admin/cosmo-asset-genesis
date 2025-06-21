
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/hooks/useLanguage";
import { MetaMaskProvider, useMetaMask } from "@/hooks/useMetaMask";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import CreateAsset from "./pages/CreateAsset";
import Marketplace from "./pages/Marketplace";
import Loans from "./pages/Loans";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useMetaMask();
  
  if (!isConnected) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <MetaMaskProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/create-asset" element={
                <ProtectedRoute>
                  <CreateAsset />
                </ProtectedRoute>
              } />
              <Route path="/marketplace" element={
                <ProtectedRoute>
                  <Marketplace />
                </ProtectedRoute>
              } />
              <Route path="/loans" element={
                <ProtectedRoute>
                  <Loans />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </MetaMaskProvider>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
