export interface Flavor {
  id: string;
  name: string;
  description: string;
  emoji?: string;
}

export const flavors: Flavor[] = [
  {
    id: "lagos-heat",
    name: "Lagos Heat",
    emoji: "🌶",
    description:
      "Spicy, tasty, and full of Lagos street flavor. Not for the faint-hearted.",
  },
  {
    id: "sweet-escape",
    name: "Sweet Escape",
    emoji: "🍯",
    description:
      "Sticky, sweet, and perfectly glazed. For those who love a soft balance to their heat.",
  },
  {
    id: "garlic-rush",
    name: "Garlic Rush",
    emoji: "🧄",
    description:
      "Rich, buttery, garlicky goodness in every bite. Classic never goes out of style.",
  },
  {
    id: "suya-storm",
    name: "Suya Storm",
    emoji: "🌪",
    description:
      "Bold, peppery, and full of local spice. A true taste of Naija flair.",
  },
  {
    id: "kayturks-special",
    name: "KayTuRks Special",
    emoji: "⭐",
    description: "Our secret blend of sweet, heat, and tasty goodness.",
  },
];
