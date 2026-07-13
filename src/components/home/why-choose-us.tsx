import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";

const features = [
  {
    icon: FiTruck,
    title: "Fast, tracked delivery",
    body: "Most orders arrive within 2–5 business days with live tracking.",
  },
  {
    icon: FiRefreshCw,
    title: "30-day returns",
    body: "Free returns on unused items, no questions asked.",
  },
  {
    icon: FiShield,
    title: "Secure checkout",
    body: "Card, PayPal, and cash on delivery — all encrypted end to end.",
  },
  {
    icon: FiHeadphones,
    title: "Real support",
    body: "A person replies within a few hours, not a bot within a week.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="border-y border-ink/8 bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title}>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-paper">
                <f.icon size={18} className="text-brass-dark" />
              </div>
              <h3 className="mt-4 text-sm font-medium text-ink">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
