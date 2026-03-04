"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import type { Product } from "../lib/data/products"

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, quantity: number) => void
  onBuyNow: (product: Product) => void
}

export function ProductCard({
  product,
  onAddToCart,
  onBuyNow,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="p-5">
        <h3 className="card-product-title font-black text-xl text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3">
          {product.description}
        </p>
        <p className="text-2xl font-black text-[#FF4500] mb-4">
          {"₦"}{product.price.toLocaleString()}
        </p>

        <div className="flex flex-row items-center justify-between gap-2 ">


          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={18} />
            </button>
            <span className="font-bold text-lg w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={18} />
            </button>
          </div>


          <button
            onClick={() => {
              onAddToCart(product, quantity)
              setQuantity(1)
            }}
            className="w-fit mb-4 bg-[#FF4500] hover:bg-[#FF6347] text-white font-bold py-2 px-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {/* <button
            onClick={() => {
              onAddToCart(product, quantity)
              setQuantity(1)
            }}
            className="w-full bg-[#FF4500] hover:bg-[#FF6347] text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add to Cart
          </button> */}
          <button
            onClick={() => onBuyNow(product)}
            className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  )
}
