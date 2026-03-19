"use client";

import { useEffect, useRef, useState } from "react";
import { productCategories, type Product } from "@/lib/data/products";
import { ProductCard } from "./product-card";
import Image from "next/image";

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

export function ProductMenu({ onAddToCart }: MenuSectionProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(
    productCategories[0]?.id ?? ""
  );
  // Trigger animation every time active category changes
  const [animationKey, setAnimationKey] = useState(0);

  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement | null>(null);

  const scrollToCategory = (categoryId: string) => {
    if (categoryId === activeCategoryId) return; // no need to re-animate if same

    setActiveCategoryId(categoryId);
    setAnimationKey((prev) => prev + 1); // force re-trigger animation

    const element = sectionRefs.current[categoryId];
    const navHeight = navRef.current?.offsetHeight || 0;

    if (element) {
      const scrollTop = element.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: scrollTop, behavior: "smooth" });
    }
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart(product, quantity);
  };

  const activeCategory = productCategories.find(
    (cat) => cat.id === activeCategoryId
  ) || productCategories[0];

  return (
    <div className="bg-background min-h-screen max-w-6xl mx-auto">
      {/* Sticky nav */}
      <nav
        ref={navRef}
        className="sticky top-0 z-40 bg-card/95 border-b border-border backdrop-blur-md shadow-sm"
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-1.5 py-3 scrollbar-hide">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all border border-input ${activeCategoryId === category.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-secondary text-zinc-600 hover:bg-primary/80 hover:text-primary-foreground"
                  }`}
              >
                <span>{category.emoji}</span>
                <span className="ml-1.5">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Only the active category – with animation on change */}
      {activeCategory && (
        <section className="pb-16">
          <div
            id={activeCategory.id}
            ref={(el) => {
              if (el) sectionRefs.current[activeCategory.id] = el;
            }}
            className="scroll-mt-20"
          >
            <div className="relative pb-8 lg:pb-12">
              {/* Hero Image */}
              <div className="h-[360px] sm:h-[380px] relative overflow-hidden">
                <Image
                  src={activeCategory.imageUrl}
                  alt={activeCategory.name}
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />

                {/* Animated bubble – pops in every time category changes */}
                <div
                  key={`bubble-${animationKey}`} // forces remount + animation restart
                  className="absolute top-6 right-6 bg-secondary p-4 rounded-2xl shadow-lg z-10 w-[60%] max-w-md animate-category-reveal"
                >
                  <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-secondary" />

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl sm:text-5xl">{activeCategory.emoji}</span>
                    <h2 className="text-xl sm:text-3xl font-black text-gray-700">
                      {activeCategory.name}
                    </h2>
                  </div>

                  <p className="text-zinc-600 text-sm italic uppercase tracking-wider font-bold">
                    {activeCategory.description}
                  </p>
                </div>
              </div>

              {/* Products – can also animate if desired */}
              <div className="relative z-20 -mt-32 sm:-mt-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {activeCategory.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(qty, customizedProduct) =>
                      handleAddToCart(customizedProduct || product, qty)
                    }
                    onScrollToCategory={scrollToCategory}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}