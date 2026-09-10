import { Link } from "wouter";
import { Check, MapPin, Phone, ArrowRight, Heart } from "lucide-react";
import { InventoryCart } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { eventDiscount, eventPrice } from "@/lib/pricing";
import { getLocationCidUrl } from "@/lib/location-links";

interface CartCardProps {
  cart: InventoryCart;
}

export function CartCard({ cart }: CartCardProps) {
  const condition = String(cart.condition ?? "")
    .trim()
    .toLowerCase();
  const isNew = condition === "new";
  const salePrice = eventPrice(cart);
  const discount = eventDiscount(cart);
  const monthlyPayment = salePrice != null ? salePrice / 36 : null;
  const money = (value: number | null | undefined) =>
    value == null
      ? "Call for Price"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(value);

  const imageSrc = cart.images?.[0] || "/hero_2.jpg";
  const stockNumber = cart.sku || cart.id;
  const locationText = [cart.city, cart.state].filter(Boolean).join(", ");
  const locationCidUrl = getLocationCidUrl(cart.city, cart.state);
  const featureRows = [
    cart.isStreetLegal && "Street legal",
    cart.isLifted && "Lifted suspension",
    cart.specifications?.hasSoundSystem && "Sound system",
    cart.specifications?.hasExtendedTop && "Extended top",
    cart.specifications?.batteryType &&
      `${cart.specifications.batteryType} battery`,
    cart.specifications?.hasHitch && "Trailer hitch",
  ].filter(Boolean) as string[];

  return (
    <article className="group grid grid-cols-1 lg:grid-cols-[minmax(300px,38%)_minmax(0,1fr)_minmax(230px,27%)] bg-card border border-border overflow-hidden relative shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/40">
      <div className="relative h-72 lg:h-[30rem] overflow-hidden bg-muted z-10 border-b lg:border-b-0 lg:border-r border-border">
        <img
          src={imageSrc}
          alt={`${cart.year} ${cart.make} ${cart.model}`}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
        <div className="absolute left-0 top-6 px-4 py-1 bg-primary text-primary-foreground font-black uppercase text-sm tracking-widest shadow-sm flex items-center gap-2">
          <Heart
            className="w-4 h-4 fill-primary-foreground animate-heart-beat"
            aria-hidden="true"
          />{" "}
          VALENTINE'S DEAL
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-primary px-4 py-3 text-center text-xs font-black uppercase tracking-wider text-primary-foreground">
          Annual Valentine's Day Sales Event
        </div>
      </div>
      <div className="flex min-w-0 flex-col p-5 lg:p-6 relative z-10">
        <div>
          <h3 className="line-clamp-1 text-3xl font-display font-black leading-tight text-foreground uppercase group-hover:text-primary transition-colors">
            {cart.title || `${cart.year} ${cart.model}`}
          </h3>
          <p className="mt-1 text-base text-muted-foreground font-bold">
            {[cart.isLifted && "Lifted", cart.fuel, cart.passengers]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {(cart.city || cart.state) && (
            <a
              href={locationCidUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-3 flex items-center gap-1.5 text-sm font-bold text-foreground/90 ${locationCidUrl ? "hover:text-primary hover:underline" : "pointer-events-none"}`}
              aria-label={
                locationCidUrl
                  ? `Open ${locationText} in Google Maps`
                  : undefined
              }
              onClick={(event) => {
                if (!locationCidUrl) event.preventDefault();
              }}
            >
              <MapPin className="h-4 w-4 text-primary" />
              {locationText}
            </a>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-border pt-4 text-sm">
          <dt className="font-bold text-foreground">Year:</dt>
          <dd className="text-muted-foreground">{cart.year || "—"}</dd>
          <dt className="font-bold text-foreground">Make:</dt>
          <dd className="text-muted-foreground">{cart.make || "—"}</dd>
          <dt className="font-bold text-foreground">Model:</dt>
          <dd className="truncate text-muted-foreground">
            {cart.model || "—"}
          </dd>
          <dt className="font-bold text-foreground">Condition:</dt>
          <dd className="text-muted-foreground">
            {isNew ? "New" : "Pre-Owned"}
          </dd>
          <dt className="font-bold text-foreground">Stock #:</dt>
          <dd className="truncate text-muted-foreground" title={stockNumber}>
            {stockNumber}
          </dd>
          <dt className="font-bold text-foreground">Color:</dt>
          <dd className="text-muted-foreground">{cart.color || "—"}</dd>
        </dl>

        {featureRows.length > 0 && (
          <div className="mt-auto border-t border-border pt-4">
            <p className="text-xs font-black uppercase tracking-wider text-primary">
              Features
            </p>
            <div className="mt-3 grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
              {featureRows.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-sm text-foreground/80"
                >
                  <Check className="h-4 w-4 shrink-0 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col border-t border-border bg-secondary p-5 text-left lg:border-l lg:border-t-0 lg:p-6 lg:text-right relative z-10">
        <div className="rounded-sm border border-primary/20 bg-primary/10 px-3 py-2 text-center">
          <div className="text-xs font-black uppercase tracking-wider text-primary">
            Valentine's Day Pricing
          </div>
          <div className="mt-0.5 text-[11px] font-bold text-foreground/70 uppercase tracking-widest">
            Limited Inventory
          </div>
        </div>

        <div className="mt-5">
          {cart.price != null && (
            <div className="text-sm font-bold text-muted-foreground uppercase">
              Retail:{" "}
              <span className={discount > 0 ? "line-through opacity-70" : ""}>
                {money(cart.price)}
              </span>
            </div>
          )}
          <div className="mt-2 text-sm font-black uppercase text-primary tracking-widest">
            Valentine's Price:
          </div>
          <div className="text-4xl font-display font-black leading-none text-foreground mt-1">
            {money(salePrice)}
          </div>
          {discount > 0 && (
            <div className="mt-2 text-lg font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
              Save {money(discount)}
            </div>
          )}
          {salePrice != null && (
            <Link
              href="/financing"
              className="mt-3 block text-sm font-black text-primary hover:text-foreground transition-colors"
            >
              0% for 36 Months*
            </Link>
          )}
          {monthlyPayment != null && (
            <div className="mt-1 text-xs font-bold text-muted-foreground uppercase">
              Est. {money(monthlyPayment)}/mo at 0% APR
            </div>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="mb-3 text-xl font-display font-black uppercase tracking-widest text-center lg:text-right text-foreground/60">
            {cart.make}
          </div>
          <div className="grid grid-cols-1 gap-2">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-none border-border bg-background text-sm font-bold uppercase tracking-wider text-foreground hover:bg-muted hover:border-primary/40 transition-all"
            >
              <a href="tel:+18444562228">
                <Phone className="mr-2 h-4 w-4" />
                Call now
              </a>
            </Button>
            <Button
              asChild
              className="h-12 rounded-none bg-primary text-sm font-black uppercase tracking-wider text-primary-foreground hover:bg-primary/90 transition-all group"
            >
              <Link href={`/inventory/${cart.slug}`}>
                Claim Deal
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground uppercase tracking-wider">
            *Subject to lender approval, terms, taxes, fees.
          </p>
        </div>
      </div>
    </article>
  );
}
