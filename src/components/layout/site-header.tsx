import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/classes", label: "Classes" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/80 bg-background/85 shadow-[0_1px_0_rgb(255_255_255/0.03)] backdrop-blur-md transition-[padding] duration-200",
        compact ? "py-1 sm:py-2" : "py-2 sm:py-4",
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4 sm:h-14 sm:gap-4 sm:px-6">
        {/* Brand logo — icon + name */}
        <Link to="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <img
            src="/logo-icon.svg"
            alt={site.companyName}
            className="size-9 flex-shrink-0 sm:size-10"
            width={40}
            height={40}
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-[0.95rem] font-semibold tracking-tight sm:text-base">
              {site.companyName}
            </span>
            <span className="block truncate text-[0.7rem] text-muted-foreground sm:text-xs">
              Digital Store
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/classes">Explore Classes</Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-200",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-3 text-sm text-foreground hover:bg-surface"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="mt-2">
            <Link to="/classes">Explore Classes</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
