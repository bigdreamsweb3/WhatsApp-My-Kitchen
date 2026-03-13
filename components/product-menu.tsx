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
  const [activeCardWithSuggestions, setActiveCardWithSuggestions] = useState<string | null>(null);

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

  const handleShowSuggestions = (productId: string) => {
    setActiveCardWithSuggestions(productId);
  };

  const handleHideSuggestions = () => {
    setActiveCardWithSuggestions(null);
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
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium flex-shrink-0 transition-all ${activeCategory === category.id
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {productCategories.map((category) => (
            <div
              key={category.id}
              id={category.id}
              ref={(el) => {
                if (el) categoryRefs.current[category.id] = el;
              }}
              className="mb-16 scroll-mt-24"
            >
              {/* Category Header Card — side-by-side on md+, stacked on mobile */}
              <div className="rounded-2xl overflow-hidden mb-8 bg-white flex flex-col sm:flex-row h-auto sm:h-44">

                {/* Image: full width on mobile, fixed width on desktop */}
                <div className="relative w-full sm:w-56 md:w-64 flex-shrink-0 h-62 sm:h-auto">
                  <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 256px"
                  />
                </div>


                {/* <div className="relative flex-1"> */}
                {/* Dark gradient behind text */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent z-0" /> */}

                {/* Description */}
                <div className="flex flex-col justify-center px-5 py-4 flex-1 z-10 relative ">
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-2xl">{category.emoji}</span>
                    <h2 className="text-xl md:text-2xl font-bold text-gray-600 tracking-tight">
                      {category.name}
                    </h2>
                  </div>
                  <p className="text-gray/75 text-sm md:text-base leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>
                {/* </div> */}



              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={(qty, suggestedProduct) => {
                      if (suggestedProduct) {
                        handleAddToCart(suggestedProduct, qty);
                      } else {
                        handleAddToCart(product, qty);
                      }
                    }}
                    showSuggestions={activeCardWithSuggestions === product.id}
                    onShowSuggestions={() => handleShowSuggestions(product.id)}
                    onHideSuggestions={handleHideSuggestions}
                    onScrollToCategory={scrollToCategory}
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