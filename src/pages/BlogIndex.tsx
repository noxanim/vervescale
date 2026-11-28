import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlogLayout from "../components/BlogLayout";
import { useSeo } from "../utils/seo";
import { ArrowRight, BookOpen, Clock, Tag, Search, Sparkles } from "lucide-react";

const articles = [
  {
    slug: "meta-ads-guide-nigeria",
    title: "Why Boosting Instagram Posts Fails: The Complete Guide to Profitable Meta Ads in Nigeria",
    excerpt: "Stop wasting money on the blue 'Boost Post' button. Learn how to structure real conversion campaigns, install Conversions API, and run direct-response Meta ads that drive real sales.",
    category: "Meta Ads Strategy",
    readTime: "7 min read",
    date: "November 2026",
    tag: "Most Popular",
    author: "VerveScale Digital Editorial"
  },
  {
    slug: "ecommerce-sales-growth-nigeria",
    title: "How to Scale E-Commerce Sales in Nigeria: Solving Pay-on-Delivery, Ad Fatigue & Cart Drop-offs",
    excerpt: "A tactical playbook for online store owners. How to overcome the Nigerian trust deficit, reduce POD rejection rates from 35% to under 6%, and implement WhatsApp cart recovery.",
    category: "E-Commerce",
    readTime: "8 min read",
    date: "November 2026",
    tag: "High ROI",
    author: "VerveScale Digital Editorial"
  },
  {
    slug: "whatsapp-sales-funnel-guide",
    title: "The WhatsApp Sales Funnel Blueprint: How High-Ticket & Service Businesses Close 5x More Clients",
    excerpt: "How real estate developers, clinics, and B2B consultants use Click-to-WhatsApp ads with pre-qualification filters to eliminate broke curiosity seekers and close millions in deals.",
    category: "WhatsApp Funnels",
    readTime: "7 min read",
    date: "November 2026",
    tag: "Lead Gen",
    author: "VerveScale Digital Editorial"
  }
];

export default function BlogIndex() {
  useSeo({
    title: "Blog & Insights — VerveScale Digital | Meta Ads, E-Commerce & WhatsApp Funnels in Nigeria",
    description: "Actionable performance marketing guides, Meta advertising strategies, e-commerce playbooks, and WhatsApp sales funnel blueprints for ambitious Nigerian businesses.",
    canonical: "https://www.vervescaledigital.com.ng/blog",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "VerveScale Digital Insights",
      "description": "Actionable performance marketing guides, Meta advertising strategies, e-commerce playbooks, and WhatsApp sales funnel blueprints for Nigerian businesses.",
      "url": "https://www.vervescaledigital.com.ng/blog",
      "publisher": {
        "@type": "Organization",
        "name": "VerveScale Digital",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.vervescaledigital.com.ng/verve_arrow.webp"
        }
      }
    }
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? articles 
    : articles.filter(a => a.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <BlogLayout>
      {/* HERO SECTION */}
      <div className="text-center py-6 sm:py-10">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8A2A]/30 bg-[#FF8A2A]/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#FF8A2A]">
          <BookOpen size={13} /> Performance Marketing Insights
        </span>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
          Actionable Guides for <span className="text-gradient">Nigerian Business Growth</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#C7D6E3] sm:text-base">
          Proven frameworks on Meta advertising, WhatsApp conversion systems, and scaling revenue in the Nigerian market without wasting ad spend.
        </p>

        {/* CATEGORY FILTER */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {["All", "Meta Ads", "E-Commerce", "WhatsApp Funnels"].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white shadow-lg shadow-orange-600/30"
                  : "border border-white/10 bg-[#071A2E] text-[#8A9DB0] hover:text-white hover:bg-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filtered.map(article => (
          <article
            key={article.slug}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#071A2E]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FF8A2A]/50 hover:bg-[#071A2E]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold text-[#FF8A2A]">
                  {article.category}
                </span>
                <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-extrabold text-emerald-400">
                  {article.tag}
                </span>
              </div>

              <h2 className="text-xl font-bold leading-snug text-white hover:text-[#FF8A2A] transition">
                <Link to={`/blog/${article.slug}`}>{article.title}</Link>
              </h2>

              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#8A9DB0] line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <div className="flex items-center justify-between text-xs text-[#8A9DB0]">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> {article.readTime}
                </span>
                <span>{article.date}</span>
              </div>

              <Link
                to={`/blog/${article.slug}`}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 py-2.5 text-xs font-bold text-white transition hover:bg-gradient-to-r hover:from-[#FF8A2A] hover:to-[#FF5E00]"
              >
                Read Article <ArrowRight size={13} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </BlogLayout>
  );
}
