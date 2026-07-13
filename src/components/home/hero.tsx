"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center rounded-full border border-ink/12 bg-paper px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted"
          >
            New season, six categories
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-5 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            The good stuff,
            <br />
            chosen well.
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-md text-base text-muted">
            Marque edits down thousands of products to the ones worth owning —
            across audio, home, apparel, tech, and outdoors. No endless scroll,
            just the shortlist.
          </motion.p>
          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop">
              <Button size="lg">Shop the edit</Button>
            </Link>
            <Link href="/shop?filter=flash-sale">
              <Button size="lg" variant="outline">
                View flash sale
              </Button>
            </Link>
          </motion.div>
          <motion.div variants={item} className="mt-10 flex gap-8">
            <div>
              <p className="font-serif text-2xl text-ink">30k+</p>
              <p className="text-xs text-muted">happy customers</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-ink">4.8/5</p>
              <p className="text-xs text-muted">average rating</p>
            </div>
            <div>
              <p className="font-serif text-2xl text-ink">2–5 day</p>
              <p className="text-xs text-muted">delivery</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] lg:aspect-square"
        >
          <Image
            src="https://picsum.photos/seed/marque-hero/1000/1000"
            alt="Featured product still life"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-paper/90 px-4 py-3 backdrop-blur">
            <div>
              <p className="text-xs text-muted">Featured this week</p>
              <p className="text-sm font-medium text-ink">Aria Over-Ear Headphones</p>
            </div>
            <span className="font-mono text-sm text-ink">$189</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
