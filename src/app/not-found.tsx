import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-32 text-center sm:px-6 lg:px-8">
      <p className="font-serif text-6xl text-ink">404</p>
      <h1 className="mt-4 font-serif text-2xl text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link href="/" className="mt-6">
        <Button size="lg">Back to home</Button>
      </Link>
    </div>
  );
}
