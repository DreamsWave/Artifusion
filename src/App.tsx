import "@/App.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import QueryProvider from "@/providers/query-provider";
import RouterProvider from "@/providers/router-provider";

function App() {
  return (
    <>
      <QueryProvider>
        <TooltipProvider>
          <RouterProvider />
        </TooltipProvider>
      </QueryProvider>
    </>
  );
}

export default App;
