"use client";

import { useMemo, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Plus, Minus, X, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Product, productCategories } from "@/lib/data/products";
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
}

export function MealCustomization({
    product,
    onAdd,
    onClose,
}: MealCustomizationProps) {
    const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(
        {}
    );
    const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
    const [quantity, setQuantity] = useState(1);

    /* Drinks + Addons categories */
    const categories = useMemo(() => {
        const wanted = ["drinks", "addons"];

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
    }, []);

    /* Initialize selections */
    useEffect(() => {
        const initialState: Record<string, string[]> = {};
        categories.forEach((c) => {
            initialState[c.id] = [];
        });
        setSelectedItems(initialState);
    }, [categories]);

    /* Prevent background scroll */
    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    /* Flavor selection */
    const toggleFlavor = (flavorId: string) => {
        setSelectedFlavors((prev) => {
            if (prev.includes(flavorId)) {
                return prev.filter((id) => id !== flavorId);
            }

            const max = product.maxFlavors || 0;

            if (prev.length >= max) {
                toast.error(`You can only select ${max} flavor${max > 1 ? "s" : ""}`);
                return prev;
            }

            return [...prev, flavorId];
        });
    };

    /* Toggle drink/addon */
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

    const removeItemFromCategory = (categoryId: string, itemId: string) => {
        setSelectedItems((prev) => ({
            ...prev,
            [categoryId]: (prev[categoryId] || []).filter((id) => id !== itemId),
        }));
    };

    const increment = () => setQuantity((q) => q + 1);
    const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    /* Add-on price */
    const totalAddOns = useMemo(() => {
        let sum = 0;

        Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
            const category = categories.find((c) => c.id === categoryId);

            itemIds.forEach((itemId) => {
                const item = category?.items.find((i) => i.id === itemId);
                if (item) sum += item.price || 0;
            });
        });

        return sum;
    }, [selectedItems, categories]);

    const basePrice = product.price || 0;
    const totalPrice = (basePrice + totalAddOns) * quantity;

    const handleAdd = () => {
        if (product.maxFlavors && selectedFlavors.length < product.maxFlavors) {
            toast.error(
                `Please select ${product.maxFlavors} flavor${product.maxFlavors > 1 ? "s" : ""
                }`
            );
            return;
        }

        const descriptionParts: string[] = [];

        if (selectedFlavors.length > 0) {
            const flavorNames = selectedFlavors
                .map((id) => flavors.find((f) => f.id === id)?.name)
                .filter(Boolean);

            descriptionParts.push(`Flavors: ${flavorNames.join(", ")}`);
        }

        Object.entries(selectedItems).forEach(([categoryId, itemIds]) => {
            if (!itemIds.length) return;

            const category = categories.find((c) => c.id === categoryId);

            const names = itemIds
                .map((id) => category?.items.find((i) => i.id === id)?.name)
                .filter(Boolean) as string[];

            if (names.length) {
                descriptionParts.push(`${category?.name}: ${names.join(", ")}`);
            }
        });

        const customizedProduct: Product = {
            ...product,
            id: `${product.id}::custom::${encodeURIComponent(
                descriptionParts.join("|")
            )}`,
            price: totalPrice,
            description: `${product.description} — ${descriptionParts.join("; ")}`,
        };

        onAdd(quantity, customizedProduct);

        toast.success(`${product.name} with customizations added to cart!`);
    };

    const modal = (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full h-full p-2 sm:p-8 max-w-4xl">
                <div className="relative w-full h-full bg-secondary rounded-lg shadow-lg overflow-auto max-h-[90vh]">

                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-secondary z-[9999]">
                        <h2 className="text-lg font-bold">{product.name}</h2>

                        <button
                            onClick={onClose}
                            className="p-1 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="p-4 sm:p-6">

                        {/* Product Info */}
                        <div className="mb-6 p-4 rounded-lg border border-border bg-card flex items-center gap-4">
                            {product.imageUrl && (
                                <div className="relative w-28 h-20 rounded-md overflow-hidden">
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
                                        ₦{product.price.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FLAVORS */}
                        {product.maxFlavors && (
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold mb-3">
                                    Choose up to {product.maxFlavors} Flavor
                                    {product.maxFlavors > 1 ? "s" : ""}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {flavors.map((flavor) => {
                                        const isSelected = selectedFlavors.includes(flavor.id);

                                        return (
                                            <button
                                                key={flavor.id}
                                                onClick={() => toggleFlavor(flavor.id)}
                                                className={`relative flex items-center gap-3 p-3 rounded-lg border text-left ${isSelected
                                                    ? "bg-brand-green text-white border-brand-green-dark"
                                                    : "bg-card border-border"
                                                    }`}
                                            >
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">
                                                        {flavor.emoji} {flavor.name}
                                                    </div>

                                                    <div
                                                        className={`text-xs ${isSelected
                                                            ? "text-white/80"
                                                            : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {flavor.description}
                                                    </div>
                                                </div>

                                                {isSelected && (
                                                    <span className="absolute top-2 right-2 p-1 bg-secondary rounded-full">
                                                        <Check className="h-4 w-4 text-accent" />
                                                    </span>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* DRINKS + ADDONS */}
                        {categories.map((category) => (
                            <div key={category.id} className="mb-6">
                                <h3 className="text-sm font-semibold mb-3">
                                    {category.name}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {category.items.map((item) => {
                                        const isSelected =
                                            (selectedItems[category.id] || []).includes(item.id);

                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() =>
                                                    toggleItemInCategory(category.id, item.id)
                                                }
                                                className={`relative flex items-center gap-3 p-3 rounded-lg border text-left ${isSelected
                                                    ? "bg-brand-green text-white border-brand-green-dark"
                                                    : "bg-card border-border"
                                                    }`}
                                            >
                                                {item.imageUrl && (
                                                    <div className="relative w-12 h-12 rounded-md overflow-hidden">
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
                                                    <div className="font-medium text-sm">{item.name}</div>

                                                    {item.description && (
                                                        <div
                                                            className={`text-xs ${isSelected
                                                                ? "text-white/80"
                                                                : "text-muted-foreground"
                                                                }`}
                                                        >
                                                            {item.description}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="text-sm font-medium">
                                                    ₦{item.price.toLocaleString()}
                                                </div>

                                                {isSelected && (
                                                    <span className="absolute top-2 right-2 p-1 bg-secondary rounded-full">
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

                    {/* Footer */}
                    <div className="flex flex-col p-4 border-t sticky bottom-0 bg-secondary">
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
                                    ₦{totalPrice.toLocaleString()}
                                </div>
                            </div>
                        </div>

                        <Button
                            className="w-full mt-4 bg-brand-orange hover:bg-brand-orange-hover text-white"
                            onClick={handleAdd}
                        >
                            Add to cart
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    if (typeof document === "undefined") return null;

    return createPortal(modal, document.body);
}