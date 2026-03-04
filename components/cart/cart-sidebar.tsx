"use client"

import { ShoppingCart, X } from "lucide-react"
import type { CartItem, CheckoutForm } from "@/lib/utils/whatsapp"
import { CartItemRow } from "./cart-item-row"

interface CartSidebarProps {
  isOpen: boolean
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  onClose: () => void
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemove: (productId: number) => void
  onClearCart: () => void
  onCheckout: () => void
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

export function CartSidebar({
  isOpen,
  cart,
  total,
  checkoutForm,
  onClose,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onCheckout,
  onUpdateField,
}: CartSidebarProps) {
  if (!isOpen) return null

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className="fixed right-0 top-0 h-full w-full md:w-96 bg-background shadow-2xl z-50 overflow-y-auto"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
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
              onUpdateQuantity={onUpdateQuantity}
              onRemove={onRemove}
              onClearCart={onClearCart}
              onCheckout={onCheckout}
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
    <div className="text-center py-12">
      <ShoppingCart size={64} className="mx-auto text-muted-foreground/30 mb-4" />
      <p className="text-muted-foreground text-lg">Your cart is empty</p>
    </div>
  )
}

interface FilledCartProps {
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemove: (productId: number) => void
  onClearCart: () => void
  onCheckout: () => void
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

function FilledCart({
  cart,
  total,
  checkoutForm,
  onUpdateQuantity,
  onRemove,
  onClearCart,
  onCheckout,
  onUpdateField,
}: FilledCartProps) {
  return (
    <>
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>

      {/* Totals */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-bold text-foreground">
            {"\u20A6"}{total.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-xl font-black">
          <span>Total</span>
          <span className="text-[#FF4500]">
            {"\u20A6"}{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Delivery Address *"
          value={checkoutForm.address}
          onChange={(e) => onUpdateField("address", e.target.value)}
          className="w-full p-3 border-2 border-input rounded-lg focus:border-[#FF4500] focus:outline-none bg-background text-foreground"
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={checkoutForm.phone}
          onChange={(e) => onUpdateField("phone", e.target.value)}
          className="w-full p-3 border-2 border-input rounded-lg focus:border-[#FF4500] focus:outline-none bg-background text-foreground"
        />
        <textarea
          placeholder="Order Notes (Optional)"
          value={checkoutForm.notes}
          onChange={(e) => onUpdateField("notes", e.target.value)}
          className="w-full p-3 border-2 border-input rounded-lg focus:border-[#FF4500] focus:outline-none resize-none bg-background text-foreground"
          rows={3}
        />
      </div>

      {/* Action Buttons */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
      >
        Checkout on WhatsApp
      </button>
      <button
        onClick={onClearCart}
        className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 rounded-lg transition-all duration-300"
      >
        Clear Cart
      </button>
    </>
  )
}
