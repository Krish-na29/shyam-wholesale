
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/pages/Admin";

export const ProductSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState(3);
  const [products, setProducts] = useState<Product[]>([]);
  const { addItem } = useCart();
  const { toast } = useToast();

  // Fetch featured products from Supabase
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching products:', error);
        return;
      }

      // Convert price from string to number if needed
      const formattedData = data?.map(item => ({
        ...item,
        price: Number(item.price),
        mrp: Number(item.mrp)
      })) || [];

      setProducts(formattedData);
    };

    fetchProducts();
  }, []);

  // Adjust display count based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(1);
      } else if (window.innerWidth < 1024) {
        setDisplayCount(2);
      } else {
        setDisplayCount(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + displayCount >= products.length 
        ? 0 
        : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 
        ? Math.max(0, products.length - displayCount) 
        : prevIndex - 1
    );
  };

  const handleAddToCart = (product: Product) => {
    const itemPrice = Number(product.price);
    
    addItem({
      id: product.id,
      name: product.name,
      price: itemPrice,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  // Calculate discount percentage
  const calculateDiscount = (mrp: number, price: number) => {
    if (mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };
  
  // Get visible products based on current index
  const getVisibleProducts = () => {
    return products.slice(currentIndex, currentIndex + displayCount);
  };

  // Get the visible products
  const visibleProducts = getVisibleProducts();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-devotional-maroon">
            Featured Products
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="border-devotional-orange text-devotional-maroon hover:bg-devotional-lightOrange"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="border-devotional-orange text-devotional-maroon hover:bg-devotional-lightOrange"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProducts.map((product) => (
            <div key={product.id} className="card-devotional overflow-hidden">
              <div className="relative h-60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-devotional-orange text-white px-2 py-1 rounded text-xs">
                  {product.category}
                </div>
                {calculateDiscount(product.mrp, product.price) > 0 && (
                  <div className="absolute top-2 left-2 bg-devotional-red text-white px-2 py-1 rounded text-xs">
                    {calculateDiscount(product.mrp, product.price)}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-devotional-maroon mb-2">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <p className="text-devotional-red font-bold">
                      ₹{product.price}
                    </p>
                    {product.mrp > product.price && (
                      <p className="text-gray-500 text-sm line-through">
                        ₹{product.mrp}
                      </p>
                    )}
                  </div>
                  <Button 
                    className="bg-devotional-orange hover:bg-devotional-red text-white"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild className="bg-devotional-maroon hover:bg-devotional-red text-white">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
