import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useState, type MouseEvent } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/data/categories";
import type { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  featured = false,
  categoryHub = false,
}: {
  product: Product;
  featured?: boolean;
  categoryHub?: boolean;
}) {
  const category = getCategory(product.category);
  const isMusicCourse = product.slug === "ai-music-generator";
  const isCreatorCard = isMusicCourse && !categoryHub;
  const courseTarget = categoryHub ? "/classes" : isMusicCourse ? "/programs/oryn-soundz" : "/classes/$slug";
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -6, y: (x - 0.5) * 8 });
  };

  const linkProps = categoryHub
    ? { to: "/classes" as const, search: { category: product.category } }
    : isMusicCourse
      ? { to: "/programs/oryn-soundz" as const }
      : { to: "/classes/$slug" as const, params: { slug: product.slug } };

  const cardShell = cn(
    "group flex h-full flex-col overflow-hidden rounded-xl bg-card shadow-[0_0_0_1px_rgb(238_241_244/0.08)] transition-[transform,box-shadow] duration-200",
    "hover:shadow-[0_0_0_1px_rgb(238_241_244/0.14)]",
  );

  if (isCreatorCard) {
    return (
      <article
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        className={cn(cardShell, "min-h-[440px]")}
        style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        <Link
          {...linkProps}
          className="relative flex min-h-[440px] flex-1 overflow-hidden bg-[#100d0a] p-5 sm:p-6"
        >
          <img
            src="/products/oryn-soundz-cover.jpg"
            alt="Oryn Soundz studio cover"
            className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,9,0.2)_0%,rgba(6,7,9,0.12)_25%,rgba(6,7,9,0.88)_100%)]" />
          <div className="absolute inset-x-5 top-5 flex items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
            <Badge className="border border-white/15 bg-black/40 text-white backdrop-blur-md">AI Music</Badge>
            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/45 py-1.5 pl-1.5 pr-3 backdrop-blur-md">
              <img
                src="/products/oryn-soundz-profile.jpg"
                alt=""
                className="size-9 rounded-full object-cover ring-2 ring-[#d7a947]/70"
              />
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/60">Creator</p>
                <p className="text-xs font-semibold text-white">Oryn Soundz</p>
              </div>
            </div>
          </div>
          <div className="relative z-10 mt-auto max-w-xl pt-28 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0c766]">Featured course</p>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
              AI Music Generator Class
              <span className="block text-white/90">by Oryn Soundz</span>
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/72 sm:text-base">
              Learn practical AI music creation, then explore the full course packages.
            </p>
            <span className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-semibold text-[#111318] shadow-lg transition-transform duration-150 group-hover:translate-x-0.5">
              Open class
              <ArrowUpRight className="size-4" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className={cardShell}
      style={{ transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <Link {...linkProps} className="relative block aspect-[16/10] overflow-hidden bg-surface-2">
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
            <Link {...linkProps} className="hover:text-accent">
              {categoryHub ? category?.label ?? product.category : product.name}
            </Link>
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {categoryHub ? category?.description ?? product.description : product.description}
          </p>
        </div>
        {!categoryHub ? (
          <div className="mt-auto flex flex-wrap gap-2 text-xs text-muted-foreground">
            {featured ? <Badge variant="outline">{product.duration}</Badge> : null}
          </div>
        ) : (
          <div className="mt-auto" />
        )}
        <div className="flex items-end justify-end gap-3">
          <Button asChild size="sm" variant="secondary">
            <Link {...linkProps}>
              {categoryHub ? `Explore ${category?.label ?? "category"}` : "View Class"}
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
