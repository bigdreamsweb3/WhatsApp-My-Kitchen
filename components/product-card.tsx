"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Product = {
  id: string;
  imageUrl?: string;
  name: string;
  description: string;
  price: number;
};

interface ProductCardProps {
  product: Product;
  onAddToCart: (quantity: number) => void;     // ← changed
  onBuyNow: () => void;                        // ← changed
}
export function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  const [quantity] = useState(1);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="group relative bg-white border border-gray-200 rounded-2xl p-5 pb-10 md:pb-14 space-y-4 hover:shadow-xl hover:border-gray-300 transition-all duration-300 flex flex-col overflow-hidden max-h-[182px]">
        {/* Content stack */}
        <div className="flex-1 z-10 relative">
          <h3 className="card-product-title font-black text-xl text-gray-900 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-3 max-w-[65%]">
            {product.description}
          </p>
        </div>

        {/* Price - fixed at bottom */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10 gap-4">
          <p className="text-2xl font-black text-[#FF4500] mt-4">
            ₦{product.price.toLocaleString()}
          </p>
        </div>
      </div>

      {product.imageUrl && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div
            className="absolute w-28 h-28 flex-shrink-0 -mr-4 -mt-2 bottom-3 right-6 rounded-xl pointer-events-auto"
            style={{
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
            }}
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="drop-shadow-lg rounded-md object-cover"
              sizes="120px"
            />
          </div>

          <Button
            size="icon"
            variant="outline"
            onClick={() => onAddToCart(quantity)}
            className="absolute h-11 w-11 rounded-full border-2 border-gray-300 hover:border-green-600 hover:bg-green-50 hover:text-green-700 shadow-m transition-all bottom-1 right-2 pointer-events-auto z-10"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}