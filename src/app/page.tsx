import { Hero } from "@/components/home/hero";
import { CategoryStrip } from "@/components/home/category-strip";
import { FlashSale } from "@/components/home/flash-sale";
import { ProductRail } from "@/components/home/product-rail";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";
import { products } from "@/lib/mock-data";

export default function Home() {
  const bestSellers = products.filter((p) => p.isBestSeller);
  const trending = products.filter((p) => p.isTrending);
  const recentlyAdded = products.filter((p) => p.isNew);

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FlashSale />
      <ProductRail
        eyebrow="Popular"
        title="Best sellers"
        products={bestSellers}
        viewAllHref="/shop"
      />
      <ProductRail
        eyebrow="Right now"
        title="Trending"
        products={trending}
        viewAllHref="/shop"
      />
      <ProductRail
        eyebrow="Just in"
        title="Recently added"
        products={recentlyAdded}
        viewAllHref="/shop"
      />
      <WhyChooseUs />
      <Testimonials />
      <Newsletter />
    </>
  );
}
