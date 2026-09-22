import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Send } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { formatMoney } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductCard({ product, featured = false }: { product: Product; featured?: boolean }) {
  const category = getCategory(product.category);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -6, y: (x - 0.5) * 8 });
  };

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgb(238_241_244/0.08)] transition-[transform,box-shadow] duration-200",
        "hover:shadow-[0_0_0_1px_rgb(238_241_244/0.14)]",
      )}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <Link
        to="/classes/$slug"
        params={{ slug: product.slug }}
        className="relative block aspect-[16/10] overflow-hidden bg-surface-2"
      >
        <img
          src={product.image}
          alt=""
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04] outline outline-1 -outline-offset-1 outline-white/10"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <Badge variant="accent">{category?.label ?? product.category}</Badge>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="space-y-2">
          <h3 className="font-display text-lg font-semibold tracking-tight">
            <Link to="/classes/$slug" params={{ slug: product.slug }} className="hover:text-accent">
              {product.name}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
          <Badge variant="outline">{product.skillLevel}</Badge>
          <Badge variant="outline" className="gap-1">
            <Send className="size-3" />
            Telegram
          </Badge>
          {featured ? <Badge variant="outline">{product.duration}</Badge> : null}
        </div>
        <div className="flex items-end justify-between gap-3">
          <p className="font-display text-xl font-semibold tabular-nums">
            {formatMoney(product.price, product.currency)}
          </p>
          <Button asChild size="sm" variant="secondary">
            <Link to="/classes/$slug" params={{ slug: product.slug }}>
              View Class
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
