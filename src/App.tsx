
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page imports
import Index from "./pages/Index";
import Points from "./pages/Points";
import Instructions from "./pages/Instructions";
import Draft from "./pages/Draft";
import Auth from "./pages/Auth";
import CreateLeague from "./pages/CreateLeague";
import FindLeagues from "./pages/FindLeagues";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Sitemap from "./pages/Sitemap";

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Public pages */}
          <Route path="/" element={<Index />} />
          <Route path="/points" element={<Points />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/sitemap" element={<Sitemap />} />
          
          {/* Auth pages */}
          <Route path="/auth" element={<Auth />} />
          
          {/* League pages */}
          <Route path="/leagues/create" element={<CreateLeague />} />
          <Route path="/leagues" element={<FindLeagues />} />
          <Route path="/draft" element={<Draft />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
