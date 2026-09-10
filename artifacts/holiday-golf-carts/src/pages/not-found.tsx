import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
      <div className="relative z-10 flex flex-col items-center">
        <AlertCircle className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tight text-foreground mb-4">
          Page <span className="text-ruby-gradient">Not Found</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md font-medium">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable during our event update.
        </p>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase font-black tracking-widest px-10 h-14 ruby-glow"
        >
          <Link href="/">Return to Event Home</Link>
        </Button>
      </div>
    </div>
  );
}
