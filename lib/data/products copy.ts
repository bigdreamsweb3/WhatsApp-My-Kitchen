export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Chicken Combo",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&h=600&fit=crop",
    description: "Crispy chicken with fries and drink",
  },
  {
    id: 2,
    name: "Loaded Fries",
    price: 2000,
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&h=600&fit=crop",
    description: "Golden fries loaded with toppings",
  },
  {
    id: 3,
    name: "Family Pack",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1562967914-608f82629710?w=800&h=600&fit=crop",
    description: "Perfect for sharing with family",
  },
  {
    id: 4,
    name: "Spicy Wings",
    price: 4000,
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=800&h=600&fit=crop",
    description: "Hot and spicy chicken wings",
  },
  {
    id: 5,
    name: "Classic Fries",
    price: 1500,
    image:
      "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&h=600&fit=crop",
    description: "Crispy golden french fries",
  },
  {
    id: 6,
    name: "Turkey Breast",
    price: 5500,
    image:
      "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?w=800&h=600&fit=crop",
    description: "Tender roasted turkey breast",
  },
  {
    id: 7,
    name: "Pickles Jar",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1589621316382-008455b857cd?w=800&h=600&fit=crop",
    description: "Crunchy dill pickles",
  },
  {
    id: 8,
    name: "Special Sauce",
    price: 500,
    image:
      "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&h=600&fit=crop",
    description: "Our signature secret sauce",
  },
];
