
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Minus, Trash } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { useState, useEffect } from 'react';

const CartPage = () => {
  const { items, removeItem, updateQuantity, total, clearCart, customerPhone, setCustomerPhone } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const { toast } = useToast();

  // Update the customer info with the phone number if it exists
  useEffect(() => {
    if (customerPhone) {
      setCustomerInfo(prev => ({ ...prev, phone: customerPhone }));
    }
  }, [customerPhone]);

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Store the phone number for future use
    setCustomerPhone(customerInfo.phone);

    // Create the WhatsApp message
    const orderDetails = items.map(item => 
      `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
    ).join('\n');

    const message = `🛍️ *New Order*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${customerInfo.name}\n` +
      `Phone: ${customerInfo.phone}\n` +
      `Address: ${customerInfo.address}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Total Amount: ₹${total}*\n\n` +
      (customerInfo.notes ? `*Notes:* ${customerInfo.notes}\n\n` : '');

    // Create WhatsApp link
    const whatsappLink = `https://wa.me/919301280090?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    
    // Clear cart
    clearCart();
    
    toast({
      title: "Order Placed Successfully",
      description: "You will be redirected to WhatsApp to complete your order.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-devotional-maroon mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium line-clamp-1">{item.name}</h3>
                    <p className="text-devotional-red">₹{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-2"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <p className="text-xl font-medium">Total: ₹{total}</p>
              </div>
            </div>

            {/* Checkout Form */}
            <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold text-devotional-maroon mb-4">Checkout Information</h2>
              <Input
                placeholder="Your Name *"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="Phone Number *"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
              />
              <Textarea
                placeholder="Delivery Address *"
                value={customerInfo.address}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
              />
              <Textarea
                placeholder="Additional Notes (optional)"
                value={customerInfo.notes}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
              />
              <Button
                className="w-full bg-devotional-orange hover:bg-devotional-red"
                onClick={handleCheckout}
              >
                Place Order on WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
