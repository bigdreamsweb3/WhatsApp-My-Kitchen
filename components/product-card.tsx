"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Minus, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSuggestedAddOns, productCategories, type Product, type SuggestionGroup } from "@/lib/data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number, suggestedProduct?: Product) => void;
  showSuggestions: boolean;
  onShowSuggestions: () => void;
  onHideSuggestions: () => void;
  onScrollToCategory?: (categoryId: string) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  showSuggestions,
  onShowSuggestions,
  onHideSuggestions,
  onScrollToCategory,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [suggestionGroups, setSuggestionGroups] = useState<SuggestionGroup[]>([]);

  useEffect(() => {
    if (showSuggestions) {
      const cat = productCategories.find((c) => c.products.some((p) => p.id === product.id));
      if (cat && !["drinks", "sauces", "addons"].includes(cat.id)) {
        setSuggestionGroups(getSuggestedAddOns(product.id));
      }
    }
  }, [showSuggestions, product.id]);

  const handleAddToCart = () => {
    onAddToCart(quantity);
    setQuantity(1);

    const cat = productCategories.find((c) => c.products.some((p) => p.id === product.id));
    if (cat && !["drinks", "sauces", "addons"].includes(cat.id)) {
      onShowSuggestions();
    }
  };

  const handleAddSuggestedItem = (suggested: Product) => {
    onAddToCart(1, suggested);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex flex-col">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="relative h-fit p-4 flex flex-col justify-between">
          {/* Name - top aligned, clean */}
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 pr-20">
            {product.name}
          </h3>

          {/* Price & quantity - bottom aligned */}
          <div className="flex items-center justify-between gap-4 w-[70%]">
            <p className="text-xl font-bold text-orange-600">
              ₦{product.price.toLocaleString()}
            </p>

            <div className="flex items-center gap-1 bg-gray-50 rounded-md border border-gray-200 px-2 py-1">
              <button
                onClick={decrement}
                className="p-0.5 text-gray-600 hover:text-gray-900"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={increment}
                className="p-0.5 text-gray-600 hover:text-gray-900"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Image overlay - smaller, cleaner, no heavy mask */}
        {product.imageUrl && (
          <div className="absolute bottom-0 right-0 w-24 h-24 rounded-lg overflow-hidden pointer-events-none" style={{
            maskImage: `
                  linear-gradient(to left, black 90%, black 90%, transparent 100%),
                  linear-gradient(to top, black 90%, black 90%, transparent 100%),
                  linear-gradient(to bottom, black 90%, black 0%, transparent 100%)
                `,
            WebkitMaskImage: `
                  linear-gradient(to left, black 90%, black 90%, transparent 100%),
                  linear-gradient(to top, black 90%, black 90%, transparent 100%),
                  linear-gradient(to bottom, black 90%, black 0%, transparent 100%)
                `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}>
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        )}

        {/* Floating + button - simple, no heavy hover colors */}
        <Button
          size="icon"
          variant="outline"
          onClick={handleAddToCart}
          className="absolute bottom-0 right-0 h-9 w-9 rounded-full border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions - kept as you like, just minor spacing tweaks */}
      {showSuggestions && suggestionGroups.length > 0 && (
        <div className="mt-3 bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-800">Customisations</h4>
            <button
              onClick={onHideSuggestions}
              className="p-1 text-gray-500 hover:text-gray-700"
              aria-label="Close suggestions"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-4">
            {suggestionGroups.map((group) => (
              <div key={group.categoryId} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium uppercase tracking-wide text-gray-600">
                    {group.category}
                  </span>
                  {onScrollToCategory && (
                    <button
                      onClick={() => {
                        onScrollToCategory(group.categoryId);
                        onHideSuggestions();
                      }}
                      className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-800 font-medium"
                    >
                      More <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white rounded-lg border border-gray-200 p-3 hover:border-orange-300 transition-colors"
                    >
                      {item.imageUrl && (
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-sm font-semibold text-orange-600">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 text-xs font-medium"
                        onClick={() => handleAddSuggestedItem(item)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}