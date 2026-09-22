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
      <div className="absolute bottom-[22%] left-[58%] h-12 w-16 rounded-md bg-foreground/10 sm:h-20 sm:w-28" />
      <div className="absolute right-[25%] bottom-[35%] size-16 rotate-45 bg-accent/15" />
    </div>
  );
}

export function HeroSection() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <section className="relative min-h-[300px] overflow-hidden sm:min-h-[340px] lg:min-h-[400px]">
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
      <div className="relative z-10 mx-auto flex min-h-[300px] max-w-6xl flex-col justify-start px-4 pb-0 pt-8 sm:min-h-[340px] sm:px-6 sm:pb-0 sm:pt-10 lg:min-h-[400px] lg:justify-center lg:py-6">
        <div className="max-w-xl">
          {/* Main headline */}
          <h1 className="max-w-[19rem] font-display text-4xl font-semibold leading-[1.04] tracking-tight sm:max-w-xl sm:text-5xl lg:text-6xl">
            {site.tagline}
          </h1>

          {/* CTAs */}
          <div className="mt-8 grid max-w-md grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link to="/classes">
                Explore Classes
                <ChevronRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
