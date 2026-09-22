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
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgb(122_163_181/0.25),transparent_45%),radial-gradient(circle_at_80%_70%,rgb(232_238_244/0.10),transparent_36%)]" />
      <div className="absolute left-[55%] top-[30%] size-32 rotate-12 rounded-lg bg-accent/20" />
      <div className="absolute right-[15%] top-[40%] size-24 rounded-full bg-primary/15" />
      <div className="absolute bottom-[25%] left-[60%] h-20 w-28 rounded-md bg-foreground/10" />
      <div className="absolute right-[25%] bottom-[35%] size-16 rotate-45 bg-accent/15" />
    </div>
  );
}

export function HeroSection() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section className="relative overflow-hidden min-h-[calc(100dvh-4.5rem)]">
      {/* 3D scene fills the entire section as background */}
      <div className="absolute inset-0">
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

      {/* Gradient overlay: fades dark-to-clear on mobile (top→bottom), left-to-clear on desktop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-transparent lg:bg-gradient-to-r lg:from-background/92 lg:via-background/65 lg:to-transparent" />
      {/* Bottom fade so the section blends into the next section */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Text content — overlaid on top of 3D */}
      <div className="relative z-10 mx-auto flex max-w-6xl min-h-[calc(100dvh-4.5rem)] flex-col justify-center px-4 py-16 sm:px-6">
        <div className="max-w-xl">
          {/* Brand mark */}
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/logo-icon.svg"
              alt={site.companyName}
              className="size-5 flex-shrink-0 opacity-80"
              width={20}
              height={20}
            />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {site.storeName}
            </p>
          </div>

          {/* Main headline */}
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
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
      </div>
    </section>
  );
}
