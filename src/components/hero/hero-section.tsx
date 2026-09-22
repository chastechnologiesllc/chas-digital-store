import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Component, lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";

const HeroScene = lazy(() => import("./hero-scene"));

class CanvasErrorBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? this.props.fallback : this.props.children;
  }
}

function HeroFallback() {
  return (
    <div className="relative size-full overflow-hidden rounded-xl bg-surface shadow-[0_0_0_1px_rgb(238_241_244/0.08)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_28%,rgb(122_163_181/0.28),transparent_40%),radial-gradient(circle_at_78%_68%,rgb(232_238_244/0.12),transparent_36%)]" />
      <div className="absolute left-[16%] top-[24%] size-32 rotate-12 rounded-lg bg-accent/35" />
      <div className="absolute right-[18%] top-[34%] size-24 rounded-full bg-primary/20" />
      <div className="absolute bottom-[20%] left-[36%] h-20 w-28 rounded-md bg-foreground/15" />
      <div className="absolute right-[30%] bottom-[28%] size-16 rotate-45 bg-accent/25" />
    </div>
  );
}

export function HeroSection() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgb(122_163_181/0.12),transparent_34%),radial-gradient(circle_at_10%_80%,rgb(232_238_244/0.05),transparent_28%)]" />
      <div className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:py-16">
        <div className="relative z-10 max-w-xl">
          {/* Brand logo mark + store name */}
          <div className="flex items-center gap-2">
            <img
              src="/logo-icon.svg"
              alt={site.companyName}
              className="size-5 flex-shrink-0 opacity-80"
              width={20}
              height={20}
            />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{site.storeName}</p>
          </div>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            {site.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/classes">
                Explore Classes
                <ChevronRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>
        <div className="relative h-[340px] sm:h-[420px] lg:h-[520px]">
          {ready ? (
            <CanvasErrorBoundary fallback={<HeroFallback />}>
              <Suspense fallback={<HeroFallback />}>
                <HeroScene />
              </Suspense>
            </CanvasErrorBoundary>
          ) : (
            <HeroFallback />
          )}
        </div>
      </div>
    </section>
  );
}
