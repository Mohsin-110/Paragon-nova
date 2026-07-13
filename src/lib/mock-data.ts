import { Category, Product, ReviewItem } from "./types";

const img = (seed: string, w = 900, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = [
  {
    slug: "audio",
    name: "Audio",
    description: "Headphones, speakers, and turntables",
    image: img("marque-audio", 800, 600),
    productCount: 42,
  },
  {
    slug: "home",
    name: "Home & Living",
    description: "Kitchen, decor, and everyday objects",
    image: img("marque-home", 800, 600),
    productCount: 118,
  },
  {
    slug: "apparel",
    name: "Apparel",
    description: "Considered basics and outerwear",
    image: img("marque-apparel", 800, 600),
    productCount: 76,
  },
  {
    slug: "tech",
    name: "Tech & Accessories",
    description: "Cases, chargers, and small electronics",
    image: img("marque-tech", 800, 600),
    productCount: 63,
  },
  {
    slug: "outdoors",
    name: "Outdoors",
    description: "Gear built for daily carry and travel",
    image: img("marque-outdoors", 800, 600),
    productCount: 39,
  },
  {
    slug: "beauty",
    name: "Beauty & Care",
    description: "Skincare and grooming staples",
    image: img("marque-beauty", 800, 600),
    productCount: 54,
  },
];

export const brands = [
  "Marque Studio",
  "Norrland",
  "Fielding & Co",
  "Kessler Home",
  "Atlas Supply",
  "Verdant",
];

function makeProduct(p: {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  flags?: Partial<
    Pick<Product, "isNew" | "isBestSeller" | "isTrending" | "isFlashSale">
  >;
}): Product {
  const slug = p.id;
  return {
    id: p.id,
    slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    compareAtPrice: p.compareAtPrice,
    currency: "USD",
    rating: p.rating,
    reviewCount: p.reviewCount,
    images: [img(slug + "-1"), img(slug + "-2"), img(slug + "-3"), img(slug + "-4")],
    description:
      "Made from responsibly sourced materials and finished by hand, this piece is built to earn a permanent spot in daily use rather than a drawer. Every detail — from the stitching to the hardware — was chosen to age well.",
    features: [
      "Responsibly sourced materials",
      "Finished and inspected by hand",
      "Backed by a 2-year workmanship warranty",
      "Ships in reusable, plastic-free packaging",
    ],
    specifications: {
      Material: "Solid oak / full-grain leather",
      Weight: "1.4 kg",
      Dimensions: "24 × 18 × 9 cm",
      "Country of origin": "Portugal",
      Warranty: "2 years",
    },
    stock: p.tags.includes("low-stock") ? 3 : 24,
    sku: `MRQ-${p.id.toUpperCase()}`,
    tags: p.tags,
    variants: [
      { id: "v1", label: "Walnut", swatch: "#6B4A32", inStock: true },
      { id: "v2", label: "Ash", swatch: "#D8D2C4", inStock: true },
      { id: "v3", label: "Charcoal", swatch: "#33363B", inStock: p.id !== "table-lamp" },
    ],
    isNew: p.flags?.isNew,
    isBestSeller: p.flags?.isBestSeller,
    isTrending: p.flags?.isTrending,
    isFlashSale: p.flags?.isFlashSale,
    flashSaleEndsAt: p.flags?.isFlashSale
      ? new Date(Date.now() + 1000 * 60 * 60 * 6).toISOString()
      : undefined,
    shipping: {
      estimate: "3–5 business days",
      freeOver: 75,
    },
  };
}

export const products: Product[] = [
  makeProduct({
    id: "aria-headphones",
    name: "Aria Over-Ear Headphones",
    brand: "Marque Studio",
    category: "audio",
    price: 189,
    compareAtPrice: 240,
    rating: 4.7,
    reviewCount: 312,
    tags: ["wireless", "noise-cancelling"],
    flags: { isBestSeller: true, isFlashSale: true },
  }),
  makeProduct({
    id: "field-tote",
    name: "Field Canvas Tote",
    brand: "Fielding & Co",
    category: "apparel",
    price: 68,
    rating: 4.5,
    reviewCount: 128,
    tags: ["canvas", "everyday-carry"],
    flags: { isNew: true },
  }),
  makeProduct({
    id: "table-lamp",
    name: "Halden Table Lamp",
    brand: "Kessler Home",
    category: "home",
    price: 96,
    compareAtPrice: 120,
    rating: 4.8,
    reviewCount: 87,
    tags: ["lighting", "low-stock"],
    flags: { isTrending: true },
  }),
  makeProduct({
    id: "trail-jacket",
    name: "Trail Shell Jacket",
    brand: "Norrland",
    category: "outdoors",
    price: 214,
    rating: 4.6,
    reviewCount: 201,
    tags: ["waterproof", "packable"],
    flags: { isBestSeller: true },
  }),
  makeProduct({
    id: "ceramic-pourover",
    name: "Ceramic Pour-Over Set",
    brand: "Kessler Home",
    category: "home",
    price: 54,
    rating: 4.9,
    reviewCount: 156,
    tags: ["kitchen", "handmade"],
    flags: { isNew: true, isTrending: true },
  }),
  makeProduct({
    id: "recycled-backpack",
    name: "Ridge Recycled Backpack",
    brand: "Atlas Supply",
    category: "outdoors",
    price: 128,
    compareAtPrice: 155,
    rating: 4.4,
    reviewCount: 94,
    tags: ["recycled", "laptop-sleeve"],
    flags: { isFlashSale: true },
  }),
  makeProduct({
    id: "wool-throw",
    name: "Merino Wool Throw",
    brand: "Verdant",
    category: "home",
    price: 88,
    rating: 4.7,
    reviewCount: 63,
    tags: ["wool", "low-stock"],
  }),
  makeProduct({
    id: "charge-dock",
    name: "Modular Charge Dock",
    brand: "Marque Studio",
    category: "tech",
    price: 59,
    rating: 4.3,
    reviewCount: 210,
    tags: ["wireless-charging"],
    flags: { isTrending: true },
  }),
  makeProduct({
    id: "linen-shirt",
    name: "Relaxed Linen Shirt",
    brand: "Fielding & Co",
    category: "apparel",
    price: 78,
    rating: 4.5,
    reviewCount: 142,
    tags: ["linen", "summer"],
    flags: { isNew: true },
  }),
  makeProduct({
    id: "grooming-kit",
    name: "Essential Grooming Kit",
    brand: "Verdant",
    category: "beauty",
    price: 46,
    compareAtPrice: 58,
    rating: 4.6,
    reviewCount: 178,
    tags: ["travel-size"],
    flags: { isFlashSale: true },
  }),
  makeProduct({
    id: "oak-stool",
    name: "Oak Counter Stool",
    brand: "Kessler Home",
    category: "home",
    price: 145,
    rating: 4.8,
    reviewCount: 51,
    tags: ["solid-wood"],
    flags: { isBestSeller: true },
  }),
  makeProduct({
    id: "phone-case",
    name: "Leather Phone Case",
    brand: "Marque Studio",
    category: "tech",
    price: 42,
    rating: 4.2,
    reviewCount: 266,
    tags: ["leather"],
  }),
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);
}

export const reviews: Record<string, ReviewItem[]> = Object.fromEntries(
  products.map((p) => [
    p.id,
    [
      {
        id: p.id + "-r1",
        author: "J. Alvarez",
        rating: 5,
        date: "2026-05-12",
        title: "Better than expected",
        body: "The build quality is obvious the moment you pick it up. It's replaced the cheaper version I had for two years.",
        verified: true,
      },
      {
        id: p.id + "-r2",
        author: "M. Chen",
        rating: 4,
        date: "2026-04-02",
        title: "Great, minor shipping delay",
        body: "Product itself is excellent. Arrived two days later than estimated but well packaged and no damage.",
        verified: true,
      },
      {
        id: p.id + "-r3",
        author: "R. Okafor",
        rating: 5,
        date: "2026-03-19",
        title: "Worth the price",
        body: "Was hesitant about the price point but after a month of daily use, it's earned it.",
        verified: false,
      },
    ],
  ])
);

export const testimonials = [
  {
    id: "t1",
    author: "Priya S.",
    quote:
      "The curation is what keeps me coming back — every category feels edited instead of endless.",
    role: "Verified customer",
  },
  {
    id: "t2",
    author: "Daniel W.",
    quote:
      "Packaging, delivery speed, and support have all been consistently better than the bigger marketplaces.",
    role: "Verified customer",
  },
  {
    id: "t3",
    author: "Hana K.",
    quote: "Returned one item and the process took less than five minutes. No complaints.",
    role: "Verified customer",
  },
];
