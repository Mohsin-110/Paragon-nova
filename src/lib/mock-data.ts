import { Category, Product, ReviewItem } from "./types";

const img = (seed: string, w = 900, h = 900) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const categories: Category[] = [
  {
    slug: "audio",
    name: "Audio",
    description: "Headphones, speakers, and turntables",
    // 👉 Paste your real category photo URL below, or leave as-is to keep the placeholder.
    
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981386/360_F_505193254_3JQTXRqqvDnwm94Iqg4RYHI7rnci5rNS_cdckud.jpg",
    productCount: 42,
  },
  {
    slug: "home",
    name: "Home & Living",
    description: "Kitchen, decor, and everyday objects",
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981297/samples/chair-and-coffee-table.jpg",
    productCount: 118,
  },
  {
    slug: "apparel",
    name: "Apparel",
    description: "Considered basics and outerwear",
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983372/DROPTWOLinenShirtGraniteGrey_1172copy_xhnbtn.jpg",
    productCount: 76,
  },
  {
    slug: "tech",
    name: "Tech & Accessories",
    description: "Cases, chargers, and small electronics",
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982071/Bare_Skin_Case_for_iPhone_15_Pro_and_15_Pro_Max_-_Full-Grain_Leather_Case_with_MagSafe_for_iPhone_15_Pro_and_15_Pro_Max_-_Saddle_Brown_-_Patina_-_New_wsxzg9.jpg",
    productCount: 63,
  },
  {
    slug: "outdoors",
    name: "Outdoors",
    description: "Gear built for daily carry and travel",
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982126/Eddie-Bauer-Soft-Shell-Jacket-Black-Model_xgjfpb.jpg",
    productCount: 39,
  },
  {
    slug: "beauty",
    name: "Beauty & Care",
    description: "Skincare and grooming staples",
    image: "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982221/71ORuF4SSXL._AC_UF1000_1000_QL80__dp7tln.jpg",
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
  // 👉 NEW: pass real photo URLs here to override the placeholder images.
  // If omitted, the product falls back to picsum placeholders automatically.
  images?: string[];
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
    // Uses your real images if provided, otherwise falls back to placeholders.
    images:
      p.images && p.images.length > 0
        ? p.images
        : [img(slug + "-1"), img(slug + "-2"), img(slug + "-3"), img(slug + "-4")],
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
    // 👉 Paste your real photo URLs here, e.g.:
    // images: [
    //   "https://res.cloudinary.com/your-cloud-name/image/upload/v123/aria-1.jpg",
    //   "https://res.cloudinary.com/your-cloud-name/image/upload/v123/aria-2.jpg",
    // ],
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981655/51eT5n6URQL._AC_UF1000_1000_QL80__njqsbt.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983238/51rpbVmi9XL._AC_UF894_1000_QL80__hqx0th.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983238/0081006114507_yfl03q.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983338/D81138-208-High-3_vmt5zs.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983337/D81138-208-High-2_voiz8m.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983337/D81138-208-Low-1_fcjkrx.png",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981729/images_jbaxlr.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981729/images_jbaxlr.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981729/images_jbaxlr.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982126/Eddie-Bauer-Soft-Shell-Jacket-Black-Model_xgjfpb.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981789/images_n395g3.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982174/1MAB003_0BLK_nt2so6.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983264/Wool_throw_camel_1_2000x_y7sv8a.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981887/Ellei_Home_Handmade_Merino_Wool_Blankets-14_4c27d0a1-3f6e-4542-82df-d677624c14ad_1000x1000_d7yk2h.jpg"
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982033/6736d74953698217_WIZ052ttWH-ultracharge-modular-charging-dock-webgg-01-hero_cqzk27.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983386/45788d81f2cd2655_BBB014-SA-ultracharge-modular-charging-dock_E2_80_8B-webgg-01-hero_qkkgig.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983386/33fc60b04204a622_WIZ052ttBK-ultracharge-modular-charging-dock-webgg-01-hero_sgpyfo.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983373/VenroyFlatLay-Mens-OversizedLinenLSShirt-GraniteGrey_qwq6zb.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983372/DROPTWOLinenShirtGraniteGrey_1172copy_xhnbtn.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983372/DN1CA-L006-700-S26_DN_ECOMSS26_DAY28653__LAVORATA_iprd9s.jpg"
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982221/71ORuF4SSXL._AC_UF1000_1000_QL80__dp7tln.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982221/71ORuF4SSXL._AC_UF1000_1000_QL80__dp7tln.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982221/71ORuF4SSXL._AC_UF1000_1000_QL80__dp7tln.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783981928/Hampton_Counter_Stool_White_Oak1_hb741x.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783983305/FH-246442-002_FRT_1__05919.1779289025_oipmtb.jpg",
    ],
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
    images: [
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982071/Bare_Skin_Case_for_iPhone_15_Pro_and_15_Pro_Max_-_Full-Grain_Leather_Case_with_MagSafe_for_iPhone_15_Pro_and_15_Pro_Max_-_Saddle_Brown_-_Patina_-_New_wsxzg9.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982071/Bare_Skin_Case_for_iPhone_15_Pro_and_15_Pro_Max_-_Full-Grain_Leather_Case_with_MagSafe_for_iPhone_15_Pro_and_15_Pro_Max_-_Saddle_Brown_-_Patina_-_New_wsxzg9.jpg",
      "https://res.cloudinary.com/v5qnf2rl/image/upload/v1783982071/Bare_Skin_Case_for_iPhone_15_Pro_and_15_Pro_Max_-_Full-Grain_Leather_Case_with_MagSafe_for_iPhone_15_Pro_and_15_Pro_Max_-_Saddle_Brown_-_Patina_-_New_wsxzg9.jpg",
    ],
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