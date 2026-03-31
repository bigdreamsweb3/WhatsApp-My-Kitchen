"use client"

import Image from "next/image"

import type { Product } from "@/lib/data/products"
import { ProductMenu } from "../product-menu"

const BG_IMAGES = [
  "/menu/bg-1.jpg",
  "/menu/bg-2.jpg",
  "/menu/bg-3.jpg",
  "/menu/bg-4.jpg",
  "/menu/bg-5.jpg",
  "/menu/bg-6.jpg",
]

const COLUMNS = [
  [BG_IMAGES[0], BG_IMAGES[1], BG_IMAGES[2], BG_IMAGES[3], BG_IMAGES[4], BG_IMAGES[5]],
  [BG_IMAGES[3], BG_IMAGES[4], BG_IMAGES[5], BG_IMAGES[0], BG_IMAGES[1], BG_IMAGES[2]],
  [BG_IMAGES[5], BG_IMAGES[2], BG_IMAGES[0], BG_IMAGES[4], BG_IMAGES[1], BG_IMAGES[3]],
]

interface MenuSectionProps {
  onAddToCart: (product: Product, quantity: number) => void
}

export function MenuSection(props: MenuSectionProps) {
  return (
    <section id="menu" className="relative">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="flex h-full gap-2 px-2 -translate-y-4">
          {COLUMNS.map((column, columnIndex) => (
            <div key={columnIndex} className="relative flex-1 overflow-hidden">
              <div
                className={`flex flex-col gap-2 ${columnIndex % 2 === 0 ? "animate-menu-scroll-up" : "animate-menu-scroll-down"
                  }`}
              >
                {[...column, ...column].map((src, imageIndex) => (
                  <div
                    key={`${columnIndex}-${imageIndex}`}
                    className="relative w-full shrink-0 overflow-hidden rounded-lg"
                    style={{ aspectRatio: "3 / 4" }}
                  >
                    <Image src={src} alt="" fill className="object-cover" sizes="33vw" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-green via-brand-green/80 to-transparent -translate-y-4" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/80 to-transparent -translate-y-4" />
      </div>

      <div className="relative z-10">
        <div className="flex flex-col items-center px-4 pt-8 md:px-6 md:pt-12 -translate-y-4">
          <div className="relative w-full max-w-6xl rounded-[2rem] border border-white/10 bg-brand-green/25 px-6 py-8 shadow-2xl backdrop-blur-md md:px-10">
            <div className="flex flex-col items-center text-center">
              <span className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-300">
                Explore
              </span>
              <h2 className="text-balance text-4xl font-black leading-tight text-white md:text-6xl">
                Our Menu
              </h2>
              <p className="mt-3 max-w-md text-center text-lg font-medium text-white/75">
                Fresh, hot, and always delicious
              </p>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-400" />
            </div>
          </div>
        </div>

        <ProductMenu onAddToCart={props.onAddToCart} />
      </div>
    </section>
  )
}
