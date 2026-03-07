"use client";

import { useRef, useState } from "react";
import { productCategories } from "@/lib/data/products";
import { ProductCard } from "./product-card"; // Adjust path if needed

// Use the interfaces you already defined
import type { Product } from "@/lib/data/products"; // or wherever Product is defined

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product) => void;
}

export function ProductMenu({ onAddToCart, onBuyNow }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState(
    productCategories[0]?.id ?? ""
  );

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveCategory(categoryId);
    }
  };

  return (
    <div className="bg-background min-h-screen max-w-6xl mx-auto -translate-y-2">
      {/* Sticky Category Navigation */}
      <nav
        aria-label="Product categories"
        className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1.5 py-3 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
            {productCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <button
                  onClick={() => scrollToCategory(category.id)}
                  aria-current={activeCategory === category.id ? "page" : undefined}
                  className={`px-2 py-1 rounded-full whitespace-nowrap text-sm font-medium flex-shrink-0 transition-all ${activeCategory === category.id
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                >
                  <span>{category.name}</span>
                </button>

                <span className=" -translate-x-3" style={{
                  maskImage: `
                linear-gradient(to left, black 0%, black 20%, transparent 100%),
              `,
                  WebkitMaskImage: `
                linear-gradient(to left, black 0%, black 20%, transparent 100%),
              `,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                }}>{category.emoji}</span>

              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Product Sections */}
      <section className="bg-gray-50/50 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {productCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              className="mb-16 scroll-mt-24"
            >
              <div className="mb-6 lg:mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  {category.name}
                  <span>{category.emoji}</span>
                </h2>
                <p className="mt-2 text-gray-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(qty) => onAddToCart(product, qty)}
                    onBuyNow={() => onBuyNow(product)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}