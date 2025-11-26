import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { SplashScreen } from "./components/SplashScreen";
import { useState } from "react";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AdminLogin from "./pages/AdminLogin";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Study from "./pages/Study";
import FunActivities from "./pages/FunActivities";
import Videos from "./pages/Videos";
import LifeSkills from "./pages/LifeSkills";
import CivicSense from "./pages/CivicSense";
import Parents from "./pages/Parents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/tutor-dashboard" element={<TutorDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
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
};

export default App;
