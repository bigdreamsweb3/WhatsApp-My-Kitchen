"use client"

import { Plus, Minus, Pencil, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { CartItem } from "@/lib/utils/whatsapp"

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: string, newQuantity: number) => void
  onRemove: (productId: string) => void
  onEdit?: (item: CartItem) => void
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  onEdit,
}: CartItemRowProps) {
  const imgSrc = item.imageUrl ?? ""
  const isEditable = Boolean(item.baseProductId && item.customization && onEdit)

  const handleRemove = () => {
    const itemName = item.name || "Item"
    onRemove(item.id)
    toast.success(`${itemName} removed from cart`)
  }

  return (
    <div className="flex gap-4 rounded-lg bg-secondary p-4">
      <img src={imgSrc} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-foreground">{item.name}</h3>
          {isEditable && (
            <button
              onClick={() => onEdit?.(item)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-1 text-xs font-medium text-foreground transition-colors hover:bg-background"
            >
              <Pencil size={12} />
              Edit
            </button>
          )}
        </div>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
        <p className="font-bold text-brand-orange">
          {"\u20A6"}{(item.price * item.quantity).toLocaleString()}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="rounded bg-secondary p-1 hover:bg-secondary/80"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-bold">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="rounded bg-secondary p-1 hover:bg-secondary/80"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleRemove}
            className="ml-auto text-destructive transition-colors hover:text-destructive/80"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
