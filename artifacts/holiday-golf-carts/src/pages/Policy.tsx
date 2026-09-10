import { Link, useRoute } from "wouter";
import { ArrowLeft, FileText } from "lucide-react";
import { policiesBySlug } from "@/lib/policies";
import NotFound from "@/pages/not-found";

export default function PolicyPage() {
  const [, params] = useRoute("/policies/:slug");
  const policy = params?.slug ? policiesBySlug[params.slug] : undefined;

  if (!policy) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-background pt-24">
      <header className="relative overflow-hidden border-b border-border bg-secondary py-16 text-foreground">
        <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="mb-5 inline-flex items-center gap-2 border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-bold uppercase tracking-widest text-primary">
            <FileText className="h-4 w-4" />
            Policy Center
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-black uppercase tracking-tight text-foreground md:text-6xl">
            {policy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg font-medium leading-relaxed text-foreground/70">
            {policy.description}
          </p>
        </div>
      </header>

      <article className="container mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
        <p className="mb-10 border-l-2 border-primary pl-4 text-sm font-bold uppercase tracking-widest text-primary">
          Last updated September 9, 2026
        </p>

        <div className="space-y-12">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-black uppercase tracking-wide text-foreground md:text-3xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets && (
                  <ul className="list-disc space-y-3 pl-6">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {section.closingParagraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Return to Event Home
          </Link>
        </div>
      </article>
    </main>
  );
}
