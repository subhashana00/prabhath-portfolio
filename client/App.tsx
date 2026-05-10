import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/PageTransition";
import BackgroundVectors from "./components/BackgroundVectors";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Freelance from "./pages/Freelance";
import EventBookingCaseStudy from "./pages/EventBookingCaseStudy";
import GymFitnessCaseStudy from "./pages/GymFitnessCaseStudy";
import AeroSyncCaseStudy from "./pages/AeroSyncCaseStudy";
import NovaMindCaseStudy from "./pages/NovaMindCaseStudy";
import NotFound from "./pages/NotFound";

// Development console improvements
if (import.meta.env.DEV) {
  // Suppress specific development warnings that aren't actionable
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    const message = args.join(' ');
    
    // Filter out common development warnings that don't affect functionality
    if (
      message.includes('Images loaded lazily and replaced with placeholders') ||
      message.includes('Tracking Prevention blocked access to storage') ||
      message.includes('React DevTools') ||
      message.includes('Download the React DevTools') ||
      message.includes('fetchPriority') ||
      message.includes('fetchpriority')
    ) {
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  // Development mode active
  console.log('%c🚀 Portfolio Development Mode', 'color: #007BFF; font-weight: bold;');
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors except 408, 429
        if (error instanceof Error && 'status' in error) {
          const status = (error as any).status;
          if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
            return false;
          }
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/freelance" element={<PageTransition><Freelance /></PageTransition>} />
        <Route path="/projects/event-booking-management-dashboard" element={<PageTransition><EventBookingCaseStudy /></PageTransition>} />
        <Route path="/projects/gym-fitness-app" element={<PageTransition><GymFitnessCaseStudy /></PageTransition>} />
        <Route path="/projects/aerosync-b2b-gateway" element={<PageTransition><AeroSyncCaseStudy /></PageTransition>} />
        <Route path="/projects/novamind-ai-landingpage" element={<PageTransition><NovaMindCaseStudy /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(true);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <SmoothScroll>
            <div className={`transition-all duration-500 relative min-h-screen ${
              isLoadingComplete ? 'opacity-100' : 'opacity-0'
            }`}>
              <BackgroundVectors />
              <BrowserRouter
                basename="/prabhath-portfolio"
                future={{
                  v7_startTransition: true,
                  v7_relativeSplatPath: true,
                }}
              >
                <AnimatedRoutes />
              </BrowserRouter>
            </div>
          </SmoothScroll>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

createRoot(document.getElementById("root")!).render(<App />);

