import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import * as Sentry from "@sentry/react";


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
Sentry.init({
    dsn: "https://d42ade0d59d59fb0a8eb1cd6a9f7d33c@o4511149679116288.ingest.de.sentry.io/4511149688881232",
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true
});
createRoot(document.getElementById("root")!).render(
    <>
        <QueryClientProvider client={queryClient}>
            <button
                onClick={() => {
                    throw new Error('This is your first error!');
                }}
            >
                Break the world
            </button>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </>
);
