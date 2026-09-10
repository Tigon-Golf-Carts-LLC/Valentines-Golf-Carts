import { Skeleton } from "@/components/ui/skeleton";
import { InventoryCart } from "@workspace/api-client-react";
import { CartCard } from "./CartCard";

interface CartGridProps {
  carts?: InventoryCart[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function CartGrid({
  carts = [],
  isLoading,
  emptyMessage = "No vehicles found matching your criteria.",
}: CartGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-1 lg:grid-cols-[minmax(300px,38%)_minmax(0,1fr)_minmax(230px,27%)] bg-card border border-border relative overflow-hidden shadow-sm"
          >
            <Skeleton className="h-72 lg:h-[30rem] w-full rounded-none bg-muted/20 border-b lg:border-b-0 lg:border-r border-border" />
            <div className="p-5 lg:p-6 flex flex-col gap-4 relative z-10">
              <Skeleton className="h-8 w-3/4 rounded-none bg-muted" />
              <Skeleton className="h-4 w-1/3 rounded-none bg-muted/50" />
              <div className="pt-4 border-t border-border grid grid-cols-2 gap-y-4 gap-x-8 mt-4">
                <Skeleton className="h-4 w-full rounded-none bg-muted/50" />
                <Skeleton className="h-4 w-full rounded-none bg-muted/50" />
                <Skeleton className="h-4 w-full rounded-none bg-muted/50" />
                <Skeleton className="h-4 w-full rounded-none bg-muted/50" />
              </div>
            </div>
            <div className="flex flex-col border-t border-border lg:border-l lg:border-t-0 bg-secondary/50 p-5 lg:p-6 justify-end relative z-10">
              <Skeleton className="h-10 w-full rounded-none mb-4 bg-muted border border-border" />
              <Skeleton className="h-12 w-full rounded-none mb-2 bg-muted/50" />
              <Skeleton className="h-12 w-full rounded-none bg-primary/20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (carts.length === 0) {
    return (
      <div className="py-24 text-center flex flex-col items-center justify-center border border-dashed border-border bg-card rounded-none">
        <div className="text-muted-foreground font-bold uppercase tracking-wider">
          {emptyMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {carts.map((cart) => (
        <CartCard key={cart.id} cart={cart} />
      ))}
    </div>
  );
}
