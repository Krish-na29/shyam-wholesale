import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { items } = useCart();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart');
  };

  return (
    <header className="bg-devotional-cream border-b border-devotional-orange/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <img
              src="/lovable-uploads/4ba42bde-6d68-4a1a-b428-2d907b885764.png"
              alt="Shyam Mart Logo"
              width={40}
              height={46}
              className="h-12 w-auto object-contain"
              style={{ maxWidth: 48, maxHeight: 56 }}
            />
            <div className="ml-2">
              <h1 className="text-2xl font-bold text-devotional-maroon">
                Shyam <span className="text-devotional-orange">Mart</span>
              </h1>
              <p className="text-xs text-devotional-maroon/70">पूजा वस्त्र एवं श्रंगार</p>
            </div>
          </Link>

          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="text-devotional-maroon hover:text-devotional-orange transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-devotional-maroon hover:text-devotional-orange transition-colors">
              Vastra Collection
            </Link>
            <Link to="/about" className="text-devotional-maroon hover:text-devotional-orange transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-devotional-maroon hover:text-devotional-orange transition-colors">
              Contact
            </Link>
            <Link to="/aarti" className="text-devotional-maroon hover:text-devotional-orange transition-colors">
              Aarti Sangrah
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-devotional-maroon hover:text-devotional-orange"
              onClick={handleCartClick}
              aria-label="Go to Cart"
            >
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-devotional-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Button>

            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-devotional-maroon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="h-6 w-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
                />
              </svg>
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 animate-devotional-fade">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-devotional-maroon hover:text-devotional-orange transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/shop" 
                className="text-devotional-maroon hover:text-devotional-orange transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Vastra Collection
              </Link>
              <Link 
                to="/about" 
                className="text-devotional-maroon hover:text-devotional-orange transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/contact" 
                className="text-devotional-maroon hover:text-devotional-orange transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/aarti" 
                className="text-devotional-maroon hover:text-devotional-orange transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Aarti Sangrah
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
