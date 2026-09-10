import { useState, useMemo } from "react";
import {
  useGetInventory,
  GetInventoryCondition,
  GetInventoryPower,
  GetInventorySort,
  type GetInventoryParams,
} from "@workspace/api-client-react";
import { CartGrid } from "@/components/CartGrid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal, X, Heart } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

export default function Inventory() {
  const makeFromUrl =
    new URLSearchParams(window.location.search).get("make") || "all";
  const [q, setQ] = useState("");
  const debouncedQ = useDebounce(q, 500);

  const [make, setMake] = useState<string>(makeFromUrl);
  const [condition, setCondition] = useState<string>("all");
  const [power, setPower] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");

  const [showFilters, setShowFilters] = useState(false);

  const queryParams = useMemo(() => {
    const params: GetInventoryParams = {};
    if (debouncedQ) params.q = debouncedQ;
    if (make !== "all") params.make = make;
    if (condition !== "all")
      params.condition = condition as GetInventoryCondition;
    if (power !== "all") params.power = power as GetInventoryPower;
    if (sort !== "featured") params.sort = sort as GetInventorySort;
    return params;
  }, [debouncedQ, make, condition, power, sort]);

  const { data, isLoading } = useGetInventory(queryParams);

  const clearFilters = () => {
    setQ("");
    setMake("all");
    setCondition("all");
    setPower("all");
    setSort("featured");
  };

  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background">
      <div className="bg-secondary text-foreground py-16 border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase mb-4 border border-primary/20 ">
            <Heart className="w-4 h-4 fill-primary animate-heart-beat" />
            <span>Valentine's Day Feed</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-black uppercase tracking-tight mb-4">
            Valentine's Day{" "}
            <span className="valentines-wave-shimmer" aria-label="Inventory">
              {"Inventory".split("").map((letter, index) => (
                <span
                  key={`${letter}-${index}`}
                  className="valentines-wave-letter"
                  style={{ "--wave-index": index } as React.CSSProperties}
                  aria-hidden="true"
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg font-medium">
            Search our nationwide feed of Valentine's event golf carts. Use
            filters to hunt down your exact model before it's gone.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 flex-1 flex flex-col lg:flex-row gap-8 relative z-10">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between bg-card p-4 border border-border mb-4">
          <span className="font-display font-black uppercase tracking-widest text-foreground">
            Filters
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-none border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-black uppercase tracking-widest"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? "Hide" : "Show"}
          </Button>
        </div>

        {/* Sidebar Filters */}
        <aside
          className={`w-full lg:w-72 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}
        >
          <div className="bg-card border border-border p-6 flex flex-col gap-6 sticky top-28 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent opacity-50" />

            <div className="flex items-center justify-between">
              <h2 className="font-display font-black text-xl uppercase tracking-widest text-foreground">
                Filters
              </h2>
              {(q ||
                make !== "all" ||
                condition !== "all" ||
                power !== "all") && (
                <button
                  onClick={clearFilters}
                  className="text-[10px] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-black uppercase tracking-widest"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Search
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Model or keyword..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-9 rounded-none bg-background border-border focus-visible:ring-primary h-12 text-foreground font-medium"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Make
              </label>
              <Select value={make} onValueChange={setMake}>
                <SelectTrigger className="rounded-none h-12 bg-background border-border text-foreground font-bold">
                  <SelectValue placeholder="All Makes" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  <SelectItem value="all">ALL MAKES</SelectItem>
                  {data?.facets?.makes.map((facet) => (
                    <SelectItem
                      key={facet.key}
                      value={facet.key}
                      className="uppercase font-bold"
                    >
                      {facet.label} ({facet.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Condition
              </label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger className="rounded-none h-12 bg-background border-border text-foreground font-bold">
                  <SelectValue placeholder="Any Condition" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  <SelectItem value="all">ANY CONDITION</SelectItem>
                  <SelectItem value="new">NEW</SelectItem>
                  <SelectItem value="used">PRE-OWNED</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                Power Type
              </label>
              <Select value={power} onValueChange={setPower}>
                <SelectTrigger className="rounded-none h-12 bg-background border-border text-foreground font-bold">
                  <SelectValue placeholder="Any Power" />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  <SelectItem value="all">ANY POWER</SelectItem>
                  <SelectItem value="electric">ELECTRIC</SelectItem>
                  <SelectItem value="gas">GAS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="text-muted-foreground text-sm font-bold uppercase tracking-wider">
              {isLoading ? (
                <span>Loading live drops...</span>
              ) : (
                <span>
                  Showing{" "}
                  <strong className="text-foreground text-lg ml-1">
                    {data?.summary.total || 0}
                  </strong>{" "}
                  deals
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <label className="text-xs font-black uppercase tracking-widest text-muted-foreground whitespace-nowrap">
                Sort
              </label>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-full sm:w-56 rounded-none h-12 bg-background border-border text-foreground font-bold uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-none border-border">
                  <SelectItem value="featured" className="uppercase font-bold">
                    Featured Deals
                  </SelectItem>
                  <SelectItem value="price-asc" className="uppercase font-bold">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem
                    value="price-desc"
                    className="uppercase font-bold"
                  >
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="year-desc" className="uppercase font-bold">
                    Newest First
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <CartGrid
            carts={data?.carts}
            isLoading={isLoading}
            emptyMessage="No deals found matching these criteria."
          />
        </main>
      </div>
    </div>
  );
}
