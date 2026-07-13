import { StarRating } from "@/components/ui/badge";
import { testimonials } from "@/lib/mock-data";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-medium uppercase tracking-wide text-brass-dark">
          Reviews
        </p>
        <h2 className="mt-1 font-serif text-2xl text-ink sm:text-3xl">
          What customers say
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex flex-col rounded-2xl border border-ink/8 bg-paper p-6"
          >
            <StarRating rating={5} size={13} />
            <p className="mt-4 flex-1 font-serif text-lg leading-snug text-ink">
              “{t.quote}”
            </p>
            <div className="mt-5">
              <p className="text-sm font-medium text-ink">{t.author}</p>
              <p className="text-xs text-muted">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
