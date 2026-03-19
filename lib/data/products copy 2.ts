export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // in NGN
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
    name: "Wings",
    emoji: "🍗",
    description:
      "Our classic chicken wings, fried and tossed in house flavours",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "combo-street-flex",
        name: "Street Flex – 6 Wings + Fries + Drink",
        description:
          "Perfect for one. Crispy wings, golden fries, and a chilled drink—quick, easy, and delicious.",
        price: 7199,
        tags: ["Combo", "Wings"],
        imageUrl: "/menu/wings/street-flex.jpg",
      },
      {
        id: "combo-big-boy",
        name: "Big Boy Combo – 10 Wings + Fries + Drink",
        description:
          "For when you’re hungry and ready to conquer the weekend. Wings piled high with golden fries and a drink to match.",
        price: 11199,
        tags: ["Combo", "Wings"],
        imageUrl: "/menu/wings/big-boy.jpg",
      },
      {
        id: "combo-grill-master",
        name: "Grill Master Combo – 6 Wings + Turkey + Fries + Drink",
        description:
          "The ultimate weekend upgrade. Tender turkey and saucy wings, paired with fries and a drink. Eat like a king.",
        price: 10199,
        tags: ["Combo", "Wings", "Turkey Upgrade"],
        imageUrl: "/menu/wings/grill-master.jpg",
      },
      {
        id: "combo-shutdown-feast",
        name: "Shutdown Feast – 20 Wings + 2 Turkey + 2 Fries + 2 Drinks",
        description:
          "Group vibes only. Share, feast, and flex with friends—our biggest combo yet!",
        price: 24199,
        tags: ["Combo", "Wings", "Turkey Upgrade"],
        imageUrl: "/menu/wings/shutdown-feast.jpg",
      },
    ],
  },

  // {
  //   id: "boneless",
  //   name: "Boneless",
  //   emoji: "🦴",
  //   description:
  //     "100% all-white chicken breast meat, hand tossed in any of our 10 house flavours",
  //   imageUrl: "/menu/Category-Boneless-3.jpg",
  //   products: [
  //     {
  //       id: "boneless-8",
  //       name: "8 Pieces Boneless",
  //       description:
  //         "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
  //       price: 10500, // ≈ ₦10,500 (mid-range bucket pricing)
  //       rating: "Highly rated",
  //       calories: "420 kcal",
  //       tags: ["Boneless"],
  //       imageUrl: "/menu/boneless/8boneless.jpg", // Crispy boneless chicken bites
  //     },
  //     {
  //       id: "boneless-10",
  //       name: "10 Pieces Boneless",
  //       description:
  //         "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
  //       price: 12800,
  //       calories: "526 kcal",
  //       tags: ["Boneless"],
  //       imageUrl: "/menu/boneless/10boneless.jpg", // Golden fried tenders
  //     },
  //     {
  //       id: "boneless-12",
  //       name: "12 Pieces Boneless",
  //       description:
  //         "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
  //       price: 14800,
  //       calories: "631 kcal",
  //       tags: ["Boneless", "Popular"],
  //       imageUrl: "/menu/boneless/12boneless.jpg", // Pile of crispy boneless pieces
  //     },
  //   ],
  // },

  {
    id: "tenders",
    name: "Tenders",
    emoji: "🍗",
    description: "Crispy, juicy tenders hand tossed in house flavours",
    imageUrl: "/menu/Category-Tenders.jpg",
    products: [
      {
        id: "combo-tender-flex",
        name: "Tender Flex – 4 Tenders + Fries + Drink",
        description:
          "Perfect solo snack or light meal. Crispy, juicy tenders with golden fries and a chilled drink.",
        price: 6199,
        tags: ["Combo", "Tenders"],
        imageUrl: "/menu/tenders/tender-flex.jpg",
      },
      {
        id: "combo-big-tender",
        name: "Big Tender Combo – 6 Tenders + Fries + Drink",
        description:
          "For the hunger that won’t quit. Tender bites piled high with fries and your favorite drink.",
        price: 8799,
        tags: ["Combo", "Tenders"],
        imageUrl: "/menu/tenders/big-tender.jpg",
      },
      {
        id: "combo-tender-feast",
        name: "Tender Feast – 10 Tenders + Fries + Drink",
        description:
          "Bigger appetite? Bigger combo. Crispy, seasoned tenders, fries, and a refreshing drink.",
        price: 12599,
        tags: ["Combo", "Tenders"],
        imageUrl: "/menu/tenders/tender-feast.jpg",
      },
      {
        id: "combo-family-tender",
        name: "Family Tender Pack – 20 Tenders + 2 Fries + 2 Drinks",
        description:
          "Perfect for sharing. Make it a feast with family or friends. Crispy, juicy, and unforgettable.",
        price: 23999,
        tags: ["Combo", "Tenders"],
        imageUrl: "/menu/tenders/family-tender.jpg",
      },
    ],
  },

  {
    id: "flavors",
    name: "Flavors",
    emoji: "🌶",
    description: "Choose your preferred flavor for wings, tenders, or nuggets",
    imageUrl: "/menu/Category-Flavors.jpg",
    products: [
      {
        id: "flavor-lagos-heat",
        name: "Lagos Heat (Peppered)",
        description: "Spicy, smoky, and full of Lagos street flavor.",
        price: 0,
        tags: ["Flavor"],
        imageUrl: "",
      },
      {
        id: "flavor-sweet-escape",
        name: "Sweet Escape (Honey BBQ)",
        description: "Sticky, sweet, and perfectly glazed.",
        price: 0,
        tags: ["Flavor"],
        imageUrl: "",
      },
      {
        id: "flavor-garlic-rush",
        name: "Garlic Rush (Garlic Butter)",
        description: "Rich, buttery, garlicky goodness in every bite.",
        price: 0,
        tags: ["Flavor"],
        imageUrl: "",
      },
      {
        id: "flavor-suya-storm",
        name: "Suya Storm (Nigerian Suya Spice)",
        description: "Bold, peppery, and full of local spice.",
        price: 0,
        tags: ["Flavor"],
        imageUrl: "",
      },
      {
        id: "flavor-kayturks",
        name: "KayTuRks Special (House Signature)",
        description: "Our secret blend of sweet, heat, and smoky goodness.",
        price: 0,
        tags: ["Flavor"],
        imageUrl: "",
      },
    ],
  },

  {
    id: "drinks",
    name: "Drinks",
    emoji: "🥤",
    description: "Refresh yourself with our selection of cold beverages",
    imageUrl: "/menu/Category-Drinks.jpg",
    products: [
      {
        id: "drink-coke-regular",
        name: "Regular Coke",
        description: "Ice-cold classic cola, perfect with any meal",
        price: 600,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/regular-coke.jpg",
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
        imageUrl: "/menu/drinks/sprite.jpg",
      },
      {
        id: "drink-fanta",
        name: "Fanta Orange",
        description: "Vibrant fruity taste in a bottle",
        price: 600,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/fanta.jpg",
      },
    ],
  },

  {
    id: "dips",
    name: "Dips",
    emoji: "🍯",
    description: "Add flavor with our signature sauces and dipping options",
    imageUrl: "/menu/Category-Dips.jpg",
    products: [
      {
        id: "sauce-hot",
        name: "Hot Sauce",
        description: "Extra spicy kick for heat lovers",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/dips/hot-sauce.jpg",
      },
      {
        id: "sauce-honey",
        name: "Honey Mustard",
        description: "Sweet and tangy combination",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/dips/honey-mustard.jpg",
      },
      {
        id: "sauce-garlic",
        name: "Garlic Mayo",
        description: "Creamy with a garlic punch",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/dips/garlic-mayo.jpg",
      },
      {
        id: "sauce-bbq",
        name: "BBQ Sauce",
        description: "Smoky barbecue flavor",
        price: 500,
        tags: ["Sauce"],
        imageUrl: "/menu/dips/bbq-sauce.jpg",
      },
    ],
  },

  {
    id: "addons",
    name: "Add-ons",
    emoji: "🍟",
    description: "Complete your meal with tasty sides and extras",
    imageUrl: "/menu/Category-Addons.jpg",
    products: [
      {
        id: "addon-fries-regular",
        name: "Regular Fries",
        description: "Crispy golden fries, lightly seasoned",
        price: 1800,
        calories: "350 kcal",
        tags: ["Side"],
        imageUrl: "/menu/addons/fries-regular.jpg",
      },
      {
        id: "addon-fries-large",
        name: "Large Fries",
        description: "Extra helping of crispy fries",
        price: 2800,
        calories: "500 kcal",
        tags: ["Side"],
        imageUrl: "/menu/addons/fries-large.jpg",
      },
      {
        id: "addon-coleslaw",
        name: "Coleslaw",
        description: "Fresh and crispy cabbage mix",
        price: 1500,
        calories: "150 kcal",
        tags: ["Side"],
        imageUrl: "/menu/addons/coleslaw.jpg",
      },
      {
        id: "addon-corn",
        name: "Corn Cup",
        description: "Buttery sweet corn side",
        price: 1600,
        calories: "120 kcal",
        tags: ["Side"],
        imageUrl: "/menu/addons/corn.jpg",
      },
    ],
  },
];

// Suggested Add-ons logic
export function getSuggestedAddOns(productId: string): SuggestionGroup[] {
  const suggestedAddOnsMap: Record<string, string[]> = {
    "combo-street-flex": [
      "drink-coke-regular",
      "drink-sprite",
      "sauce-hot",
      "sauce-honey",
      "addon-fries-regular",
      "addon-coleslaw",
    ],
    "combo-big-boy": [
      "drink-sprite",
      "drink-fanta",
      "sauce-hot",
      "sauce-honey",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "combo-grill-master": [
      "drink-coke-regular",
      "drink-fanta",
      "sauce-garlic",
      "sauce-bbq",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "combo-shutdown-feast": [
      "drink-coke-regular",
      "drink-fanta",
      "sauce-bbq",
      "sauce-hot",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "combo-tender-flex": [
      "drink-coke-regular",
      "drink-sprite",
      "sauce-hot",
      "sauce-garlic",
      "addon-fries-regular",
      "addon-coleslaw",
    ],
    "combo-big-tender": [
      "drink-sprite",
      "drink-fanta",
      "sauce-honey",
      "sauce-bbq",
      "addon-fries-large",
      "addon-corn",
    ],
    "combo-tender-feast": [
      "drink-coke-regular",
      "drink-fanta",
      "sauce-garlic",
      "sauce-bbq",
      "addon-fries-large",
      "addon-coleslaw",
    ],
    "combo-family-tender": [
      "drink-coke-regular",
      "drink-fanta",
      "sauce-hot",
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
    suggestionGroups.push({ categoryId, category: categoryName, items });
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
