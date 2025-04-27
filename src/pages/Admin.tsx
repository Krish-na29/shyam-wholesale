import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/sonner";
import { LogOut } from "lucide-react";
import { useSupabaseUpload } from "@/hooks/useSupabaseUpload";
import { AdminLogin } from "./admin/AdminLogin";
import { ProductTable } from "./admin/ProductTable";
import { AddProductDialog } from "./admin/AddProductDialog";
import { EditProductDialog } from "./admin/EditProductDialog";
import PhoneNumbersTable from "./admin/PhoneNumbersTable";
import { DeleteProductDialog } from "./admin/DeleteProductDialog";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

// Define a consistent Product interface to be used throughout the application
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  category: string;
  description: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'customers'>('products');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: "",
    image: "",
    price: 0,
    mrp: 0,
    category: "krishna",
    description: ""
  });

  const { toast } = useToast();
  const { uploading, error, uploadImage } = useSupabaseUpload();
  const navigate = useNavigate();

  // Check session persistence
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);

      if (!session) {
        navigate('/admin');
        return;
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      if (!session) {
        navigate('/admin');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Always fetch products when admin panel mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching products",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    setProducts(data || []);
  };

  // Handle adding a new product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.image || newProduct.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields with valid values",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('products')
      .insert([newProduct]);

    if (error) {
      toast({
        title: "Error adding product",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    await fetchProducts();
    setShowAddDialog(false);
    setNewProduct({
      name: "",
      image: "",
      price: 0,
      mrp: 0,
      category: "krishna",
      description: ""
    });
    
    toast({
      title: "Product Added",
      description: `${newProduct.name} has been added to your inventory`
    });
  };

  // Handle editing an existing product
  const handleEditProduct = async () => {
    if (!currentProduct) return;

    const { error } = await supabase
      .from('products')
      .update(currentProduct)
      .eq('id', currentProduct.id);

    if (error) {
      toast({
        title: "Error updating product",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    await fetchProducts();
    setShowEditDialog(false);
    setCurrentProduct(null);
    
    toast({
      title: "Product Updated",
      description: `${currentProduct.name} has been updated`
    });
  };

  // Handle deleting a product
  const handleDeleteProduct = async () => {
    if (!currentProduct) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', currentProduct.id);

    if (error) {
      toast({
        title: "Error deleting product",
        description: error.message,
        variant: "destructive"
      });
      return;
    }

    await fetchProducts();
    setShowDeleteDialog(false);
    
    toast({
      title: "Product Deleted",
      description: `${currentProduct.name} has been removed from your inventory`
    });
    
    setCurrentProduct(null);
  };

  // Handle image uploads for new products
  const handleNewImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    
    if (imageUrl) {
      setNewProduct(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Handle image uploads for editing products
  const handleEditImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !currentProduct) {
      return;
    }
    
    const file = e.target.files[0];
    const imageUrl = await uploadImage(file);
    
    if (imageUrl && currentProduct) {
      setCurrentProduct({ ...currentProduct, image: imageUrl });
    }
  };

  // Handle logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out"
    });
  };

  // Admin login form
  if (!isAuthenticated) {
    return (
      <Layout>
        <AdminLogin />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <div className="flex gap-2 flex-wrap">
            <Button variant={activeTab === 'products' ? 'default' : 'outline'} onClick={() => setActiveTab('products')}>
              Products
            </Button>
            <Button variant={activeTab === 'customers' ? 'default' : 'outline'} onClick={() => setActiveTab('customers')}>
              Customers
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
              <h2 className="text-xl font-bold">Product Management</h2>
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" onClick={fetchProducts}>
                  Refresh
                </Button>
                <Button onClick={() => setShowAddDialog(true)}>
                  Add Product
                </Button>
              </div>
            </div>
            <ProductTable
              products={products}
              onEdit={(product) => {
                setCurrentProduct(product);
                setShowEditDialog(true);
              }}
              onDelete={(product) => {
                setCurrentProduct(product);
                setShowDeleteDialog(true);
              }}
            />
            {/* Add Product Dialog */}
            <AddProductDialog
              open={showAddDialog}
              uploading={uploading}
              product={newProduct}
              onClose={() => setShowAddDialog(false)}
              onChange={setNewProduct}
              onAdd={handleAddProduct}
              onImageChange={handleNewImageChange}
            />
            {/* Edit Product Dialog */}
            <EditProductDialog
              open={showEditDialog}
              uploading={uploading}
              product={currentProduct}
              onClose={() => setShowEditDialog(false)}
              onChange={setCurrentProduct}
              onSave={handleEditProduct}
              onImageChange={handleEditImageChange}
            />
            {/* Delete Confirmation Dialog */}
            <DeleteProductDialog
              open={showDeleteDialog}
              productName={currentProduct?.name}
              onConfirm={handleDeleteProduct}
              onClose={() => setShowDeleteDialog(false)}
            />
          </>
        )}

        {activeTab === 'customers' && (
          <PhoneNumbersTable />
        )}
      </div>
    </Layout>
  );
}

export default Admin;
