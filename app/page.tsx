"use client"

import { useCallback, useMemo, useState } from "react"
import { useCart } from "@/hooks/use-cart"
import { Header } from "@/components/header"
import { Hero } from "@/components/sections/hero-section"
import { ContactSection } from "@/components/sections/contact-section"
import { SiteFooter } from "@/components/site-footer"
import { CartButton } from "@/components/cart/cart-button"
import { CartSidebar } from "@/components/cart/cart-sidebar"
import { MenuSection } from "@/components/sections/menu-section"
import { MealCustomization } from "@/components/meal-customization"
import { productCategories, type Product } from "@/lib/data/products"
import type { CartItem } from "@/lib/utils/whatsapp"

export default function HomePage() {
  const {
    cart,
    isCartOpen,
    checkoutForm,
    total,
    itemCount,
    addToCart,
    replaceCartItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    handleCheckout,
    confirmCheckoutSent,
    openCart,
    closeCart,
    updateCheckoutField,
    hasPendingCheckout,
  } = useCart()
  const [editingItem, setEditingItem] = useState<CartItem | null>(null)

  const scrollToMenu = useCallback(() => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const handleAddToCart = useCallback((product: Product, quantity: number) => {
    addToCart(product, quantity)
  }, [addToCart])

  const editableBaseProduct = useMemo(() => {
    if (!editingItem?.baseProductId) return null

    for (const category of productCategories) {
      const product = category.products.find(
        (entry) => entry.id === editingItem.baseProductId,
      )

      if (product) return product
    }

    return null
  }, [editingItem])

  return (
    <div className="min-h-screen bg-white font-sans">
      <Header onOrderClick={scrollToMenu} />
      <Hero onScrollToMenu={scrollToMenu} />

      <CartButton itemCount={itemCount} onClick={openCart} />

      <main>
        <MenuSection onAddToCart={handleAddToCart} />
        <ContactSection />
      </main>

      <SiteFooter />

      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        total={total}
        checkoutForm={checkoutForm}
        hasPendingCheckout={hasPendingCheckout}
        onClose={closeCart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onEditItem={setEditingItem}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        onConfirmCheckoutSent={confirmCheckoutSent}
        onUpdateField={updateCheckoutField}
      />

      {editingItem && editableBaseProduct && (
        <MealCustomization
          product={editableBaseProduct}
          initialQuantity={editingItem.quantity}
          initialCustomization={editingItem.customization}
          submitLabel="Save changes"
          onClose={() => setEditingItem(null)}
          onAdd={(quantity, customizedProduct) => {
            if (!customizedProduct) return
            replaceCartItem(editingItem.id, customizedProduct, quantity)
            setEditingItem(null)
          }}
        />
      )}
    </div>
  )
}
