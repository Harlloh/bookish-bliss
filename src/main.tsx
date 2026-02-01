import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3, // Retry failed requests 3 times
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
            refetchOnWindowFocus: true, // Refetch when user comes back to tab
            refetchOnReconnect: true, // Auto-retry when connection restored ✅
            staleTime: 5 * 60 * 1000, // 5 minutes
        },
        mutations: {
            retry: 1, // Retry mutations once
        },
    },
});
createRoot(document.getElementById("root")!).render(
    <>
        <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
    </>
);
