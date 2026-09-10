import {
  Component,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  /** Changing this clears a caught error. Pass the route to recover on navigation. */
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === "string") {
    return new Error(value);
  }
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

function DefaultFallback({ error, resetError }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col w-full min-h-screen pt-24 bg-background items-center justify-center text-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-black dark:bg-grid-white opacity-[0.02]" />
      <div className="relative z-10 flex flex-col items-center">
        <AlertCircle className="h-16 w-16 text-primary mb-6" />
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-foreground mb-4">
          Unexpected Error
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-md font-medium">
          An error occurred while loading this section of the site. Our team has
          been notified.
        </p>

        {import.meta.env.DEV ? (
          <pre className="mt-4 overflow-x-auto rounded border border-border bg-muted p-4 text-left text-xs text-muted-foreground w-full max-w-2xl mb-8">
            {error.message || String(error)}
          </pre>
        ) : null}

        <Button
          onClick={resetError}
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none uppercase font-black tracking-widest px-10 h-14"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error(
      "ErrorBoundary caught an error:",
      toError(error),
      info.componentStack,
    );
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.error !== null &&
      prevProps.resetKey !== this.props.resetKey
    ) {
      this.resetError();
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) {
      return this.props.children;
    }
    const Fallback = this.props.FallbackComponent ?? DefaultFallback;
    return <Fallback error={error} resetError={this.resetError} />;
  }
}
