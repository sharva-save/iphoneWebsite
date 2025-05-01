import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import * as Sentry from "@sentry/react";
import React from "react";


Sentry.init({
  dsn: "https://dd3218be820c410793991fd2f696d26e@o4509198013300736.ingest.us.sentry.io/4509198014283776",
  integrations: [
//     Sentry.browserTracingIntegration(),
//     Sentry.metrics.metricsAggregatorIntegration()
// ,
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect:React.useEffect,
    }),
    Sentry.replayIntegration(),
  ],

  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
