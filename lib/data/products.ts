export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  rating?: "Highly rated" | string | number;
  calories?: string;
  tags: string[];
  imageUrl: string; // now required – all products have one
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
  products: Product[];
}

export const productCategories: Category[] = [
  // {
  //   id: "meal-deals",
  //   name: "Meal Deals",
  //   emoji: "🎁",
  //   description: "Good value everyday",
  //   products: [
  //     {
  //       id: "flavor-fix-wings",
  //       name: '"The Flavour Fix" Wings (For 1)',
  //       description: "8 wings, 3 tenders and regular seasoned fries",
  //       price: "17.50",
  //       rating: "Highly rated",
  //       calories: "1467 kcal",
  //       tags: ["Popular", "Wings"],
  //       imageUrl:
  //         "https://images.pexels.com/photos/7734563/pexels-photo-7734563.jpeg?auto=compress&cs=tinysrgb&w=800",
  //     },
  //     {
  //       id: "flavor-fix-boneless",
  //       name: '"The Flavour Fix" Boneless (For 1)',
  //       description: "8 boneless, 3 tenders and regular seasoned fries",
  //       price: "17.50",
  //       rating: "Highly rated",
  //       calories: "1264 kcal",
  //       tags: ["Popular", "Boneless"],
  //       imageUrl:
  //         "https://onestophalal.com/cdn/shop/articles/chicken_tenders_and_fries_1200x.jpg?v=1719876668",
  //     },
  //     {
  //       id: "flavor-craver",
  //       name: '"The Flavour Craver" (For 2)',
  //       description:
  //         "12 wings, 12 boneless, 3 tenders, large seasoned fries and 2 dips",
  //       price: "29.50",
  //       // rating: null,
  //       // calories: null,
  //       tags: ["For 2"],
  //       imageUrl:
  //         "https://thumbs.dreamstime.com/b/appetizing-close-up-platter-featuring-crispy-fried-chicken-wings-coated-sweet-savory-glaze-sprinkled-sesame-407932981.jpg",
  //     },
  //     {
  //       id: "crowd-pleaser",
  //       name: '"The Crowd Pleaser" (For 5 or more)',
  //       description: "50 wings, 50 boneless, 3 large seasoned fries and 6 dips",
  //       price: "100.00",
  //       // rating: null,
  //       // calories: null,
  //       tags: ["For Groups"],
  //       imageUrl:
  //         "https://tb-static.uber.com/prod/image-proc/processed_images/c36c19dd84b2e9ed89e1062442dc38bb/268ee1a1296808aa6eae11eb597de84d.jpeg",
  //     },
  //   ],
  // },
  {
    id: "boneless",
    name: "Boneless",
    emoji: "🦴",
    description:
      "100% all-white chicken breast meat, hand tossed in any of our 10 house flavours",
    products: [
      {
        id: "boneless-8",
        name: "8 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 9.25,
        rating: "Highly rated",
        calories: "420 kcal",
        tags: ["Boneless"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/crispy-fried-chicken-tenders-creamy-dipping-sauce-fresh-parsley-garnish-generative-ai-golden-brown-being-dipped-437133664.jpg",
      },
      {
        id: "boneless-10",
        name: "10 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 11.25,
        // rating: null,
        calories: "526 kcal",
        tags: ["Boneless"],
        imageUrl:
          "https://www.thedailymeal.com/img/gallery/6-best-and-6-worst-fast-food-chicken-tenders/intro-1711554292.jpg",
      },
      {
        id: "boneless-12",
        name: "12 Pieces Boneless",
        description:
          "No bones about it. 100% all-white breast meat. 0% bones & 110% flavour",
        price: 12.5,
        // rating: null,
        calories: "631 kcal",
        tags: ["Boneless", "Popular"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/crispy-golden-chicken-tenders-arranged-neatly-white-plate-accompanied-small-bowl-rich-red-dipping-sauce-creating-397021623.jpg",
      },
    ],
  },
  {
    id: "wings",
    name: "Wings",
    emoji: "🍗",
    description:
      "Our classic chicken wings are naked, fried and hand tossed in any of our 10 house flavours",
    products: [
      {
        id: "wings-8",
        name: "8 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 9.5,
        // rating: null,
        calories: "623 kcal",
        tags: ["Wings"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/close-up-photo-crispy-fried-chicken-wings-appetizing-golden-brown-covered-sauce-food-white-background-editorial-421300388.jpg",
      },
      {
        id: "wings-10",
        name: "10 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 11.25,
        // rating: null,
        calories: "778 kcal",
        tags: ["Wings"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/crispy-fried-chicken-wings-close-up-appetizing-dish-metallic-grid-golden-brown-color-juicy-tender-meat-tasty-snack-fast-food-385075798.jpg",
      },
      {
        id: "wings-12",
        name: "12 Pieces Wings",
        description:
          "Our classic wings are naked fried, 10 ways to get your flavour on",
        price: 12.5,
        // rating: null,
        calories: "932 kcal",
        tags: ["Wings"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/close-up-shot-showcases-delectable-serving-fried-chicken-wings-their-crispy-golden-brown-skin-contrasting-dark-400904288.jpg",
      },
    ],
  },
  {
    id: "tenders",
    name: "Tenders",
    emoji: "🍗",
    description:
      "100% all-white chicken breast meat, cooked to order and hand tossed in any of our 10 house flavours",
    products: [
      {
        id: "tenders-3",
        name: "3 Pieces Tenders",
        description:
          "Serious tenders. 100% all-white breast meat and cooked to perfection",
        price: 6.25,
        // rating: null,
        calories: "337 kcal",
        tags: ["Tenders", "Popular"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/crispy-chicken-tenders-spicy-sauce-clean-white-surface-food-delight-delicious-displayed-vibrant-offering-visually-382451407.jpg",
      },
      {
        id: "tenders-5",
        name: "5 Pieces Tenders",
        description:
          "Serious tenders. 100% all-white breast meat and cooked to perfection",
        price: 8.75,
        rating: "Highly rated",
        calories: "562 kcal",
        tags: ["Tenders"],
        imageUrl:
          "https://thumbs.dreamstime.com/b/crispy-fried-chicken-tenders-creamy-dipping-sauce-fresh-parsley-garnish-generative-ai-golden-brown-being-dipped-437133664.jpg",
      },
    ],
  },
];
