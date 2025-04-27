
import { Layout } from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "./Admin";

const Shop = () => {
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const location = useLocation();
  const { addItem, customerPhone, setCustomerPhone } = useCart();
  const { toast } = useToast();
  const [showPhonePrompt, setShowPhonePrompt] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const fetchProducts = async () => {
    let query = supabase.from('products').select('*');
    
    if (selectedCategory) {
      query = query.eq('category', selectedCategory);
    }
    
    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive"
      });
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

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  useEffect(() => {
    // Get category from URL query parameter
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
  }, [location.search]);

  const categoryNames = {
    "krishna": "Krishna Ji ke Vastra",
    "ganpati": "Ganpati Ji ke Vastra",
    "shiv": "Shiv Ji & Other Devta Vastra",
    "accessories": "Chunni, Pagdi, Mala",
    "festival": "Special Festival Collections"
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product: Product) => {
    // Ensure product price and mrp are numbers
    const validatedProduct = {
      ...product,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      mrp: typeof product.mrp === 'string' ? parseFloat(product.mrp) : product.mrp
    };

    if (!customerPhone) {
      // Store the product to be added after phone number is provided
      sessionStorage.setItem('pendingProduct', JSON.stringify(validatedProduct));
      setShowPhonePrompt(true);
      return;
    }

    // Use addItem from CartContext
    // Ensure price is a number when adding to cart
    addItem({
      id: validatedProduct.id,
      name: validatedProduct.name,
      // Force price to be a number to satisfy typing
      price: Number(validatedProduct.price),
      image: validatedProduct.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${validatedProduct.name} has been added to your cart.`
    });
  };

  // Handle phone submission
  const handlePhoneSubmit = async () => {
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    setCustomerPhone(phoneNumber);
    setShowPhonePrompt(false);

    // Check if the phone number already exists before inserting
    try {
      // First, check if the phone number already exists
      const { data, error: checkError } = await supabase
        .from('customer_phones' as any)
        .select('*')
        .eq('phone', phoneNumber)
        .maybeSingle();
      
      if (checkError) {
        console.error('Error checking for existing phone:', checkError.message);
      } else if (data) {
        // Phone already exists, just log it without updating
        console.log('Phone number already exists in database, using existing record');
      } else {
        // Phone doesn't exist, insert it as new
        const { error: insertError } = await supabase
          .from('customer_phones' as any)
          .insert([{ phone: phoneNumber, status: 'pending' }] as any);
        
        if (insertError) {
          console.error('Error inserting new phone:', insertError.message);
        } else {
          console.log('New phone number successfully saved to database');
        }
      }
    } catch (error) {
      console.error('Exception handling phone number:', error);
    }
    
    // Get the pending product and add it to cart
    const pendingProductJson = sessionStorage.getItem('pendingProduct');
    if (pendingProductJson) {
      const pendingProduct: Product = JSON.parse(pendingProductJson);
      const itemPrice = Number(pendingProduct.price);
      
      addItem({
        id: pendingProduct.id,
        name: pendingProduct.name,
        // Force price to be a number to satisfy typing
        price: Number(pendingProduct.price),
        image: pendingProduct.image
      });
      
      toast({
        title: "Added to Cart",
        description: `${pendingProduct.name} has been added to your cart.`
      });
      
      sessionStorage.removeItem('pendingProduct');
    }
  };

  // Calculate discount percentage
  const calculateDiscount = (mrp: number, price: number) => {
    if (mrp <= price) return 0;
    return Math.round(((mrp - price) / mrp) * 100);
  };

  return (
    <Layout>
      <div className="bg-devotional-cream py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-devotional-maroon">Vastra Collection</h1>
          <p className="text-devotional-maroon/70 text-center mb-8 max-w-2xl mx-auto">
            Explore our divine collection of pure and authentic vastras for your deities
          </p>
          
          {/* Categories filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null 
                ? "bg-devotional-orange text-white" 
                : "border-devotional-orange text-devotional-maroon hover:bg-devotional-lightOrange"}
              onClick={() => handleCategoryChange(null)}
            >
              All Categories
            </Button>
            
            {Object.entries(categoryNames).map(([key, name]) => (
              <Button 
                key={key}
                variant={selectedCategory === key ? "default" : "outline"}
                className={selectedCategory === key 
                  ? "bg-devotional-orange text-white" 
                  : "border-devotional-orange text-devotional-maroon hover:bg-devotional-lightOrange"}
                onClick={() => handleCategoryChange(key)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="card-devotional overflow-hidden">
              <div className="relative h-60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => setModalImage(product.image)}
                />
                <div className="absolute top-2 right-2 bg-devotional-orange text-white px-2 py-1 rounded text-xs">
                  {categoryNames[product.category as keyof typeof categoryNames]}
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
                <p className="text-devotional-maroon/70 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
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
        
        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-devotional-maroon/70 text-lg">No products found in this category.</p>
          </div>
        )}

        {/* Image Modal */}
        {modalImage && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
            <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
              <button
                className="absolute top-2 right-2 bg-white rounded-full shadow p-2 text-devotional-maroon hover:bg-devotional-orange hover:text-white transition-colors z-10"
                onClick={() => setModalImage(null)}
                aria-label="Close large image"
              >
                &times;
              </button>
              <img
                src={modalImage}
                alt="Large product preview"
                className="w-full h-auto rounded-lg shadow-lg border-4 border-white"
                style={{ maxHeight: '80vh', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
        
        {/* Phone input dialog */}
        {showPhonePrompt && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-xl">
              <h2 className="text-xl font-bold mb-2 text-devotional-maroon">Enter Your Phone Number</h2>
              <p className="mb-4 text-gray-600">We need your mobile number to process your order and keep you updated.</p>
              
              <div className="mb-4">
                <Input 
                  type="tel" 
                  placeholder="Your 10-digit mobile number" 
                  className={`${phoneNumber.length > 0 && phoneNumber.length < 10 ? 'border-red-500' : ''}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                />
                {phoneNumber.length > 0 && phoneNumber.length < 10 && (
                  <p className="text-red-500 text-sm mt-1">Please enter a valid 10-digit mobile number</p>
                )}
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => {
                  setShowPhonePrompt(false);
                  sessionStorage.removeItem('pendingProduct');
                }}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePhoneSubmit}
                  disabled={phoneNumber.length !== 10}
                  className={phoneNumber.length === 10 ? 'bg-devotional-orange hover:bg-devotional-red' : ''}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Shop;
