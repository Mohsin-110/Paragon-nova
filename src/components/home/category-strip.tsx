import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/mock-data";

export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brass-dark">
            Browse
          </p>
          <h2 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">
            Shop by category
          </h2>
        </div>
        <Link href="/categories" className="hidden text-sm font-medium text-ink hover:underline underline-offset-4 sm:block">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="group">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-canvas">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(min-width: 1024px) 16vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-sm font-medium text-paper">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
