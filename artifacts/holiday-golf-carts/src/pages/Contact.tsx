import { Clock3, MapPin, Phone, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-background pt-24">
      <section className="relative flex flex-1 items-center overflow-hidden border-b border-border bg-secondary py-20 text-foreground md:py-28">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-bold uppercase tracking-widest text-primary ">
              <Heart className="h-4 w-4 fill-primary" />
              <span>Nationwide Sales Team</span>
            </div>

            <h1 className="font-display text-5xl font-black uppercase tracking-tight text-foreground md:text-7xl">
              Contact <span className="text-ruby-gradient">Us</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-foreground/70 md:text-xl">
              Speak directly with our team about Valentine's Day golf cart
              deals, available inventory, participating dealers, and financing
              options.
            </p>

            <div className="mx-auto mt-10 grid max-w-2xl gap-4 border-y border-foreground/10 py-8 text-left sm:grid-cols-2">
              <div className="flex items-center gap-4 sm:border-r sm:border-foreground/10 sm:pr-6">
                <Clock3 className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-foreground/50">
                    Call Hours
                  </p>
                  <p className="mt-1 font-bold text-foreground">
                    Mon–Sat, 9:00 AM–5:00 PM
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:pl-6">
                <MapPin className="h-6 w-6 shrink-0 text-primary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-foreground/50">
                    Service Area
                  </p>
                  <p className="mt-1 font-bold text-foreground">
                    Participating dealers nationwide
                  </p>
                </div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="mt-10 h-16 rounded-none bg-primary px-12 text-lg font-black uppercase tracking-widest text-primary-foreground ruby-glow hover:bg-primary/90"
            >
              <a href="tel:+18444562228">
                <Phone className="mr-2 h-5 w-5 fill-current" />
                Call Now
              </a>
            </Button>

            <p className="mt-5 text-sm font-bold tracking-wider text-foreground/60">
              1-844-456-2228
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
