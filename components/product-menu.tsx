"use client";

import { useEffect, useRef, useState } from "react";
import { productCategories, type Product } from "@/lib/data/products";
import { ProductCard } from "./product-card";
import Image from "next/image";

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void;
}

const DOMINANCE_THRESHOLD = 0.78;

export function ProductMenu({ onAddToCart }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState("");
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({});

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Set initial active category
  useEffect(() => {
    if (productCategories.length === 0) return;
    setActiveCategory(productCategories[0].id);

    const timer = setTimeout(() => {
      if (!observerRef.current) return;
      Object.values(categoryRefs.current).forEach((el) => {
        if (el) {
          const entry = observerRef.current?.takeRecords().find((e) => e.target === el);
          if (entry?.isIntersecting) {
            handleIntersection([entry]);
          }
        }
      });
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Observer setup
  useEffect(() => {
    const navHeight = navRef.current?.offsetHeight || 0;

    observerRef.current = new IntersectionObserver(
      (entries) => handleIntersection(entries),
      {
        root: null,
        rootMargin: `-${navHeight}px 0px -15% 0px`,
        threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9],
      }
    );

    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const intersecting = entries.filter((e) => e.isIntersecting);

    intersecting.forEach((entry) => {
      const id = (entry.target as HTMLElement).id;
      setVisibleSections((prev) => ({ ...prev, [id]: true }));
    });

    let bestId = activeCategory;
    let maxRatio = 0;

    intersecting.forEach((entry) => {
      const rect = entry.boundingClientRect;
      const vh = window.innerHeight;
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, vh);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);
      const ratio = visibleHeight / vh;

      if (ratio > maxRatio) {
        maxRatio = ratio;
        bestId = (entry.target as HTMLElement).id;
      }
    });

    if (maxRatio >= DOMINANCE_THRESHOLD && bestId !== activeCategory) {
      setActiveCategory(bestId);
    }
  };

  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    const navHeight = navRef.current?.offsetHeight || 0;
    if (!element) return;

    const scrollTop = element.getBoundingClientRect().top + window.scrollY - navHeight;
    window.scrollTo({ top: scrollTop, behavior: "smooth" });

    setActiveCategory(categoryId); // optimistic update
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="bg-background min-h-screen max-w-6xl mx-auto">
      {/* Sticky nav with hidden scrollbar */}
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
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition-all border border-input ${activeCategory === category.id
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

      {/* Product sections */}
      <section className="pb-16">
        {productCategories.map((category) => (
          <div
            key={category.id}
            id={category.id}
            ref={(el) => {
              if (el) categoryRefs.current[category.id] = el;
            }}
            className="scroll-snap-start"
          >
            <div className="relative pb-8 lg:pb-12">
              <div className="h-[360px] sm:h-[380px] relative overflow-hidden">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/15 to-transparent" />

                <div
                  className={`absolute top-6 right-6 bg-secondary p-4 rounded-2xl shadow-lg z-10 w-[60%] max-w-md transition-all duration-700 ${visibleSections[category.id] ? "opacity-100 translate-y-0 animate-category-reveal" : "opacity-0 translate-y-10"
                    }`}
                >
                  <div className="absolute -bottom-3 left-8 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-secondary" />

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl sm:text-5xl">{category.emoji}</span>
                    <h2 className="text-xl sm:text-3xl font-black text-gray-700">{category.name}</h2>
                  </div>

                  <p className="text-zinc-600 text-sm italic uppercase tracking-wider font-bold">
                    {category.description}
                  </p>
                </div>
              </div>

              <div className="relative z-20 -mt-32 sm:-mt-40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {category.products.map((product) => (
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
        ))}
      </section>

      <style jsx>{`
        .scroll-snap-y {
          scroll-snap-type: y mandatory;
        }
        .scroll-snap-start {
          scroll-snap-align: start;
        }
      `}</style>
    </div>
  );
}