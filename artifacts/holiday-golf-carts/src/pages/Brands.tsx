import { useGetInventory } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Tag, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function Brands() {
  const { data, isLoading } = useGetInventory({});

  const makes = data?.facets?.makes || [];

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background">
      <div className="bg-secondary text-foreground py-20 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-6 border border-primary/20 ">
            <Heart className="w-4 h-4 fill-primary animate-heart-beat" />
            <span>Top Tier Brands</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tight mb-6">
            Shop by <span className="text-ruby-gradient">Brand</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl font-medium">
            Discover our unprecedented Valentine's Day selection. From luxury
            cruisers to rugged utility vehicles, every major brand is marked
            down.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 w-full rounded-none" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {makes.map((make) => (
              <Link
                key={make.key}
                href={`/inventory?make=${make.key}`}
                className="group"
              >
                <div className="bg-card border border-border p-8 h-full flex flex-col justify-between hover:shadow-lg hover:border-primary/50 transition-all hover:-translate-y-1 duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-10 -mt-10 transition-opacity group-hover:bg-primary/20" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-secondary text-primary flex items-center justify-center mb-6 border border-foreground/5">
                      <Tag className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-display font-black uppercase tracking-widest text-foreground group-hover:text-primary transition-colors">
                      {make.label}
                    </h2>
                    <p className="text-muted-foreground mt-2 font-bold uppercase tracking-wider text-sm">
                      {make.count} Vehicles Available
                    </p>
                  </div>
                  <div className="mt-8 flex items-center text-sm font-black uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors relative z-10">
                    View Deals{" "}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}

            {makes.length === 0 && !isLoading && (
              <div className="col-span-full py-20 text-center border-dashed border-2 border-border text-muted-foreground font-bold uppercase tracking-widest">
                No brand information available at this time.
              </div>
            )}
          </div>
        )}

        <div className="mt-20 bg-secondary border border-border p-12 text-center max-w-4xl mx-auto flex flex-col items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-20" />
          <h3 className="text-3xl font-display font-black uppercase tracking-widest mb-4 text-foreground relative z-10">
            Don't see your preferred brand?
          </h3>
          <p className="text-muted-foreground mb-8 text-lg relative z-10">
            Our nationwide inventory updates constantly during the Valentine's
            Day event. Contact our sales team to place a special request for a
            specific make and model before the event ends.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase font-black tracking-widest px-8 h-14 relative z-10 ruby-glow"
          >
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
