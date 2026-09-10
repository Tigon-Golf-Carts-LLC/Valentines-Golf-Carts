import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowRight, MapPin, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetFeaturedInventory } from "@workspace/api-client-react";
import { CartGrid } from "@/components/CartGrid";

export default function Home() {
  const { data: inventoryData, isLoading } = useGetFeaturedInventory();

  return (
    <div className="flex flex-col w-full bg-background text-foreground">
      {/* Hero Section */}
      <section className="w-full border-b border-border bg-background pt-28 md:pt-36">
        <div className="container mx-auto grid min-h-[760px] grid-cols-1 items-center gap-12 px-4 py-14 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-primary/30 bg-secondary px-3 py-2 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              <Heart className="w-4 h-4 fill-primary animate-heart-beat" />
              <span>The Gift of Mobility</span>
            </div>
            <h1 className="mb-7 font-display text-6xl font-black uppercase leading-[0.88] tracking-tighter text-foreground md:text-8xl lg:text-[6.5rem]">
              VALENTINE'S <br className="hidden md:block" />
              DAY <br />
              <span className="valentines-heart-text" aria-label="Golf Carts">
                {"Golf Carts".split("").map((letter, index) => (
                  <span
                    key={`${letter}-${index}`}
                    className={
                      letter === " "
                        ? "valentines-heart-letter"
                        : "valentines-heart-letter valentines-heart-source"
                    }
                    style={{ "--wave-index": index } as CSSProperties}
                    aria-hidden="true"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>
            </h1>
            <p className="mb-10 max-w-xl font-sans text-lg font-medium leading-relaxed text-foreground md:text-xl">
              The premier one-day sales event on February 14. Find unprecedented
              deals on the largest selection of new and pre-owned inventory from
              trusted dealerships nationwide. Give the gift of street legal
              mobility.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-none h-16 px-10 text-lg transition-all"
              >
                <Link href="/inventory">Shop Valentine's Day Deals</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-background border-foreground/20 text-foreground hover:bg-secondary hover:text-foreground font-bold uppercase tracking-wider rounded-none h-16 px-10 text-lg shadow-sm"
              >
                <Link href="/locations">Find a Dealership</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div
              className="absolute -left-4 -top-4 h-24 w-24 bg-secondary"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-4 -right-4 h-32 w-32 bg-primary"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden border border-border bg-secondary p-3">
              <img
                src="/hero_2.jpg"
                alt="Street-legal Valentine golf cart decorated with red and pink heart balloons"
                className="aspect-[4/5] w-full object-cover object-center lg:aspect-[5/6]"
              />
              <div className="absolute bottom-7 left-7 right-7 bg-background px-5 py-4 text-foreground shadow-lg">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                  One day only
                </p>
                <p className="mt-1 font-display text-2xl font-black uppercase">
                  February 14, 2027
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Trust Bar */}
      <section className="bg-secondary border-y border-border py-12 relative z-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center md:items-start gap-4 md:pl-8 first:pl-0 pt-6 md:pt-0 first:pt-0">
              <div className="p-3 bg-primary/10 text-primary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl uppercase tracking-wider text-foreground">
                  Verified Dealerships
                </h3>
                <p className="text-foreground/70 text-sm mt-2 leading-relaxed font-medium">
                  Shop confidently from our nationwide network of trusted
                  partners. Every cart is certified.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 md:pl-8 pt-6 md:pt-0">
              <div className="p-3 bg-primary/10 text-primary">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl uppercase tracking-wider text-foreground">
                  Valentine's Pricing
                </h3>
                <p className="text-foreground/70 text-sm mt-2 leading-relaxed font-medium">
                  Exclusive event rates on new and pre-owned inventory during
                  this 24-hour window.
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start gap-4 md:pl-8 pt-6 md:pt-0">
              <div className="p-3 bg-primary/10 text-primary">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-display font-black text-xl uppercase tracking-wider text-foreground">
                  Nationwide Delivery
                </h3>
                <p className="text-foreground/70 text-sm mt-2 leading-relaxed font-medium">
                  Surprise your Valentine with delivery anywhere in the US or
                  pick up locally.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Inventory */}
      <section className="py-24 md:py-32 relative z-10 bg-background">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-2 text-primary uppercase font-bold tracking-widest text-sm">
                <Heart className="w-4 h-4 animate-heart-beat" /> Live Drops
              </div>
              <h2 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tight text-foreground">
                Valentine's Day{" "}
                <span className="text-ruby-gradient">Golf Cart Deals</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl text-lg md:text-xl font-medium">
                Hand-picked selections from our live national feed. These
                event-exclusive deals won't last long.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="shrink-0 rounded-none border-primary text-primary hover:bg-primary hover:text-primary-foreground uppercase font-black tracking-widest group h-14 px-8"
            >
              <Link href="/inventory" className="flex items-center gap-2">
                View All Deals
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <CartGrid carts={inventoryData?.carts} isLoading={isLoading} />
        </div>
      </section>
      {/* Promo Section */}
      <section className="py-0">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          <div className="w-full lg:w-1/2 relative bg-secondary p-12 md:p-24 flex flex-col justify-center border-t border-r border-border">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-background text-foreground font-bold text-sm tracking-widest uppercase mb-6 border border-border w-fit shadow-sm">
              Massive Markdowns
            </div>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 text-foreground leading-[0.9]">
              The Ultimate <br />{" "}
              <span className="text-ruby-gradient">Lineup</span>
            </h2>
            <p className="text-xl text-foreground/80 leading-relaxed mb-10 font-medium">
              Our inventory peaks for this event. Track live availability and
              secure the best possible pricing before stock runs out. Every
              major brand represented.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black uppercase tracking-widest rounded-none h-14 px-8 w-fit"
            >
              <Link href="/brands">Explore Brands</Link>
            </Button>
          </div>
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <img
              src="/lineup_2.jpg"
              alt="Valentine's Day Golf Cart Lineup"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
