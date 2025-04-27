
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');
  const [bellSound, setBellSound] = useState<HTMLAudioElement | null>(null);
  const [bellLoaded, setBellLoaded] = useState(false);

  // Initialize the bell sound
  useEffect(() => {
    try {
      // Create a new Audio object
      const audio = new Audio('/cart-bell-sound.mp3');
      
      // Set volume and preload
      audio.volume = 0.3;
      audio.preload = 'auto';
      
      // Add event listeners for debugging
      const handleCanPlayThrough = () => {
        console.log('Cart bell sound loaded successfully');
        setBellLoaded(true);
      };
      
      const handleError = (e: Event) => {
        console.error('Error loading cart bell sound:', e);
        setBellLoaded(false);
      };
      
      audio.addEventListener('canplaythrough', handleCanPlayThrough);
      audio.addEventListener('error', handleError);
      
      // Preload the sound
      audio.load();
      setBellSound(audio);

      return () => {
        // Clean up event listeners
        audio.removeEventListener('canplaythrough', handleCanPlayThrough);
        audio.removeEventListener('error', handleError);
        
        // Cleanup audio
        audio.pause();
        audio.src = '';
      };
    } catch (error) {
      console.error('Failed to create audio element:', error);
    }
  }, []);

  const playBellSound = useCallback(() => {
    if (bellSound && bellLoaded) {
      // Reset the audio to the beginning
      bellSound.currentTime = 0;
      
      // Play the sound with error handling
      try {
        const playPromise = bellSound.play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.error("Bell sound failed to play:", error);
          });
        }
      } catch (error) {
        console.error("Error playing bell sound:", error);
      }
    } else {
      console.warn("Bell sound not initialized yet or failed to load");
    }
  }, [bellSound, bellLoaded]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });
    
    // Play the bell sound when adding to cart
    playBellSound();
  }, [playBellSound]);

  const removeItem = useCallback((id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0) // Remove items with quantity 0
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart, 
        total,
        isOpen,
        setIsOpen,
        customerPhone,
        setCustomerPhone
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
