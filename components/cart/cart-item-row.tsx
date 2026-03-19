"use client"

import { Plus, Minus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import type { CartItem } from "@/lib/utils/whatsapp"

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: string, newQuantity: number) => void
  onRemove: (productId: string) => void
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const imgSrc = (item as any).imageUrl ?? (item as any).image ?? "";

  const handleRemove = () => {
    const itemName = item.name || "Item";
    onRemove(item.id);
    toast.success(`${itemName} removed from cart`);
  };

  return (
    <div className="flex gap-4 bg-secondary p-4 rounded-lg">
      <img src={imgSrc} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
      <div className="flex-1">
        <h3 className="font-bold text-foreground">{item.name}</h3>
        {(item as any).description && (
          <p className="text-sm text-muted-foreground">{(item as any).description}</p>
        )}
        <p className="text-brand-orange font-bold">
          {"\u20A6"}{(item.price * item.quantity).toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="bg-secondary hover:bg-secondary/80 p-1 rounded"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="font-bold w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-secondary hover:bg-secondary/80 p-1 rounded"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={handleRemove}
            className="ml-auto text-destructive hover:text-destructive/80 transition-colors"
            aria-label={`Remove ${item.name} from cart`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
