"use client"

import Image from "next/image"
import { products } from "../../lib/data/products"
import { ProductCard } from "../../components/product-card"
import type { Product } from "../../components/product-card"

const BG_IMAGES = [
  "/menu/bg-1.jpg",
  "/menu/bg-2.jpg",
  "/menu/bg-3.jpg",
  "/menu/bg-4.jpg",
  "/menu/bg-5.jpg",
  "/menu/bg-6.jpg",
]

// Split images into 3 columns, each column loops a different set
const COLUMNS = [
  [BG_IMAGES[0], BG_IMAGES[1], BG_IMAGES[2], BG_IMAGES[3], BG_IMAGES[4], BG_IMAGES[5]],
  [BG_IMAGES[3], BG_IMAGES[4], BG_IMAGES[5], BG_IMAGES[0], BG_IMAGES[1], BG_IMAGES[2]],
  [BG_IMAGES[5], BG_IMAGES[2], BG_IMAGES[0], BG_IMAGES[4], BG_IMAGES[1], BG_IMAGES[3]],
]

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void
  onBuyNow: (product: Product) => void
}

export function MenuSection({ onAddToCart, onBuyNow }: MenuSectionProps) {
  return (
    <section id="menu" className="relative overflow-hidden">
      {/* Scrolling image columns as background */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="flex h-full gap-2 px-2">
          {COLUMNS.map((column, colIdx) => (
            <div key={colIdx} className="relative flex-1 overflow-hidden">
              {/* The scrolling strip: duplicated for seamless loop */}
              <div
                className={`flex flex-col gap-2 ${colIdx % 2 === 0
                  ? "animate-menu-scroll-up"
                  : "animate-menu-scroll-down"
                  }`}
              >
                {/* Render twice for seamless infinite loop */}
                {[...column, ...column].map((src, imgIdx) => (
                  <div
                    key={`${colIdx}-${imgIdx}`}
                    className="relative w-full shrink-0 rounded-lg overflow-hidden"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="33vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Heavy dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#0F7948] via-[#FF4500]d/80 to-transparent" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 pb-16">
        {/* Header block with solid backdrop for maximum focus */}
        <div className="flex flex-col items-center mb-14 -translate-y-[5%]" style={{
          maskImage:
            "linear-gradient(to left, black 0%, black 90%, transparent 100%), linear-gradient(to right, black 0%, black 90%, transparent 100%),linear-gradient(to top, black 0%, black 10%, transparent 100%), linear-gradient(to bottom, black 0%, black 10%, transparent 100%),",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 90%, transparent 100%), linear-gradient(to right, black 0%, black 90%, transparent 100%),",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}>
          <div className="relative inline-flex flex-col items-start py-6 px-4 bg-[#0F7948]/20 backdrop-blur-md w-full max-w-7xl mx-auto">

            <div className="flex-wrap justify-between items-center">

              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400 mb-2">
                Explore
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-center text-white text-balance leading-tight whitespace-nowrap">
                Our Menu
              </h2>

            </div>


            <div className="flex justify-start items-center w-full">

              <p className="mt-3 text-center text-white/70 text-lg max-w-md font-medium">
                Fresh, hot, and always delicious
              </p>
            </div>


            <div className="mt-3 h-1 w-16 rounded-full bg-emerald-500" />
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
