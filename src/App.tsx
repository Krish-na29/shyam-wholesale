import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Aarti from "./pages/Aarti";
import NotFound from "./pages/NotFound";
import { CartProvider } from "./contexts/CartContext";
import CartPage from "./pages/Cart";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

// Component to track page views
function RouteTracker() {
  const location = useLocation();
  
  useEffect(() => {
    // Send pageview with updated location
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
  
  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <Router>
            {/* RouteTracker must be inside Router to use useLocation */}
            <RouteTracker />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/aarti" element={<Aarti />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
