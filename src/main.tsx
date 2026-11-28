import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import "./index.css";

const ThankYou = lazy(() => import("./ThankYou"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const ArticleMetaAds = lazy(() => import("./pages/ArticleMetaAds"));
const ArticleEcommerce = lazy(() => import("./pages/ArticleEcommerce"));
const ArticleWhatsAppFunnel = lazy(() => import("./pages/ArticleWhatsAppFunnel"));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#050E1A] flex items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF8A2A] border-t-transparent" />
  </div>
);

function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Main Landing Page */}
          <Route path="/" element={<App />} />

          {/* Thank You Page */}
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Blog Index */}
          <Route path="/blog" element={<BlogIndex />} />

          {/* 3 Dedicated High-Ranking Subpath Articles */}
          <Route path="/blog/meta-ads-guide-nigeria" element={<ArticleMetaAds />} />
          <Route path="/blog/ecommerce-sales-growth-nigeria" element={<ArticleEcommerce />} />
          <Route path="/blog/whatsapp-sales-funnel-guide" element={<ArticleWhatsAppFunnel />} />

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
