"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Plus, Minus, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, productCategories } from "@/lib/data/products";

/**
 * MealCustomization component - follows the same data structure as MealCustomization
 * to maintain consistent code structure across the application
 */

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
}

export function MealCustomization({ product, onAdd, onClose }: MealCustomizationProps) {
    const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
    const [quantity, setQuantity] = useState(1);
    const [isChoosingFree, setIsChoosingFree] = useState(true);

    // Derive categories from productCategories (dips, drinks, addons)
    const categories = useMemo(() => {
        const wanted = ["dips", "drinks", "addons"];
        return productCategories
            .filter((c) => wanted.includes(c.id))
            .map((c) => ({
                id: c.id,
                name: c.name,
                items: c.products.map((p) => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price,
                    imageUrl: p.imageUrl,
                })),
            }));
    }, [product]);

    // Initialize selected items state
    useEffect(() => {
        const initialState: Record<string, string[]> = {};
        categories.forEach((category) => {
            initialState[category.id] = [];
        });
        setSelectedItems(initialState);
    }, [categories]);

    // Handle body overflow for modal
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    // Toggle item selection within a category
    const toggleItemInCategory = (categoryId: string, itemId: string) => {
        setSelectedItems((prev) => {
            const current = prev[categoryId] || [];
            if (current.includes(itemId)) {
                return {
                    ...prev,
                    [categoryId]: current.filter((id) => id !== itemId),
                };
            }
            return {
                ...prev,
                [categoryId]: [...current, itemId],
            };
        });
    };

    // Remove a specific item from category
    const removeItemFromCategory = (categoryId: string, itemId: string) => {
        setSelectedItems((prev) => ({
            ...prev,
            [categoryId]: (prev[categoryId] || []).filter((id) => id !== itemId),
        }));
    };

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    // Calculate total price
    const totalAddOns = useMemo(() => {
        let sum = 0;
        Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
            const category = categories.find((c) => c.id === categoryId);
            if (category) {
                itemIds.forEach((itemId) => {
                    const item = category.items.find((i) => i.id === itemId);
                    if (item) sum += item.price || 0;
                });
            }
        });
        return sum;
    }, [selectedItems, categories]);

    const basePrice = product?.price || 0;
    const totalPrice = (basePrice + totalAddOns) * quantity;

    const handleAdd = () => {
        const descriptionParts: string[] = [];
        Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
            if (itemIds.length === 0) return;
            const category = categories.find((c) => c.id === categoryId);
            const names = itemIds
                .map((id) => category?.items.find((i) => i.id === id)?.name)
                .filter(Boolean) as string[];
            if (names.length) descriptionParts.push(`${category?.name}: ${names.join(", ")}`);
        });

        const customizedProduct: Product = {
            ...product,
            id: `${product.id}::custom::${encodeURIComponent(descriptionParts.join("|"))}`,
            price: totalPrice,
            description: `${product.description} — ${descriptionParts.join("; ")}`,
        };

        onAdd(quantity, customizedProduct);
    };

    const modal = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={onClose} />

            <div className="relative w-full h-full p-2 sm:p-8 max-w-4xl">
                <div className="relative w-full h-full bg-white rounded-lg shadow-lg overflow-auto max-h-[90vh]">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
                        <h2 className="text-lg font-bold">{product.name}</h2>
                        <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-700">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-4 sm:p-6">
                        {/* Product Summary: image, name, description, price */}
                        <div className="mb-6 p-4 rounded-lg border border-border bg-card-foreground/5 flex items-center gap-4">
                            {product.imageUrl && (
                                <div className="relative w-28 h-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" sizes="112px" />
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <div className="text-lg font-bold text-foreground">{product.name}</div>
                                {product.description && (
                                    <div className="text-sm text-muted-foreground">{product.description}</div>
                                )}
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-muted-foreground">Price</div>
                                <div className="text-lg font-semibold text-primary">₦{(product.price || 0).toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Categories */}
                        {categories.map((category) => (
                            <div key={category.id} className="mb-6">
                                <h3 className="text-sm font-semibold mb-3 text-gray-900">{category.name}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {category.items.map((item) => {
                                        const isSelected = (selectedItems[category.id] || []).includes(item.id);
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => toggleItemInCategory(category.id, item.id)}
                                                className={`relative flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${isSelected
                                                    ? "bg-green-600 text-white border-green-700"
                                                    : "bg-white border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                {item.imageUrl && (
                                                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                                        <Image
                                                            src={item.imageUrl}
                                                            alt={item.name}
                                                            fill
                                                            className="object-cover"
                                                            sizes="48px"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    <div className="font-medium text-sm">{item.name}</div>
                                                    {item.description && (
                                                        <div
                                                            className={`text-xs ${isSelected ? "text-white/80" : "text-gray-500"
                                                                }`}
                                                        >
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>
                                                <div
                                                    className={`text-sm font-medium flex-shrink-0 ${isSelected ? "text-white" : "text-gray-900"
                                                        }`}
                                                >
                                                    ₦{(item.price || 0).toLocaleString()}
                                                </div>
                                                {isSelected && (
                                                    <span className="absolute top-2 right-2 p-1 bg-white rounded-full">
                                                        <Check className="h-4 w-4 text-green-600" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        {/* Selected Items Summary */}
                        {Object.values(selectedItems).some((items) => items.length > 0) && (
                            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                <h4 className="text-sm font-semibold mb-2 text-blue-900">Selected Add-ons</h4>
                                <div className="space-y-2">
                                    {Object.entries(selectedItems).map(
                                        ([categoryId, itemIds]) =>
                                            itemIds.length > 0 && (
                                                <div key={categoryId}>
                                                    {itemIds.map((itemId) => {
                                                        const category = categories.find((c) => c.id === categoryId);
                                                        const item = category?.items.find((i) => i.id === itemId);
                                                        return (
                                                            <div
                                                                key={`${categoryId}-${itemId}`}
                                                                className="flex items-center justify-between text-sm"
                                                            >
                                                                <span className="text-blue-900">
                                                                    {item?.name} (₦{(item?.price || 0).toLocaleString()})
                                                                </span>
                                                                <button
                                                                    onClick={() => removeItemFromCategory(categoryId, itemId)}
                                                                    className="text-blue-600 hover:text-blue-800"
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Quantity and Total */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-md border border-gray-200 px-2 py-1">
                                <button onClick={decrement} className="p-1 text-gray-600 hover:text-gray-900">
                                    <Minus className="h-4 w-4" />
                                </button>
                                <span className="w-6 text-center font-medium">{quantity}</span>
                                <button onClick={increment} className="p-1 text-gray-600 hover:text-gray-900">
                                    <Plus className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-gray-600">Total</div>
                                <div className="text-lg font-bold text-orange-600">₦{totalPrice.toLocaleString()}</div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-4">
                            <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white" onClick={handleAdd}>
                                Add to cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (typeof document === "undefined") return null;
    return createPortal(modal, document.body);
}
