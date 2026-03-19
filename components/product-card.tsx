"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { productCategories, type Product } from "@/lib/data/products";
import { MealCustomization } from "./meal-customization";

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number, customizedProduct?: Product) => void;
  onScrollToCategory?: (categoryId: string) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onScrollToCategory,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showCustomization, setShowCustomization] = useState(false);

  const isCustomizable = (() => {
    const cat = productCategories.find((c) => c.products.some((p) => p.id === product.id));
    const customizableCategories = new Set(["wings", "boneless", "tenders"]);
    return cat ? customizableCategories.has(cat.id) : false;
  })();

  const handleCardClick = () => {
    if (isCustomizable) setShowCustomization(true);
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isCustomizable) {
      setShowCustomization(true);
    } else {
      onAddToCart(1);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleAddSuggestedItem = (suggested: Product) => {
    onAddToCart(1, suggested);
    toast.success(`${suggested.name} added to cart!`);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex flex-col h-full">
      {/* Premium Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full group cursor-pointer" onClick={handleCardClick}>

        {/* Hero Image Section - Large & Prominent */}
        {product.imageUrl && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 400px"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">
          {/* Product Name */}
          <div className="flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-foreground line-clamp-2 mb-3 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price & Add Button Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="text-2xl font-bold text-primary">
                ₦{product.price.toLocaleString()}
              </p>
            </div>

            {/* Premium Add Button */}
            <Button
              size="icon"
              onClick={handleAddToCart}
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground hover:bg-accent shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Meal customization modal */}
      {showCustomization && (
        <MealCustomization
          product={product}
          onClose={() => setShowCustomization(false)}
          onAdd={(qty: number, customizedProduct?: Product) => {
            onAddToCart(qty, customizedProduct);
            setQuantity(1);
            setShowCustomization(false);
          }}
        />
      )}
    </div>
  );
}
