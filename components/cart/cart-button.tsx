"use client"

import { ShoppingCart } from "lucide-react"

interface CartButtonProps {
  itemCount: number
  onClick: () => void
}

export function CartButton({ itemCount, onClick }: CartButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-brand-orange text-white p-4 rounded-full shadow-2xl z-40 hover:bg-brand-orange-hover transition-all duration-300 transform hover:scale-110"
      aria-label={`Open cart with ${itemCount} items`}
    >
      <ShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-brand-gold text-foreground font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
  )
}
