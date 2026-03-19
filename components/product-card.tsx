"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
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
}: ProductCardProps) {
  const [showCustomization, setShowCustomization] = useState(false);

  const isCustomizable = (() => {
    const cat = productCategories.find((c) =>
      c.products.some((p) => p.id === product.id)
    );
    const customizableCategories = new Set(["wings", "boneless"]);
    return cat ? customizableCategories.has(cat.id) : false;
  })();

  const handleCardClick = () => {
    if (isCustomizable) setShowCustomization(true);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isCustomizable) {
      setShowCustomization(true);
      return;
    }

    onAddToCart(1);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col h-full">
      <div
        onClick={handleCardClick}
        className="relative flex flex-col h-full overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
      >
        {/* Image */}
        {product.imageUrl && (
          <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, 400px"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6">

          {/* Name + Package Info */}
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>

            {/* Package description */}
            {product.wingsCount && product.maxFlavors && (
              <p className="text-sm text-muted-foreground">
                {product.wingsCount} Wings • {product.maxFlavors} Flavor
                {product.maxFlavors > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-4">

            {/* Price */}
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Price
              </p>

              <p className="text-2xl font-bold text-primary">
                ₦{product.price.toLocaleString()}
              </p>
            </div>

            {/* Add Button */}
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

      {/* Customization modal */}
      {showCustomization && (
        <MealCustomization
          product={product}
          onClose={() => setShowCustomization(false)}
          onAdd={(qty: number, customizedProduct?: Product) => {
            onAddToCart(qty, customizedProduct);
            setShowCustomization(false);
          }}
        />
      )}
    </div>
  );
}