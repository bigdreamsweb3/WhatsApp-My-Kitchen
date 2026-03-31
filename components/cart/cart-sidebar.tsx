"use client"

import { ShoppingCart, X } from "lucide-react"
import type { CartItem, CheckoutForm } from "@/lib/utils/whatsapp"
import { CartItemRow } from "./cart-item-row"

interface CartSidebarProps {
  isOpen: boolean
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  hasPendingCheckout: boolean
  onClose: () => void
  onUpdateQuantity: (productId: string, newQuantity: number) => void
  onRemove?: (productId: string) => void
  onRemoveItem?: (productId: string) => void
  onEditItem?: (item: CartItem) => void
  onClearCart: () => void
  onCheckout: () => void
  onConfirmCheckoutSent: () => void
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

export function CartSidebar({
  isOpen,
  cart,
  total,
  checkoutForm,
  hasPendingCheckout,
  onClose,
  onUpdateQuantity,
  onRemove,
  onRemoveItem,
  onEditItem,
  onClearCart,
  onCheckout,
  onConfirmCheckoutSent,
  onUpdateField,
}: CartSidebarProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 z-50 h-full w-full overflow-y-auto bg-background shadow-2xl md:w-96"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-black text-foreground">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <FilledCart
              cart={cart}
              total={total}
              checkoutForm={checkoutForm}
              hasPendingCheckout={hasPendingCheckout}
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
              onRemoveItem={onRemoveItem}
              onEditItem={onEditItem}
              onClearCart={onClearCart}
              onCheckout={onCheckout}
              onConfirmCheckoutSent={onConfirmCheckoutSent}
              onUpdateField={onUpdateField}
            />
          )}
        </div>
      </aside>
    </>
  )
}

function EmptyCart() {
  return (
    <div className="py-12 text-center">
      <ShoppingCart size={64} className="mx-auto mb-4 text-muted-foreground/30" />
      <p className="text-lg text-muted-foreground">Your cart is empty</p>
    </div>
  )
}

interface FilledCartProps {
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  hasPendingCheckout: boolean
  onUpdateQuantity: (productId: string, newQuantity: number) => void
  onRemove?: (productId: string) => void
  onRemoveItem?: (productId: string) => void
  onEditItem?: (item: CartItem) => void
  onClearCart: () => void
  onCheckout: () => void
  onConfirmCheckoutSent: () => void
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

function FilledCart({
  cart,
  total,
  checkoutForm,
  hasPendingCheckout,
  onUpdateQuantity,
  onRemove,
  onRemoveItem,
  onEditItem,
  onClearCart,
  onCheckout,
  onConfirmCheckoutSent,
  onUpdateField,
}: FilledCartProps) {
  const handleRemove = (id: string) => {
    if (onRemove) return onRemove(id)
    if (onRemoveItem) return onRemoveItem(id)
  }

  return (
    <>
      <div className="mb-6 space-y-4">
        {cart.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={handleRemove}
            onEdit={onEditItem}
          />
        ))}
      </div>

      <div className="mb-6 border-t border-border pt-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-bold text-foreground">
            {"\u20A6"}{total.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between text-xl font-black">
          <span>Total</span>
          <span className="text-brand-orange">
            {"\u20A6"}{total.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Delivery Address *"
          value={checkoutForm.address}
          onChange={(e) => onUpdateField("address", e.target.value)}
          className="w-full rounded-lg border-2 border-input bg-background p-3 text-foreground focus:border-brand-orange focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={checkoutForm.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          className="w-full rounded-lg border-2 border-input bg-background p-3 text-foreground focus:border-brand-orange focus:outline-none"
        />
        <textarea
          placeholder="Order Notes (Optional)"
          value={checkoutForm.notes}
          onChange={(e) => onUpdateField("notes", e.target.value)}
          className="w-full resize-none rounded-lg border-2 border-input bg-background p-3 text-foreground focus:border-brand-orange focus:outline-none"
          rows={3}
        />
      </div>

      {hasPendingCheckout && (
        <div className="mb-4 rounded-lg border border-brand-whatsapp/30 bg-brand-whatsapp/10 p-3 text-sm text-foreground">
          The cart stays here until the customer confirms the WhatsApp order was sent. If you edit anything below, a fresh WhatsApp message will be generated.
        </div>
      )}

      <button
        onClick={onCheckout}
        className="mb-3 w-full rounded-lg bg-brand-whatsapp py-4 font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-brand-whatsapp-hover"
      >
        {hasPendingCheckout ? "Open WhatsApp Again" : "Checkout on WhatsApp"}
      </button>

      {hasPendingCheckout && (
        <button
          onClick={onConfirmCheckoutSent}
          className="mb-3 w-full rounded-lg bg-brand-orange py-4 font-bold text-white transition-all duration-300 hover:bg-brand-orange-hover"
        >
          I sent the WhatsApp order
        </button>
      )}

      <button
        onClick={onClearCart}
        className="w-full rounded-lg bg-secondary py-3 font-bold text-secondary-foreground transition-all duration-300 hover:bg-secondary/80"
      >
        Clear Cart
      </button>
    </>
  )
}
