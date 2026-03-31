"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Plus, Minus, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  type Product,
  productCategories,
  type ProductCustomization,
} from "@/lib/data/products";
import { flavors } from "@/lib/data/flavors";

interface MealCustomizationItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
}

interface MealCustomizationCategory {
  id: string;
  name: string;
  items: MealCustomizationItem[];
}

interface MealCustomizationProps {
  product: Product;
  onAdd: (quantity: number, customizedProduct?: Product) => void;
  onClose: () => void;
  initialQuantity?: number;
  initialCustomization?: ProductCustomization;
  submitLabel?: string;
}

export function MealCustomization({
  product,
  onAdd,
  onClose,
  initialQuantity = 1,
  initialCustomization,
  submitLabel = "Add to cart",
}: MealCustomizationProps) {
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(initialQuantity);

  const categories = useMemo<MealCustomizationCategory[]>(() => {
    const wanted = ["refreshments", "addons"];

    return productCategories
      .filter((category) => wanted.includes(category.id))
      .map((category) => ({
        id: category.id,
        name: category.name,
        items: category.products.map((item) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
      }));
  }, []);

  useEffect(() => {
    const initialState: Record<string, string[]> = {};

    categories.forEach((category) => {
      initialState[category.id] = initialCustomization?.selectedItems?.[category.id] ?? [];
    });

    setSelectedItems(initialState);
    setSelectedFlavors(initialCustomization?.selectedFlavors ?? []);
    setQuantity(initialQuantity);
  }, [categories, initialCustomization, initialQuantity]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const toggleFlavor = (flavorId: string) => {
    setSelectedFlavors((previous) => {
      if (previous.includes(flavorId)) {
        return previous.filter((id) => id !== flavorId);
      }

      const maxFlavors = product.maxFlavors || 0;

      if (previous.length >= maxFlavors) {
        toast.error(`You can only select ${maxFlavors} flavor${maxFlavors > 1 ? "s" : ""}`);
        return previous;
      }

      return [...previous, flavorId];
    });
  };

  const toggleItemInCategory = (categoryId: string, itemId: string) => {
    setSelectedItems((previous) => {
      const current = previous[categoryId] || [];

      if (current.includes(itemId)) {
        return {
          ...previous,
          [categoryId]: current.filter((id) => id !== itemId),
        };
      }

      return {
        ...previous,
        [categoryId]: [...current, itemId],
      };
    });
  };

  const increment = () => setQuantity((current) => current + 1);
  const decrement = () => setQuantity((current) => (current > 1 ? current - 1 : 1));

  const totalAddOns = useMemo(() => {
    let sum = 0;

    Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
      const category = categories.find((entry) => entry.id === categoryId);

      itemIds.forEach((itemId) => {
        const item = category?.items.find((entry) => entry.id === itemId);
        if (item) sum += item.price || 0;
      });
    });

    return sum;
  }, [categories, selectedItems]);

  const unitPrice = (product.price || 0) + totalAddOns;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    if (product.maxFlavors && selectedFlavors.length < 1) {
      toast.error(
        `Please select at least 1 flavor${product.maxFlavors > 1 ? "s" : ""}`,
      );
      return;
    }

    const descriptionParts: string[] = [];

    if (selectedFlavors.length > 0) {
      const flavorNames = selectedFlavors
        .map((id) => flavors.find((flavor) => flavor.id === id)?.name)
        .filter(Boolean);

      descriptionParts.push(`Flavors: ${flavorNames.join(", ")}`);
    }

    Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
      if (!itemIds.length) return;

      const category = categories.find((entry) => entry.id === categoryId);
      const names = itemIds
        .map((id) => category?.items.find((item) => item.id === id)?.name)
        .filter(Boolean) as string[];

      if (names.length) {
        descriptionParts.push(`${category?.name}: ${names.join(", ")}`);
      }
    });

    const customization: ProductCustomization = {
      selectedFlavors,
      selectedItems,
    };

    const baseProductId = product.baseProductId ?? product.id;
    const customizationKey = encodeURIComponent(JSON.stringify(customization));

    const customizedProduct: Product = {
      ...product,
      id: `${baseProductId}::custom::${customizationKey}`,
      baseProductId,
      customization,
      price: unitPrice,
      description: descriptionParts.length
        ? `${product.description} - ${descriptionParts.join(" | ")}`
        : product.description,
    };

    onAdd(quantity, customizedProduct);
    toast.success(`${product.name} updated in cart`);
  };

  const modal = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative h-full w-full max-w-4xl p-2 sm:p-8">
        <div className="relative h-full max-h-[90vh] w-full overflow-auto rounded-lg bg-secondary shadow-lg">
          <div className="sticky top-0 z-[9999] flex items-center justify-between border-b bg-secondary p-4">
            <h2 className="text-lg font-bold">{product.name}</h2>

            <button
              onClick={onClose}
              className="p-1 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-6 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
              {product.imageUrl && (
                <div className="relative h-20 w-28 overflow-hidden rounded-md">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
              )}

              <div className="flex-1">
                <div className="text-lg font-bold">{product.name}</div>
                {product.description && (
                  <div className="text-sm text-muted-foreground">
                    {product.description}
                  </div>
                )}

                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="text-lg font-semibold text-primary">
                    {"\u20A6"}
                    {product.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {product.maxFlavors && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                  Choose up to {product.maxFlavors} Flavor
                  {product.maxFlavors > 1 ? "s" : ""}
                </h3>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {flavors.map((flavor) => {
                    const isSelected = selectedFlavors.includes(flavor.id);

                    return (
                      <button
                        key={flavor.id}
                        onClick={() => toggleFlavor(flavor.id)}
                        className={`relative flex items-center gap-3 rounded-lg border p-3 text-left ${
                          isSelected
                            ? "border-brand-green-dark bg-brand-green text-white"
                            : "border-border bg-card"
                        }`}
                      >
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {flavor.emoji} {flavor.name}
                          </div>

                          <div
                            className={`text-xs ${
                              isSelected ? "text-white/80" : "text-muted-foreground"
                            }`}
                          >
                            {flavor.description}
                          </div>
                        </div>

                        {isSelected && (
                          <span className="absolute right-2 top-2 rounded-full bg-secondary p-1">
                            <Check className="h-4 w-4 text-accent" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {categories.map((category) => (
              <div key={category.id} className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">{category.name}</h3>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {category.items.map((item) => {
                    const isSelected = (selectedItems[category.id] || []).includes(item.id);

                    return (
                      <button
                        key={item.id}
                        onClick={() => toggleItemInCategory(category.id, item.id)}
                        className={`relative flex items-center gap-3 rounded-lg border p-3 text-left ${
                          isSelected
                            ? "border-brand-green-dark bg-brand-green text-white"
                            : "border-border bg-card"
                        }`}
                      >
                        {item.imageUrl && (
                          <div className="relative h-12 w-12 overflow-hidden rounded-md">
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="text-sm font-medium">{item.name}</div>

                          {item.description && (
                            <div
                              className={`text-xs ${
                                isSelected ? "text-white/80" : "text-muted-foreground"
                              }`}
                            >
                              {item.description}
                            </div>
                          )}
                        </div>

                        <div className="text-sm font-medium">
                          {"\u20A6"}
                          {item.price.toLocaleString()}
                        </div>

                        {isSelected && (
                          <span className="absolute right-2 top-2 rounded-full bg-secondary p-1">
                            <Check className="h-4 w-4 text-accent" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="sticky bottom-0 flex flex-col border-t bg-secondary p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={decrement}>
                  <Minus className="h-4 w-4" />
                </button>

                <span>{quantity}</span>

                <button onClick={increment}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total</div>
                <div className="text-lg font-bold text-brand-orange">
                  {"\u20A6"}
                  {totalPrice.toLocaleString()}
                </div>
              </div>
            </div>

            <Button
              className="mt-4 w-full bg-brand-orange text-white hover:bg-brand-orange-hover"
              onClick={handleAdd}
            >
              {submitLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined") return null;

  return createPortal(modal, document.body);
}
