import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThankYou from "./ThankYou";
import "./index.css";

function Root() {
  const [path, setPath] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const normalized = path.toLowerCase().replace(/\/+$/, "");
  if (normalized === "/thank-you" || normalized.startsWith("/thank-you/")) {
    return <ThankYou />;
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
