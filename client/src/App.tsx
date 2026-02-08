import { Switch, Route, Router, useHashLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import MathsGuideStandardForm from "./pages/maths-guide-1-2-standard-form-calculations";

function Router() {
  return (
      <Router hook={useHashLocation}>
    <Switch>
      <Route path="/" component={MathsGuideStandardForm} />
      <Route component={NotFound} />
    </Switch>
      </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
