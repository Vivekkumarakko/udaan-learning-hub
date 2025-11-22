import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Study from "./pages/Study";
import FunActivities from "./pages/FunActivities";
import Videos from "./pages/Videos";
import LifeSkills from "./pages/LifeSkills";
import CivicSense from "./pages/CivicSense";
import Parents from "./pages/Parents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study" element={<Study />} />
            <Route path="/fun" element={<FunActivities />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/life-skills" element={<LifeSkills />} />
            <Route path="/civic-sense" element={<CivicSense />} />
            <Route path="/parents" element={<Parents />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
