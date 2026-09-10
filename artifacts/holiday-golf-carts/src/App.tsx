import { type ReactNode, useLayoutEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { Shell } from "@/components/layout/Shell";
import { SeoManager } from "@/components/SeoManager";
import Home from "@/pages/Home";
import Inventory from "@/pages/Inventory";
import Vehicle from "@/pages/Vehicle";
import Brands from "@/pages/Brands";
import Locations from "@/pages/Locations";
import Financing from "@/pages/Financing";
import Contact from "@/pages/Contact";
import Policy from "@/pages/Policy";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Shell>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/inventory" component={Inventory} />
          <Route path="/inventory/:slug" component={Vehicle} />
          <Route path="/brands" component={Brands} />
          <Route path="/locations" component={Locations} />
          <Route path="/financing" component={Financing} />
          <Route path="/contact" component={Contact} />
          <Route path="/policies/:slug" component={Policy} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Shell>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function ScrollToTop() {
  const [location] = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          <SeoManager />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
