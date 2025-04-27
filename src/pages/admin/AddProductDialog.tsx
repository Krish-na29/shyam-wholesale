
import { FC } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Product } from "../Admin";

type Props = {
  open: boolean;
  uploading: boolean;
  product: Omit<Product, 'id'>;
  onClose: () => void;
  onChange: (p: Omit<Product, 'id'>) => void;
  onAdd: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddProductDialog: FC<Props> = ({
  open, uploading, product, onClose, onChange, onAdd, onImageChange
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogDescription>
          Fill in the details to add a new product to your inventory.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="name" className="text-right text-devotional-maroon">
            Name
          </label>
          <Input
            id="name"
            className="col-span-3"
            value={product.name}
            onChange={(e) => onChange({...product, name: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="image" className="text-right text-devotional-maroon">
            Image URL or Upload
          </label>
          <div className="col-span-3 flex items-center gap-2">
            <Input
              id="image"
              placeholder="Paste image URL or upload below"
              value={product.image}
              onChange={(e) => onChange({...product, image: e.target.value})}
            />
            <input
              type="file"
              accept="image/*"
              className="text-sm"
              onChange={onImageChange}
              disabled={uploading}
            />
          </div>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="mrp" className="text-right text-devotional-maroon">
            MRP (₹)
          </label>
          <Input
            id="mrp"
            type="number"
            className="col-span-3"
            value={product.mrp}
            onChange={(e) => onChange({...product, mrp: Number(e.target.value)})}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="price" className="text-right text-devotional-maroon">
            Selling Price (₹)
          </label>
          <Input
            id="price"
            type="number"
            className="col-span-3"
            value={product.price}
            onChange={(e) => onChange({...product, price: Number(e.target.value)})}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="category" className="text-right text-devotional-maroon">
            Category
          </label>
          <select
            id="category"
            className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            value={product.category}
            onChange={(e) => onChange({...product, category: e.target.value})}
          >
            <option value="krishna">Krishna Ji ke Vastra</option>
            <option value="ganpati">Ganpati Ji ke Vastra</option>
            <option value="shiv">Shiv Ji & Other Devta Vastra</option>
            <option value="accessories">Chunni, Pagdi, Mala</option>
            <option value="festival">Special Festival Collections</option>
          </select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label htmlFor="description" className="text-right text-devotional-maroon">
            Description
          </label>
          <Textarea
            id="description"
            className="col-span-3"
            value={product.description}
            onChange={(e) => onChange({...product, description: e.target.value})}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          type="button" 
          className="bg-devotional-orange hover:bg-devotional-red"
          onClick={onAdd}
        >
          Add Product
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

