"use client"

import Image from "next/image"
import { ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import type { CartItem, CheckoutForm } from "@/lib/utils/whatsapp"

interface CartSidebarProps {
  isOpen: boolean
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  onClose: () => void
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
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
  onRemoveItem,
  onClearCart,
  onCheckout,
  onUpdateField,
}: CartSidebarProps) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black text-gray-900">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close cart"
            >
              <X size={24} />
            </button>
          </div>

          {cart.length === 0 ? (
            <EmptyCart />
          ) : (
            <CartContent
              cart={cart}
              total={total}
              checkoutForm={checkoutForm}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
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
      <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg">Your cart is empty</p>
    </div>
  )
}

interface CartContentProps {
  cart: CartItem[]
  total: number
  checkoutForm: CheckoutForm
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
  onClearCart: () => void
  onCheckout: () => void
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

function CartContent({
  cart,
  total,
  checkoutForm,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onUpdateField,
}: CartContentProps) {
  return (
    <>
      {/* Cart items */}
      <div className="flex flex-col gap-4 mb-6">
        {cart.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        ))}
      </div>

      {/* Totals */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-bold text-gray-900">
            {"₦"}{total.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between items-center text-xl font-black">
          <span>Total</span>
          <span className="text-[#FF4500]">
            {"₦"}{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Checkout form */}
      <CheckoutFormFields
        checkoutForm={checkoutForm}
        onUpdateField={onUpdateField}
      />

      {/* Action buttons */}
      <button
        onClick={onCheckout}
        className="w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg mb-3"
      >
        Checkout on WhatsApp
      </button>

      <button
        onClick={onClearCart}
        className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition-all duration-300"
      >
        Clear Cart
      </button>
    </>
  )
}

interface CartItemRowProps {
  item: CartItem
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
}

function CartItemRow({ item, onUpdateQuantity, onRemoveItem }: CartItemRowProps) {
  return (
    <div className="flex gap-4 bg-gray-50 p-4 rounded-lg">
      <Image
        src={item.image}
        alt={item.name}
        width={80}
        height={80}
        className="w-20 h-20 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-bold text-gray-900">{item.name}</h3>
        <p className="text-[#FF4500] font-bold">
          {"₦"}{(item.price * item.quantity).toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="font-bold w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="bg-gray-200 hover:bg-gray-300 p-1 rounded"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="ml-auto text-red-500 hover:text-red-700"
            aria-label={`Remove ${item.name}`}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

interface CheckoutFormFieldsProps {
  checkoutForm: CheckoutForm
  onUpdateField: (field: keyof CheckoutForm, value: string) => void
}

function CheckoutFormFields({ checkoutForm, onUpdateField }: CheckoutFormFieldsProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <input
        type="text"
        placeholder="Delivery Address *"
        value={checkoutForm.address}
        onChange={(e) => onUpdateField("address", e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none"
      />
      <input
        type="tel"
        placeholder="Phone Number *"
        value={checkoutForm.phone}
        onChange={(e) => onUpdateField("phone", e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none"
      />
      <textarea
        placeholder="Order Notes (Optional)"
        value={checkoutForm.notes}
        onChange={(e) => onUpdateField("notes", e.target.value)}
        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-[#FF4500] focus:outline-none resize-none"
        rows={3}
      />
    </div>
  )
}
