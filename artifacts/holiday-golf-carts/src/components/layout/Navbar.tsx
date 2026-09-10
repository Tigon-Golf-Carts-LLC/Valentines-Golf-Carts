import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { href: "/inventory", label: "Inventory" },
    { href: "/brands", label: "Brands" },
    { href: "/locations", label: "Locations" },
    { href: "/financing", label: "Financing" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-secondary py-3 shadow-sm border-border"
          : "bg-secondary border-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Valentines Golf Carts home"
        >
          <img
            src="/logo_2.png"
            alt=""
            className="h-10 w-10 md:h-11 md:w-11 animate-heart-beat"
          />
          <span className="flex flex-col items-start gap-0.5">
            <span className="text-2xl md:text-3xl font-display font-black text-foreground tracking-tight leading-none group-hover:text-primary transition-colors uppercase">
              Valentine's Day
            </span>
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-[0.2em] uppercase leading-none">
              Golf Carts
            </span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold tracking-wide uppercase transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+18444562228"
            className="flex items-center gap-2 text-foreground hover:text-primary transition-colors text-sm font-medium"
          >
            <Phone className="w-4 h-4" />
            <span>844-456-2228</span>
          </a>
          <Button
            asChild
            variant="default"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold uppercase tracking-wider px-6"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-secondary border-b border-border shadow-md overflow-hidden transition-all duration-300 ease-in-out",
          mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="flex flex-col p-4 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "p-3 text-sm font-semibold tracking-wide uppercase",
                location === link.href
                  ? "text-primary bg-muted"
                  : "text-foreground hover:bg-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-border my-2" />
          <Link
            href="/contact"
            className="p-3 text-sm font-semibold tracking-wide uppercase text-primary hover:bg-muted flex items-center justify-between"
          >
            Contact Us <Phone className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </header>
  );
}
