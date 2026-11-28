import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, MessageCircle, Star, CheckCircle2, Flame } from "lucide-react";
import vArrow from "../assets/verve_arrow.webp";

interface BlogLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export default function BlogLayout({ children, breadcrumbs }: BlogLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#050E1A] text-white selection:bg-[#FF5E00] selection:text-white">
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050E1A]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <img
              src={vArrow}
              alt="VerveScale Digital logo"
              className="h-[36px] max-w-[150px] w-auto shrink-0 object-contain sm:h-[44px]"
            />
            <span className="leading-none block shrink-0">
              <span className="block whitespace-nowrap text-[15px] font-extrabold tracking-tight sm:text-[20px]">
                VerveScale <span className="text-[#FF8A2A]">Digital</span>
              </span>
              <span className="mt-1 block text-[8px] font-bold uppercase tracking-[.22em] text-[#8A9DB0] sm:text-[9px]">
                Premium Media Buying
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-[13px] font-semibold text-[#C7D6E3] md:flex">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <a href="/#services" className="hover:text-white transition">Services</a>
            <a href="/#pricing" className="hover:text-white transition">Pricing</a>
            <a href="/#reviews" className="hover:text-white transition">Reviews</a>
            <Link to="/blog" className="text-[#FF8A2A] font-bold">Blog</Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/2348135831548"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-xs font-bold text-emerald-300 transition hover:bg-emerald-400/20 sm:inline-flex"
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-4 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110 sm:text-sm sm:px-5 sm:py-3"
            >
              Get Audit <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </header>

      {/* BREADCRUMBS */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <div className="border-b border-white/5 bg-[#071A2E]/50">
          <div className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-3 text-xs text-[#8A9DB0] sm:px-6">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <Link to="/blog" className="hover:text-white transition">Blog</Link>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                <span>/</span>
                {b.href ? (
                  <Link to={b.href} className="hover:text-white transition">{b.label}</Link>
                ) : (
                  <span className="truncate text-white font-medium">{b.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
        {children}
      </main>

      {/* CALL TO ACTION CARD */}
      <section className="border-t border-white/10 bg-[#071A2E] py-14 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FF8A2A]/30 bg-[#FF8A2A]/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#FF8A2A]">
            <Flame size={13} /> Scale Your Brand
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to stop boosting and <span className="text-gradient">build a real sales funnel?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#C7D6E3] sm:text-base">
            Whether you need a full audit of why your ads aren't converting or an end-to-end launch plan designed to sell within 3-5 days, VerveScale Digital has you covered.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-7 py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-600/30 transition hover:brightness-110"
            >
              Claim Your Launch Spot <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/2348135831548"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </div>
          <p className="mt-5 text-xs text-[#8A9DB0]">
            No guesswork • Ad spend paid directly to Meta • Verified Nigerian track record
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#030A13] py-12 text-sm text-[#8A9DB0]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link to="/" className="flex items-center gap-3">
                <img src={vArrow} alt="VerveScale Digital" className="h-10 w-auto" />
                <span className="text-lg font-extrabold text-white">
                  VerveScale <span className="text-[#FF8A2A]">Digital</span>
                </span>
              </Link>
              <p className="mt-3 max-w-md text-xs leading-relaxed text-[#C7D6E3]">
                Performance Meta ads &amp; media buying agency in Lagos, Nigeria. We build profitable Facebook &amp; Instagram funnels that convert cold traffic into revenue.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">Quick Links</h3>
              <ul className="mt-3 space-y-2 text-xs">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/blog" className="hover:text-white transition">Blog &amp; Case Studies</Link></li>
                <li><a href="/#pricing" className="hover:text-white transition">Pricing Plans</a></li>
                <li><a href="/#reviews" className="hover:text-white transition">Client Reviews</a></li>
                <li><a href="/#contact" className="hover:text-white transition">Book Ad Audit</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">Contact &amp; Location</h3>
              <p className="mt-3 text-xs leading-relaxed">
                Owode Wole Oludare Langbasa Close, 21 Oke Ira, Ajah / Lekki, Lagos State, Nigeria.
              </p>
              <p className="mt-2 text-xs">
                WhatsApp: <a href="https://wa.me/2348135831548" className="text-white underline">0813 583 1548</a>
              </p>
              <p className="mt-1 text-xs">
                Email: <a href="mailto:miraabel32@gmail.com" className="text-white underline">miraabel32@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs">
            © 2026 VerveScale Digital. All rights reserved. Built for performance media buying in Nigeria.
          </div>
        </div>
      </footer>
    </div>
  );
}
