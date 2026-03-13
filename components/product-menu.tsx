"use client";

import { useRef, useState } from "react";
import { productCategories, type Product } from "@/lib/data/products";
import { ProductCard } from "./product-card";
import Image from "next/image";

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductMenu({ onAddToCart }: MenuSectionProps) {
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

  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="bg-background min-h-screen max-w-6xl mx-auto">
      {/* Sticky Category Navigation */}
      <nav
        aria-label="Product categories"
        className="sticky top-0 z-40 bg-card/95 border-b border-border backdrop-blur-md shadow-sm"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1.5 py-3 -mx-4 sm:mx-0 px-4 sm:px-0 scrollbar-hide">
            {productCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <button
                  onClick={() => scrollToCategory(category.id)}
                  aria-current={activeCategory === category.id ? "page" : undefined}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium flex-shrink-0 transition-all ${activeCategory === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-primary/80 hover:text-primary-foreground"
                    }`}
                >
                  <span>{category.emoji}</span>
                  <span className="ml-1.5">{category.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Product Sections */}
      <section className="pb-16">
        <div className="">
          {productCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              className="scroll-mt-24"
            >
              {/* Category Header */}
              <div className="relative pb-8 lg:pb-12">
                <div className="h-[360px] sm:h-[380px] relative overflow-hidden">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent z-0" />

                  {/* Category Text Overlay */}
                  <div className="absolute top-0 right-0 bg-secondary p-3 rounded-b-xl z-10 w-2/4">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl sm:text-6xl">{category.emoji}</span>
                      <h2 className="text-xl sm:text-4xl font-black text-gray-600">{category.name}</h2>
                    </div>
                    <p className="text-zinc-500 text-sm italic text-center uppercase tracking-widest font-bold">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Product Grid Half Overlay */}
                <div className="relative z-20 -mt-32 sm:-mt-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 -translate-y-3.5 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 ">
                  {category.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={(qty, customizedProduct) => {
                        if (customizedProduct) handleAddToCart(customizedProduct, qty);
                        else handleAddToCart(product, qty);
                      }}
                      onScrollToCategory={scrollToCategory}
                    />
                  ))}
                </div>
              </div>


            </div>
          ))}
        </div>
      </section>
    </div>
  );
}