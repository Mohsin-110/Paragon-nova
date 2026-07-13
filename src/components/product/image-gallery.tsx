"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/format";

export function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const [zoomPos, setZoomPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomPos(null)}
        className="relative aspect-square w-full flex-1 overflow-hidden rounded-2xl bg-canvas"
      >
        <Image
          src={images[active]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 45vw, 90vw"
          priority
          className="object-cover transition-transform duration-200"
          style={
            zoomPos
              ? {
                  transform: "scale(1.7)",
                  transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                }
              : undefined
          }
        />
        {zoomPos && (
          <span className="absolute bottom-3 right-3 rounded-full bg-paper/80 px-2.5 py-1 text-[11px] text-ink">
            Zoomed view
          </span>
        )}
      </div>
      <div className="flex gap-3 sm:flex-col">
        {images.map((img, i) => (
          <button
            key={img}
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2",
              active === i ? "border-ink" : "border-transparent"
            )}
          >
            <Image src={img} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
