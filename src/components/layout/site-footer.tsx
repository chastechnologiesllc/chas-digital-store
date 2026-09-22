import { Link } from "@tanstack/react-router";
import { displayContact, isPlaceholder, site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          {/* Brand logo + name */}
          <div className="flex items-center gap-2.5">
            <img
              src="/logo-icon.svg"
              alt={site.companyName}
              className="size-8 flex-shrink-0"
              width={32}
              height={32}
            />
            <p className="font-display text-lg font-semibold tracking-tight">{site.companyName}</p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{site.storeName}</p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {site.description}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Store</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/classes" className="hover:text-foreground">Classes</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{displayContact(site.contact.email, "Email: add in site config")}</li>
            <li>{displayContact(site.contact.phone, "Phone: add in site config")}</li>
            <li>
              <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-foreground">Terms</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© {new Date().getFullYear()} {site.companyName}. All rights reserved.</p>
          {isPlaceholder(site.contact.address) ? (
            <p>Company details are stored as editable placeholders until filled in.</p>
          ) : (
            <p>{site.contact.address}</p>
          )}
        </div>
      </div>
    </footer>
  );
}
