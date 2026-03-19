export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
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
    description: "Crispy fried wings tossed in our signature flavours.",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "box-4u",
        name: "4UBOX",
        description: "6 Wings, 1 flavour",
        price: 5700,
        tags: ["Wings"],
        imageUrl: "/menu/wings/8wings.jpg",
      },
      {
        id: "box-4u-double",
        name: "4UBOX DOUBLE",
        description: "12 Wings, 2 flavours",
        price: 11000,
        tags: ["Wings"],
        imageUrl: "/menu/wings/10wings.jpg",
      },
      {
        id: "box-kaybox-special",
        name: "KAYBOX SPECIAL",
        description: "18 Wings, 3 flavours",
        price: 16000,
        tags: ["Wings", "Popular"],
        imageUrl: "/menu/wings/12wings.jpg",
      },
      {
        id: "box-party-mode",
        name: "PARTY MODE",
        description: "30 Wings with 5 flavours",
        price: 27000,
        tags: ["Wings"],
        imageUrl: "/menu/wings/30wings.jpg",
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
        price: 10500,
        rating: "Highly rated",
        calories: "420 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/8boneless.jpg",
      },
      {
        id: "boneless-10",
        name: "10 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 12800,
        calories: "526 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/10boneless.jpg",
      },
      {
        id: "boneless-12",
        name: "12 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 14800,
        calories: "631 kcal",
        tags: ["Boneless"],
        imageUrl: "/menu/boneless/12boneless.jpg",
      },
    ],
  },

  {
    id: "refreshment",
    name: "REFRESHMENT",
    emoji: "🥤",
    description: "Cold refreshing beverages",
    imageUrl: "/menu/Category-Drinks-3.jpg",
    products: [
      {
        id: "drink-water",
        name: "Water",
        description: "Chilled bottled water",
        price: 495,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/water.jpg",
      },
      {
        id: "drink-coke",
        name: "Coke",
        description: "Classic Coca-Cola",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/regular-coke.jpg",
      },
      {
        id: "drink-fanta",
        name: "Fanta",
        description: "Orange soda refreshment",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/fanta.jpg",
      },
      {
        id: "drink-sprite",
        name: "Sprite",
        description: "Lemon-lime refreshment",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/sprite.jpg",
      },
      {
        id: "drink-zero-coke",
        name: "Zero Coke",
        description: "Sugar-free Coca-Cola",
        price: 895,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/zero-coke.jpg",
      },
      {
        id: "drink-5alive-small",
        name: "5 Alive Pulpy Orange 30cl",
        description: "Pulpy orange juice",
        price: 1295,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/5alive-small.jpg",
      },
      {
        id: "drink-5alive-large",
        name: "5 Alive Pulpy Orange 85cl",
        description: "Large pulpy orange juice",
        price: 2295,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/5alive-large.jpg",
      },
    ],
  },

  {
    id: "addons",
    name: "ADD-ONS",
    emoji: "🍟",
    description: "Complete your meal with tasty sides",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "addon-fries-regular",
        name: "Regular Fries",
        description: "Crispy golden fries",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/fries-regular.jpg",
      },
      {
        id: "addon-fries-large",
        name: "Large Fries",
        description: "Extra helping of fries",
        price: 2499,
        tags: ["Side"],
        imageUrl: "/menu/addons/fries-large.jpg",
      },
      {
        id: "addon-plantain",
        name: "Fried Plantain",
        description: "Sweet fried plantain slices",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/plantain.jpg",
      },
      {
        id: "addon-sweet-corn",
        name: "Sweet Corn",
        description: "Buttery sweet corn",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/sweet-corn.jpg",
      },
    ],
  },

  {
    id: "dips",
    name: "DIPS",
    emoji: "🍯",
    description: "Add flavor with our signature sauces",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "sauce-hot",
        name: "Hot Sauce",
        description: "Extra spicy kick",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/sauces/hot.jpg",
      },
      {
        id: "sauce-honey",
        name: "Honey Mustard",
        description: "Sweet and tangy",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/sauces/honey.jpg",
      },
      {
        id: "sauce-garlic",
        name: "Garlic Mayo",
        description: "Creamy garlic dip",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/sauces/garlic.jpg",
      },
      {
        id: "sauce-bbq",
        name: "BBQ Sauce",
        description: "Smoky barbecue flavor",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/sauces/bbq.jpg",
      },
    ],
  },
];

export function getSuggestedAddOns(productId: string): SuggestionGroup[] {
  const suggestedAddOnsMap: Record<string, string[]> = {
    "box-4u": [
      "drink-coke",
      "drink-sprite",
      "sauce-hot",
      "addon-fries-regular",
    ],
    "box-4u-double": [
      "drink-fanta",
      "drink-sprite",
      "sauce-honey",
      "addon-fries-large",
    ],
    "box-kaybox-special": [
      "drink-zero-coke",
      "drink-5alive-small",
      "sauce-garlic",
      "addon-plantain",
    ],
    "box-party-mode": [
      "drink-5alive-large",
      "drink-fanta",
      "sauce-bbq",
      "addon-fries-large",
      "addon-sweet-corn",
    ],
  };

  const suggestedIds = suggestedAddOnsMap[productId] || [
    "sauce-hot",
    "addon-fries-regular",
    "drink-coke",
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

  return suggestionGroups;
}
