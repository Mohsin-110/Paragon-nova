import { cn } from "@/lib/format";

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full text-sm",
            p === page ? "bg-ink text-paper" : "text-ink/70 hover:bg-ink/5"
          )}
        >
          {p}
        </button>
      ))}
    </div>
  );
}
