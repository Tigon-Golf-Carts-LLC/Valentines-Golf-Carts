import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

const mainLinks = [
  { href: "/inventory", label: "Inventory" },
  { href: "/brands", label: "Brands" },
  { href: "/locations", label: "Locations" },
  { href: "/financing", label: "Financing" },
  { href: "/contact", label: "Contact Us" },
];

const policyGroups = [
  {
    title: "Policies",
    links: [
      { href: "/policies/terms-and-conditions", label: "Terms & Conditions" },
      { href: "/policies/sales-event-policy", label: "Sales Event Policy" },
      { href: "/policies/return-policy", label: "Return Policy" },
      { href: "/policies/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Service Policies",
    links: [{ href: "/policies/delivery-policy", label: "Delivery Policy" }],
  },
  {
    title: "Content Policies",
    links: [
      { href: "/policies/publishing-policy", label: "Publishing Policy" },
      { href: "/policies/feedback-policy", label: "Feedback Policy" },
      { href: "/policies/corrections-policy", label: "Corrections Policy" },
    ],
  },
  {
    title: "Work Policies",
    links: [
      { href: "/policies/diversity-policy", label: "Diversity Policy" },
      { href: "/policies/ethics-policy", label: "Ethics Policy" },
      { href: "/policies/staffing-report", label: "Staffing Report" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-secondary text-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-3"
              aria-label="Valentines Golf Carts home"
            >
              <img src="/logo_2.png" alt="" className="h-12 w-12" />
              <span className="flex flex-col items-start gap-0.5">
                <span className="text-3xl font-display font-black text-foreground tracking-tight leading-none uppercase">
                  Valentine's Day
                </span>
                <span className="text-xs font-bold text-primary tracking-[0.2em] uppercase leading-none">
                  Golf Carts
                </span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mt-2 font-medium">
              The annual Valentine's Day Golf Cart Sales Event, with live
              inventory from participating dealerships across the United States.
            </p>
          </div>

          {/* Locations */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-black font-display text-foreground uppercase tracking-wider">
              Locations
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/locations"
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                Find a Dealership
              </Link>
              <p className="text-muted-foreground text-sm flex items-start gap-2 mt-2 font-medium">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Available Nationwide.
                  <br />
                  Check locations page for exact details.
                </span>
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-lg font-black font-display text-foreground uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-3 mt-2">
              <a
                href="tel:+18444562228"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-3 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                844-456-2228
              </a>
              <p className="text-muted-foreground text-sm font-medium">
                Monday–Saturday, 9:00 AM–5:00 PM
              </p>
              <a
                href="mailto:sales@valentinesgolfcarts.com"
                className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-3 font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                sales@valentinesgolfcarts.com
              </a>
            </div>
          </div>
        </div>

        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-1 gap-10 border-t border-border py-12 sm:grid-cols-2 lg:grid-cols-5"
        >
          <div>
            <h4 className="mb-4 font-display text-sm font-black uppercase tracking-wider text-foreground">
              Main Navigation
            </h4>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span aria-hidden="true" className="mr-2 text-primary">
                      ›
                    </span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {policyGroups.map((group) => (
            <div key={group.title}>
              <h4 className="mb-4 font-display text-sm font-black uppercase tracking-wider text-foreground">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <span aria-hidden="true" className="mr-2 text-primary">
                        ›
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs font-medium">
            &copy; {new Date().getFullYear()} Valentines Golf Carts. Valentine's
            Day Golf Carts is an annual sales event. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-muted-foreground text-xs font-medium">
              Privacy respected
            </span>
            <span className="text-muted-foreground text-xs font-medium">
              Transparent customer service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
