import { useGetLocations } from "@workspace/api-client-react";
import { MapPin, Phone, ArrowRight, Heart } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Locations() {
  const { data: locations, isLoading } = useGetLocations();

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background">
      <div className="bg-secondary text-foreground py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 border border-primary/20 ">
              <Heart className="w-4 h-4 fill-primary animate-heart-beat" />
              <span>National Network</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight mb-6">
              Event <span className="text-ruby-gradient">Locations</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
              Find a Valentines Golf Carts participating dealership near you.
              Our nationwide network ensures you get the absolute best event
              pricing, no matter where you are.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-card border border-border p-8 flex flex-col gap-4"
              >
                <Skeleton className="h-10 w-3/4 rounded-none" />
                <Skeleton className="h-4 w-full rounded-none" />
                <Skeleton className="h-4 w-1/2 rounded-none" />
                <Skeleton className="h-14 w-full mt-4 rounded-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations?.map((location) => (
              <div
                key={location.slug}
                className="bg-card border border-border p-8 hover:shadow-lg hover:border-primary/50 transition-all flex flex-col h-full relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-primary/20" />

                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 bg-secondary border border-foreground/5 text-primary flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-black uppercase tracking-widest text-foreground">
                      {location.city}, {location.stateCode}
                    </h2>
                    <p className="text-muted-foreground mt-1 font-bold uppercase tracking-wider text-xs">
                      {location.cartCount} Vehicles in Stock
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mb-8 flex-1 relative z-10 border-t border-border pt-6">
                  {location.address && (
                    <div className="text-sm">
                      <strong className="block uppercase tracking-widest text-xs text-muted-foreground mb-1">
                        Address
                      </strong>
                      <span className="text-foreground/80 font-medium">
                        {location.address}
                        <br />
                        {location.city}, {location.stateCode}{" "}
                        {location.postalCode}
                      </span>
                    </div>
                  )}
                  {location.phone && (
                    <div className="text-sm mt-2">
                      <strong className="block uppercase tracking-widest text-xs text-muted-foreground mb-1">
                        Phone
                      </strong>
                      <a
                        href={`tel:${location.phone}`}
                        className="text-primary hover:text-primary-foreground font-black text-lg flex items-center gap-2 transition-colors"
                      >
                        <Phone className="w-4 h-4" /> {location.phone}
                      </a>
                    </div>
                  )}
                </div>

                <Button
                  asChild
                  className="w-full bg-secondary border border-foreground/10 hover:bg-primary text-secondary-foreground hover:text-primary-foreground rounded-none uppercase font-black tracking-widest group h-14 relative z-10 transition-all"
                >
                  <Link href={`/inventory?q=${location.city}`}>
                    View Local Inventory
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
