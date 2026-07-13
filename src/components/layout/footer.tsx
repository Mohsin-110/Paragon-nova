import Link from "next/link";
import { FiInstagram, FiTwitter, FiFacebook } from "react-icons/fi";
import { categories } from "@/lib/mock-data";

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <span className="font-serif text-2xl text-ink">ParagonNovaLLC</span>
            <p className="mt-3 max-w-xs text-sm text-muted">
              A curated marketplace across audio, home, apparel, tech, and more —
              chosen well, not endless.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiInstagram, FiTwitter, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors hover:border-ink/30 hover:text-ink"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Categories</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {categories.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/shop?category=${c.slug}`}
                    className="text-sm text-muted hover:text-ink"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Company</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                ["About us", "/about"],
                ["Journal", "/blog"],
                ["Contact", "/contact"],
                ["Careers", "/careers"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Support</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {[
                ["Shipping & returns", "/policies/shipping"],
                ["Privacy policy", "/policies/privacy"],
                ["Terms of service", "/policies/terms"],
                ["Track an order", "/account/orders"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-muted hover:text-ink">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">© {new Date().getFullYear()} Marque, Inc. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-muted">
            <Link href="/policies/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-ink">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-ink">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
