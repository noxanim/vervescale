import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App";
import "./index.css";

const ThankYou = lazy(() => import("./ThankYou"));

function Root() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const normalized = path.toLowerCase().replace(/\/+$/, "");
  if (normalized === "/thank-you" || normalized.startsWith("/thank-you/")) {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#050E1A]" />}>
        <ThankYou />
      </Suspense>
    );
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
    <Analytics />
  </React.StrictMode>
);
