"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // TODO: wire up to real newsletter endpoint once backend exists
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="rounded-[28px] bg-ink px-8 py-12 text-center text-paper sm:px-16">
        <h2 className="font-serif text-2xl sm:text-3xl">Get first access</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-paper/70">
          New arrivals and flash sales, twice a month. No spam, unsubscribe anytime.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm text-brass">You&rsquo;re on the list.</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="h-12 flex-1 rounded-full border border-paper/20 bg-paper/5 px-5 text-sm text-paper placeholder:text-paper/40 outline-none focus-visible:ring-2 focus-visible:ring-brass"
            />
            <Button type="submit" variant="secondary" size="lg">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
