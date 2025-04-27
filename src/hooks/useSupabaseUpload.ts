
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSupabaseUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File): Promise<string | null> => {
    setError(null);
    
    if (!file) {
      console.error("No file selected");
      return null;
    }
    
    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        setError(`Upload failed: ${uploadError.message}`);
        return null;
      }

      const { data: publicData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);
        
      console.log("File uploaded successfully:", publicData.publicUrl);
      
      return publicData.publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Unexpected error during upload:", err);
      setError(`An unexpected error occurred: ${errorMessage}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, error, uploadImage };
}
