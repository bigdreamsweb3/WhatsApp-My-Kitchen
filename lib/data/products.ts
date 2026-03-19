export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Now in NGN
  rating?: "Highly rated" | string | number;
  calories?: string;
  tags: string[];
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  products: Product[];
  imageUrl: string;
}

export interface SuggestionGroup {
  categoryId: string;
  category: string;
  items: Product[];
}

export const productCategories: Category[] = [
  {
    id: "wings",
    name: "WINGS",
    emoji: "🍗",
    description:
      "Crispy fried wings tossed in our signature flavours. Bold taste. Serious crunch.",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "wings-8",
        name: "6 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 9500,
        calories: "623 kcal",
        tags: ["Wings"],
        imageUrl: "/menu/wings/8wings.jpg", // Saucy fried wings
      },
      {
        id: "wings-10",
        name: "10 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 11500,
        calories: "778 kcal",
        tags: ["Wings"],
        imageUrl: "/menu/wings/10wings.jpg",
      },
      {
        id: "wings-12",
        name: "12 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 13500,
        calories: "932 kcal",
        tags: ["Wings"],
        imageUrl: "/menu/wings/12wings.jpg",
      },
    ],
  },

  {
    id: "boneless",
    name: "BONELESS BITES",
    emoji: "🦴",
    description:
      "Crispy boneless chicken bites tossed in our signature house flavours.",
    imageUrl: "/menu/Category-Boneless-3.jpg",
    products: [
      {
        id: "boneless-8",
        name: "8 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 10500, // ≈ ₦10,500 (mid-range bucket pricing)
        rating: "Highly rated",
        calories: "420 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/8boneless.jpg", // Crispy boneless chicken bites
      },
      {
        id: "boneless-10",
        name: "10 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 12800,
        calories: "526 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/10boneless.jpg", // Golden fried tenders
      },
      {
        id: "boneless-12",
        name: "12 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 14800,
        calories: "631 kcal",
        tags: ["Boneless", "Popular"],
        imageUrl: "/menu/boneless/12boneless.jpg", // Pile of crispy boneless pieces
      },
    ],
  },

  {
    id: "boss-cuts",
    name: "BOSS CUTS",
    emoji: "🔥",
    description: "Big cuts. Crispy bite. Serious flavor.",
    imageUrl: "/menu/Category-Boneless-3.jpg",
    products: [
      {
        id: "boneless-8",
        name: "8 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 10500, // ≈ ₦10,500 (mid-range bucket pricing)
        rating: "Highly rated",
        calories: "420 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/8boneless.jpg", // Crispy boneless chicken bites
      },
      {
        id: "boneless-10",
        name: "10 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 12800,
        calories: "526 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/10boneless.jpg", // Golden fried tenders
      },
      {
        id: "boneless-12",
        name: "12 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 14800,
        calories: "631 kcal",
        tags: ["Boneless", "Popular"],
        imageUrl: "/menu/boneless/12boneless.jpg", // Pile of crispy boneless pieces
      },
    ],
  },
  // {
  //   id: "tenders",
  //   name: "Tenders",
  //   emoji: "🍗",
  //   description:
  //     "100% all-white chicken breast meat, cooked to order and hand tossed in any of our 10 house flavours",
  //   products: [
  //     {
  //       id: "tenders-3",
  //       name: "3 Pieces Tenders",
  //       description:
  //         "Serious tenders. 100% all-white breast meat and cooked to perfection",
  //       price: 6200,
  //       calories: "337 kcal",
  //       tags: ["Tenders", "Popular"],
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1626645738196-c4427f9106fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Chicken tenders with sauce
  //     },
  //     {
  //       id: "tenders-5",
  //       name: "5 Pieces Tenders",
  //       description:
  //         "Serious tenders. 100% all-white breast meat and cooked to perfection",
  //       price: 8800,
  //       rating: "Highly rated",
  //       calories: "562 kcal",
  //       tags: ["Tenders"],
  //       imageUrl:
  //         "https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Fried chicken tenders
  //     },
  //   ],
  // },
  {
    id: "drinks",
    name: "Drinks",
    emoji: "🥤",
    description: "Refresh yourself with our selection of cold beverages",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "drink-coke-regular",
        name: "Regular Coke",
        description: "Ice-cold classic cola, perfect with any meal",
        price: 600,
        tags: ["Drink", "Popular"],
        imageUrl: "/menu/drinks/regular-coke.jpg", // Coke bottle/can
      },
      {
        id: "drink-coke-zero",
        name: "Coke Zero",
        description: "Zero cola",
        price: 900,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/zero-coke.jpg",
      },
      {
        id: "drink-sprite",
        name: "Sprite",
        description: "Crisp lemon-lime refreshment",
        price: 600,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/sprite.jpg", // Sprite
      },
      {
        id: "drink-fanta",
        name: "Fanta Orange",
        description: "Vibrant fruity taste in a bottle",
        price: 600,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/fanta.jpg", // Orange soda
      },
    ],
  },
  {
    id: "dips",
    name: "Dips",
    emoji: "🍯",
    description: "Add flavor with our signature sauces and dipping options",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "sauce-hot",
        name: "Hot Sauce",
        description: "Extra spicy kick for heat lovers",
        price: 500,
        tags: ["Sauce", "Popular"],
        imageUrl:
          "https://images.unsplash.com/photo-1621861220497-6e22e5ee1608?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Hot sauce dip
      },
      {
        id: "sauce-honey",
        name: "Honey Mustard",
        description: "Sweet and tangy combination",
        price: 500,
        tags: ["Sauce"],
        imageUrl:
          "https://images.unsplash.com/photo-1621861220497-6e22e5ee1608?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sauce-garlic",
        name: "Garlic Mayo",
        description: "Creamy with a garlic punch",
        price: 500,
        tags: ["Sauce"],
        imageUrl:
          "https://images.unsplash.com/photo-1621861220497-6e22e5ee1608?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "sauce-bbq",
        name: "BBQ Sauce",
        description: "Smoky barbecue flavor",
        price: 500,
        tags: ["Sauce"],
        imageUrl:
          "https://images.unsplash.com/photo-1621861220497-6e22e5ee1608?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "addons",
    name: "Add-ons",
    emoji: "🍟",
    description: "Complete your meal with tasty sides and extras",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "addon-fries-regular",
        name: "Regular Fries",
        description: "Crispy golden fries, lightly seasoned",
        price: 1800,
        calories: "350 kcal",
        tags: ["Side", "Popular"],
        imageUrl:
          "https://images.unsplash.com/photo-1585109643930-8d5c9b8b0e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // French fries
      },
      {
        id: "addon-fries-large",
        name: "Large Fries",
        description: "Extra helping of crispy fries",
        price: 2800,
        calories: "500 kcal",
        tags: ["Side"],
        imageUrl:
          "https://images.unsplash.com/photo-1585109643930-8d5c9b8b0e3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      },
      {
        id: "addon-coleslaw",
        name: "Coleslaw",
        description: "Fresh and crispy cabbage mix",
        price: 1500,
        calories: "150 kcal",
        tags: ["Side"],
        imageUrl:
          "https://images.unsplash.com/photo-1625938145319-cb85032e0e8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Coleslaw bowl
      },
      {
        id: "addon-corn",
        name: "Corn Cup",
        description: "Buttery sweet corn side",
        price: 1600,
        calories: "120 kcal",
        tags: ["Side"],
        imageUrl:
          "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // Corn cup/side
      },
    ],
  },
];

// The getSuggestedAddOns function remains unchanged as it references product IDs
// Helper function to get suggested add-ons for a product
export function getSuggestedAddOns(productId: string): SuggestionGroup[] {
  const suggestedAddOnsMap: Record<string, string[]> = {
    // For any boneless/wings/tenders, suggest drinks, sauces, and sides
    "boneless-8": [
      "drink-coke-regular",
      "drink-sprite",
      "sauce-hot",
      "sauce-honey",
      "addon-fries-regular",
      "addon-coleslaw",
    ],
    "boneless-10": [
      "drink-sprite",
      "drink-coke-large",
      "sauce-honey",
      "sauce-garlic",
      "addon-fries-large",
      "addon-corn",
    ],
    "boneless-12": [
      "drink-coke-large",
      "drink-fanta",
      "sauce-garlic",
      "sauce-bbq",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "wings-8": [
      "drink-coke-regular",
      "drink-sprite",
      "sauce-bbq",
      "sauce-hot",
      "addon-fries-regular",
      "addon-corn",
    ],
    "wings-10": [
      "drink-sprite",
      "drink-fanta",
      "sauce-hot",
      "sauce-honey",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "wings-12": [
      "drink-fanta",
      "drink-coke-large",
      "sauce-honey",
      "sauce-garlic",
      "addon-coleslaw",
      "addon-corn",
    ],
    "tenders-3": [
      "drink-coke-regular",
      "drink-sprite",
      "sauce-garlic",
      "sauce-hot",
      "addon-fries-regular",
      "addon-coleslaw",
    ],
    "tenders-5": [
      "drink-sprite",
      "drink-fanta",
      "sauce-bbq",
      "sauce-honey",
      "addon-fries-large",
      "addon-corn",
    ],
  };

  const suggestedIds = suggestedAddOnsMap[productId] || [
    "sauce-hot",
    "sauce-honey",
    "addon-fries-regular",
    "addon-coleslaw",
    "drink-coke-regular",
    "drink-sprite",
  ];

  const suggestionMap = new Map<
    string,
    { categoryName: string; items: Product[] }
  >();

  for (const category of productCategories) {
    for (const product of category.products) {
      if (suggestedIds.includes(product.id)) {
        if (!suggestionMap.has(category.id)) {
          suggestionMap.set(category.id, {
            categoryName: category.name,
            items: [],
          });
        }
        suggestionMap.get(category.id)!.items.push(product);
      }
    }
  }

  const suggestionGroups: SuggestionGroup[] = [];
  for (const [categoryId, { categoryName, items }] of suggestionMap) {
    suggestionGroups.push({
      categoryId,
      category: categoryName,
      items,
    });
  }

  // Sort: dips first, drinks last
  suggestionGroups.sort((a, b) => {
    if (a.categoryId === "dips") return -1;
    if (b.categoryId === "dips") return 1;
    if (a.categoryId === "drinks") return 1;
    if (b.categoryId === "drinks") return -1;
    return 0;
  });

  return suggestionGroups;
}
