import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResultsProvider } from "./context/ResultsContext";

// Pages
import Index from "./pages/Index";
import Games from "./pages/Games";
import Results from "./pages/Results";
import Statistics from "./pages/Statistics";
import GameDetail from "./pages/GameDetail";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./components/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ResultsProvider>
      <TooltipProvider>
        {/* Toast Container from react-toastify */}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

        {/* Routing */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/results" element={<Results />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/disclaimer" element={<Disclaimer />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin */}
            <Route path="/admin" element={<Login />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ResultsProvider>
  </QueryClientProvider>
);

export default App;
