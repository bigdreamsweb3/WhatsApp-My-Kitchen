"use client";

import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/lib/data/products";
import Image from "next/image";

interface SuggestedAddOnsProps {
  suggestedProducts: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onDismiss: () => void;
}

export function SuggestedAddOns({
  suggestedProducts,
  onAddToCart,
  onDismiss,
}: SuggestedAddOnsProps) {
  const handleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-300 ease-out">
      <div className="bg-gradient-to-t from-card via-card to-card/95 border-t border-border px-4 py-3 max-w-6xl mx-auto rounded-t-lg">
        {/* Compact header */}
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">
            Add to complete your order
          </p>
          <button
            onClick={onDismiss}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close suggestions"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Horizontal scroll for items */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
          {suggestedProducts.map((product) => (
            <div
              key={product.id}
              className="flex bg-muted rounded-lg p-2 border border-border hover:border-brand-orange hover:bg-brand-orange/5 transition-all w-24"
            >
              {/* Product Image */}
              {product.imageUrl && (
                <div className="relative w-full h-16 mb-1.5 rounded-md overflow-hidden bg-secondary/30">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                    crossOrigin="anonymous"
                  />
                </div>
              )}

              {/* Product Info */}
              <h3 className="text-xs font-semibold text-foreground mb-0.5 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-xs text-muted-foreground mb-1.5">
                ₦{product.price.toLocaleString()}
              </p>

              {/* Add Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white rounded-md p-1 flex items-center justify-center gap-1 transition-colors text-xs font-medium"
              >
                <Plus className="h-3 w-3" />
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
