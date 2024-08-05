import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/query-provider";
import RouterProvider from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";

function App() {
  return (
    <>
      <QueryProvider>
        <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
          <TooltipProvider>
            <RouterProvider />
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}

export default App;
