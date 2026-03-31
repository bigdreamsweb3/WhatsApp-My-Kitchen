export interface ProductCustomization {
  selectedFlavors: string[];
  selectedItems: Record<string, string[]>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  tags: string[];
  rating?: "Highly rated" | string | number;
  calories?: string;
  wingsCount?: number;
  maxFlavors?: number;
  baseProductId?: string;
  customization?: ProductCustomization;
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
    emoji: "\uD83C\uDF57",
    description: "Crispy fried wings tossed in our signature flavours.",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "box-4u",
        name: "4UBOX",
        description: "6 Wings",
        wingsCount: 6,
        maxFlavors: 1,
        price: 5700,
        tags: ["Wings"],
        imageUrl: "/menu/wings/8wings.jpg",
      },
      {
        id: "box-4u-double",
        name: "4UBOX DOUBLE",
        description: "12 Wings",
        wingsCount: 12,
        maxFlavors: 2,
        price: 11000,
        tags: ["Wings"],
        imageUrl: "/menu/wings/10wings.jpg",
      },
      {
        id: "box-kaybox-special",
        name: "KAYBOX SPECIAL",
        description: "18 Wings",
        wingsCount: 18,
        maxFlavors: 3,
        price: 16000,
        tags: ["Wings", "Popular"],
        imageUrl: "/menu/wings/12wings.jpg",
      },
      {
        id: "box-party-mode",
        name: "PARTY MODE",
        description: "30 Wings",
        wingsCount: 30,
        maxFlavors: 5,
        price: 27000,
        tags: ["Wings"],
        imageUrl: "/menu/wings/30wings.jpg",
      },
    ],
  },
  {
    id: "boneless",
    name: "BONELESS BITES",
    emoji: "\uD83E\uDDB4",
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
    id: "refreshments",
    name: "Refreshments",
    emoji: "\uD83E\uDD64",
    description: "Cold refreshing beverages",
    imageUrl: "/menu/Category-Drinks-3.jpg",
    products: [
      {
        id: "refreshment-water",
        name: "Water",
        description: "Chilled bottled water",
        price: 495,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/water.jpg",
      },
      {
        id: "refreshment-coke",
        name: "Coke",
        description: "Classic Coca-Cola",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/regular-coke.jpg",
      },
      {
        id: "refreshment-fanta",
        name: "Fanta",
        description: "Orange soda refreshment",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/fanta.jpg",
      },
      {
        id: "refreshment-sprite",
        name: "Sprite",
        description: "Lemon-lime refreshment",
        price: 595,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/sprite.jpg",
      },
      {
        id: "refreshment-zero-coke",
        name: "Zero Coke",
        description: "Sugar-free Coca-Cola",
        price: 895,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/zero-coke.jpg",
      },
      {
        id: "refreshment-5alive-small",
        name: "5 Alive Pulpy Orange 30cl",
        description: "Pulpy orange juice",
        price: 1295,
        tags: ["Drink"],
        imageUrl: "/menu/drinks/5alive-small.jpg",
      },
      {
        id: "refreshment-5alive-large",
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
    emoji: "\uD83C\uDF5F",
    description: "Complete your meal with tasty sides",
    imageUrl: "/menu/Category-Wings-3.jpg",
    products: [
      {
        id: "addon-fries-regular",
        name: "Regular Fries",
        description: "Crispy golden fries",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/fries-regular.jpeg",
      },
      // {
      //   id: "addon-fries-regular",
      //   name: "Regular Fries",
      //   description: "Crispy golden fries",
      //   price: 1499,
      //   tags: ["Side"],
      //   imageUrl: "/menu/addons/fries-regular.jpg",
      // },
      // {
      //   id: "addon-fries-large",
      //   name: "Large Fries",
      //   description: "Extra helping of fries",
      //   price: 2499,
      //   tags: ["Side"],
      //   imageUrl: "/menu/addons/fries-large.jpg",
      // },
      {
        id: "addon-plantain",
        name: "Fried Plantain",
        description: "Sweet fried plantain slices",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/plantain.jpeg",
      },
      {
        id: "addon-sweet-corn",
        name: "Sweet Corn",
        description: "Buttery sweet corn",
        price: 1499,
        tags: ["Side"],
        imageUrl: "/menu/addons/sweet-corn.jpeg",
      },
    ],
  },
];
