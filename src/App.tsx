import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Points from "./pages/Points";
import Instructions from "./pages/Instructions";
import Draft from "./pages/Draft";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import CreateLeague from "./pages/CreateLeague";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/points" element={<Points />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/account" element={<Account />} />
          <Route path="/leagues/create" element={<CreateLeague />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;