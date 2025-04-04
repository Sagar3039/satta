
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResultsProvider } from "./context/ResultsContext";
import Index from "./pages/Index";
import Games from "./pages/Games";
import Results from "./pages/Results";
import Statistics from "./pages/Statistics";
import GameDetail from "./pages/GameDetail";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ResultsProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/results" element={<Results />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ResultsProvider>
  </QueryClientProvider>
);

export default App;
