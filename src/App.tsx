import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, BadgeCheck, CalendarClock, Check, ChevronDown, ChevronLeft, ChevronRight, Flame, Megaphone, MessageCircle, PenLine, Search, Sparkles, Target, TrendingUp, Users, Zap, ShieldCheck } from "lucide-react";
import logoWhite from "./assets/vervescale_logo_white.webp";
import vArrow from "./assets/verve_arrow.webp";
import footerLogo from "./assets/verve_arrow.webp";
import metricLeadForm from "./assets/metric_leadform.webp";
import metricWhatsApp from "./assets/metric_whatsapp.webp";
import metricNewSales from "./assets/metric_newsales.webp";
import metricNewLeads from "./assets/metric_newleads.webp";
import metricSalesCampaigns from "./assets/metric_salescampaigns.webp";
import metricTraffic from "./assets/metric_traffic.webp";
import heroWoman from "./assets/hero_woman.webp";

type Plan = { name:string; price:string; desc:string; gets:string[]; note?:string; tag?:string };

const oneTime: Plan[] = [
  { name:"Setup Only", price:"₦20,000", desc:"Your ad account, pixel and foundation set up correctly.", gets:["Business Manager setup","Ad Account setup","Pixel check","Handover document"], note:"Does NOT include: creatives, copy, launch, management" },
  { name:"Audit", price:"₦45,000", desc:"A clear review of your account, ads and funnel — with what to fix first.", gets:["Full ad account audit","What is wasting your money","What to fix first","Priority action list","30-min review call","PDF report"] },
  { name:"Launch", price:"₦75,000", desc:"One focused campaign, built to sell and launched in 3-5 days.", gets:["Everything in Setup","1 campaign","3 ad creatives","Ad copy written for you","Targeting + audience setup","Launch + 3 days check-in","Handover"], tag:"Most Popular" },
  { name:"Build", price:"₦150,000", desc:"A stronger launch with more creative and a deeper funnel setup.", gets:["Everything in Launch","2 campaigns","6 ad creatives","Retargeting setup","WhatsApp / funnel review","7 days post-launch support"] },
  { name:"Full Funnel", price:"₦250,000", desc:"Cold, retargeting and conversion working together as one system.", gets:["Everything in Build","Full funnel strategy","Landing page review","3 campaigns","9 creatives","30 days support"] },
];

const monthly: Plan[] = [
  { name:"Essential", price:"₦110,000", desc:"Ongoing management for one core offer, with steady optimisation.", gets:["1 campaign","4 creatives/mo","Weekly optimisation","Monthly report","Email + WhatsApp support"] },
  { name:"Growth", price:"₦165,000", desc:"More testing, more creative direction and faster optimisation.", gets:["2 campaigns","8 creatives/mo","Retargeting included","Bi-weekly report","WhatsApp reply scripts","Bi-weekly strategy check"], tag:"Recommended" },
  { name:"Scale", price:"₦290,000", desc:"Full management across campaigns, retargeting and scaling.", gets:["Full funnel management","Unlimited optimisation","Weekly strategy call","Priority support","Creative testing","Monthly deep report"] },
];

const allPlans = [...oneTime.map(p=>({label:`${p.name} — ${p.price} (One-Time)`, value:`${p.name} — One-Time`})), ...monthly.map(p=>({label:`${p.name} — ${p.price}/month (Monthly)`, value:`${p.name} — Monthly`}))];

const planPaymentDetails: Record<string, { price:string; amount:number; ctaPrice:string; summaryPrice:string; isMonthly:boolean; paymentUrl:string }> = {
  "Setup Only": { price:"₦20,000", amount:20000, ctaPrice:"₦20,000", summaryPrice:"₦20,000 One-Time", isMonthly:false, paymentUrl:"https://flutterwave.com/pay/mpfzyxnayygm" },
  "Audit": { price:"₦45,000", amount:45000, ctaPrice:"₦45,000", summaryPrice:"₦45,000 One-Time", isMonthly:false, paymentUrl:"https://flutterwave.com/pay/rotdn5v1oxz1" },
  "Launch": { price:"₦75,000", amount:75000, ctaPrice:"₦75,000", summaryPrice:"₦75,000 One-Time", isMonthly:false, paymentUrl:"https://flutterwave.com/pay/puvwlyl3fcce" },
  "Build": { price:"₦150,000", amount:150000, ctaPrice:"₦150,000", summaryPrice:"₦150,000 One-Time", isMonthly:false, paymentUrl:"https://flutterwave.com/pay/00dmqsnlutkd" },
  "Full Funnel": { price:"₦250,000", amount:250000, ctaPrice:"₦250,000", summaryPrice:"₦250,000 One-Time", isMonthly:false, paymentUrl:"https://flutterwave.com/pay/gwnh3ieykjgk" },
  "Essential": { price:"₦110,000", amount:110000, ctaPrice:"₦110,000/mo", summaryPrice:"₦110,000/month", isMonthly:true, paymentUrl:"https://flutterwave.com/pay/ukx0kpnswhro" },
  "Growth": { price:"₦165,000", amount:165000, ctaPrice:"₦165,000/mo", summaryPrice:"₦165,000/month", isMonthly:true, paymentUrl:"https://flutterwave.com/pay/ohd9cxecfsqo" },
  "Scale": { price:"₦290,000", amount:290000, ctaPrice:"₦290,000/mo", summaryPrice:"₦290,000/month", isMonthly:true, paymentUrl:"https://flutterwave.com/pay/gbvuosgkhb8o" },
};

const FLUTTERWAVE_PUBLIC_KEY =
  (import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY as string | undefined) ||
  "FLWPUBK-c1984a390ffa590172e1b50364fd40c3-X";

function ensureFlutterwaveScript(): Promise<void> {
  if (typeof window !== "undefined" && typeof window.FlutterwaveCheckout === "function") {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://checkout.flutterwave.com/v3.js"]');
    if (existing) {
      if (typeof window.FlutterwaveCheckout === "function") {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load Flutterwave script")));
      }
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.flutterwave.com/v3.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Flutterwave script"));
    document.head.appendChild(script);
  });
}

const faqs = [
  { q:"Do you guarantee sales?", a:"No honest media buyer can guarantee sales. What we guarantee is structure: clean tracking, a real funnel, creative built to convert, and disciplined optimisation. Your offer, pricing, and follow-up still matter — and we will tell you plainly where they need work." },
  { q:"What if I have no creatives?", a:"Start with Audit or Launch. We write your ad copy and design the creatives included in your plan. If you have photos or videos already, we will use the strongest ones and tell you exactly what else to shoot." },
  { q:"How fast do we launch?", a:"A focused Launch plan goes live in 3–5 days once we have your assets, offer details, and access. Larger funnel builds take longer because the system behind the ad needs to be right." },
  { q:"Is ad spend included?", a:"No. Ad spend is NOT included. You pay Meta directly, so your money stays in your account and you can see exactly what goes to ads versus our service fee." },
  { q:"Do I need a website?", a:"Not always. Many businesses sell through WhatsApp. We review your WhatsApp flow or landing page and build the funnel around the route your customers already trust." },
  { q:"What do you need from me to start?", a:"Your offer, your best customer in one sentence, your product photos or videos, and access to your Business Manager or ad account. From there, we handle strategy, creative, setup, and launch." },
];

const shellStyle: React.CSSProperties = { boxSizing:"border-box", paddingTop:"var(--safe-area-inset-top)" };



const metricSlides = [
  { img: metricLeadForm, alt: "Meta Ads Manager screenshot showing Lead Form campaigns with 128 leads at ₦118.60 per lead", caption: "Lead Generation — From ₦118.60 per Lead" },
  { img: metricWhatsApp, alt: "Meta Ads Manager screenshot showing WhatsApp Sales campaigns with 38 and 52 conversions", caption: "WhatsApp Sales — From ₦163.46 per Conversion" },
  { img: metricNewSales, alt: "Meta Ads Manager screenshot showing New Sales campaigns with 42 and 37 conversions", caption: "New Sales — Conversions" },
  { img: metricNewLeads, alt: "Meta Ads Manager screenshot showing New Leads campaigns with 84, 68 and 112 leads", caption: "Lead Campaigns — From ₦142.80 per Lead" },
  { img: metricSalesCampaigns, alt: "Meta Ads Manager screenshot showing Sales Campaigns with 45, 61 and 156 conversions", caption: "Sales Campaigns — Up to 156 Conversions" },
  { img: metricTraffic, alt: "Meta Ads Manager screenshot showing Traffic campaigns with 1,248 link clicks at ₦12.18 per click", caption: "Traffic — From ₦10.36 per Link Click" },
];

function MetricsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const touchX = useRef<number | null>(null);
  const visible = isDesktop ? 2 : 1;
  const maxIndex = metricSlides.length - visible;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current >= maxIndex ? 0 : current + 1));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [paused, maxIndex]);

  const prev = () => setIndex((current) => (current <= 0 ? maxIndex : current - 1));
  const next = () => setIndex((current) => (current >= maxIndex ? 0 : current + 1));

  return (
    <section aria-label="Realtime campaign metrics" className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-[clamp(1.5rem,4vw,2.25rem)] leading-tight">Realtime Data — Live Campaign Metrics</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-extrabold tracking-[.18em] text-emerald-300">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              LIVE
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[#C7D6E3]">Real Meta Ads Manager screenshots — leads, sales &amp; traffic.</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={prev} aria-label="Show previous metrics" className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110"><ChevronLeft size={20} /></button>
          <button type="button" onClick={next} aria-label="Show next metrics" className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white shadow-lg shadow-orange-600/30 transition hover:brightness-110"><ChevronRight size={20} /></button>
        </div>
      </div>

      <div
        className="mt-6 overflow-x-clip"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const delta = e.changedTouches[0].clientX - touchX.current;
          if (delta <= -40) next();
          if (delta >= 40) prev();
          touchX.current = null;
        }}
      >
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${index * (100 / visible)}%)` }}>
          {metricSlides.map((slide) => (
            <figure key={slide.caption} className="w-full shrink-0 px-1.5 sm:px-2 md:w-1/2">
              <div className="overflow-hidden rounded-[24px] bg-white shadow-2xl ring-1 ring-white/20">
                <img src={slide.img} alt={slide.alt} loading="lazy" decoding="async" className="h-[340px] w-full object-contain bg-white sm:h-[400px]" />
                <figcaption className="flex items-center gap-2.5 bg-[#050E1A] px-5 py-4 text-sm font-extrabold leading-snug text-white sm:text-[15px]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#FF8A2A]" aria-hidden="true" />
                  <span className="[overflow-wrap:anywhere]">{slide.caption}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2" role="tablist" aria-label="Metric slides">
        {Array.from({ length: maxIndex + 1 }, (_, i) => (
          <button key={i} type="button" role="tab" aria-selected={index === i} aria-label={`Go to metric slide ${i + 1}`} onClick={() => setIndex(i)} className={`h-2.5 rounded-full transition-all ${index === i ? "w-8 bg-[#FF8A2A]" : "w-2.5 bg-white/25 hover:bg-white/50"}`} />
        ))}
      </div>
      <p className="mt-3 text-center text-xs leading-relaxed text-[#8A9DB0]">Results vary by offer, budget &amp; market. Past results are not a guarantee.</p>
    </section>
  );
}

const heroPhrases = ["Selling.", "get Leads", "get Sales", "get Calls", "get Books", "get Appointments"];

function HeroTypewriter() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState("Selling.");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = heroPhrases[phraseIndex];
    let timer: number;
    if (!deleting) {
      if (text.length < current.length) {
        timer = window.setTimeout(() => setText(current.slice(0, text.length + 1)), 70);
      } else {
        timer = window.setTimeout(() => setDeleting(true), 1600);
      }
    } else if (text.length > 0) {
      timer = window.setTimeout(() => setText(current.slice(0, text.length - 1)), 35);
    } else {
      timer = window.setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
      }, 120);
    }
    return () => window.clearTimeout(timer);
  }, [text, deleting, phraseIndex]);

  const isAppointments = heroPhrases[phraseIndex] === "get Appointments";
  return (
    <span
      aria-label={`Start ${heroPhrases[phraseIndex]}`}
      style={{ display: "inline-flex", alignItems: "baseline", flexWrap: "nowrap", whiteSpace: "nowrap", overflow: "visible", gap: "0.22em", maxWidth: "100%", lineHeight: 1.3, paddingBottom: "0.18em" }}
    >
      <span style={{ whiteSpace: "nowrap", flexShrink: 0, overflow: "visible", lineHeight: 1.3, paddingBottom: "0.18em" }}>Start</span>
      <span
        className={isAppointments ? "text-gradient hero-rotating hero-rotating--appointments" : "text-gradient hero-rotating"}
        aria-hidden="true"
        style={{ display: "inline-block", whiteSpace: "nowrap", overflow: "visible", lineHeight: 1.3, paddingBottom: "0.18em", fontSize: isAppointments ? "clamp(1.15rem, 4.8vw, 2.7rem)" : "clamp(1.9rem, 7.5vw, 3.6rem)", fontWeight: 800, flex: "1 1 auto", flexShrink: 1, minWidth: 0 }}
      >
        {text}
      </span>
      <span aria-hidden="true" className="animate-pulse" style={{ color: "#FF8A2A", WebkitTextFillColor: "#FF8A2A", background: "none", WebkitBackgroundClip: "border-box", marginLeft: "-0.12em", overflow: "visible", lineHeight: 1.3, paddingBottom: "0.18em", whiteSpace: "nowrap", flexShrink: 0 }}>|</span>
    </span>
  );
}

export default function App(){
  const [tab,setTab] = useState<"one"|"monthly">("one");
  const [openFaq,setOpenFaq] = useState(0);
  const [selectedPlan,setSelectedPlan] = useState("Launch — One-Time");
  const [form,setForm] = useState({ name:"", whatsapp:"", email:"", business:"", budget:"", goal:"", message:"" });
  const isSetupOnly = selectedPlan.includes("Setup");
  const setupBudget = "None — Setup Only, no ad budget needed";
  // FIX 1 — Setup Only: auto-select None, disable budget, hide Launch/Monthly questions.
  // Runs on page load, on Plan dropdown change, and when a pricing button pre-selects a plan,
  // because all three paths only change `selectedPlan`.
  useEffect(() => {
    if (isSetupOnly) {
      setForm((s) => (s.budget === setupBudget ? s : { ...s, budget: setupBudget }));
    } else {
      setForm((s) => (s.budget === setupBudget ? { ...s, budget: "" } : s));
    }
  }, [isSetupOnly, setupBudget]);
  const [isSending,setIsSending] = useState(false);

  const goToForm = (plan:string) => {
    setSelectedPlan(plan);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });
    }, 300);
  };
  const update = (k:string,v:string)=> setForm(s=>({...s,[k]:v}));
  const selectedPlanName = selectedPlan ? selectedPlan.split(" — ")[0].trim() : "";
  const selectedPlanDetails = selectedPlanName ? planPaymentDetails[selectedPlanName] : undefined;
  const ctaText = "Pay Now →";
  const planSummaryText = selectedPlanDetails ? `Selected: ${selectedPlanName} — ${selectedPlanDetails.summaryPrice} • ${selectedPlanDetails.isMonthly ? "Minimum 2 months • " : ""}Ad spend NOT included` : "";
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    const planName = selectedPlan ? selectedPlan.split(" — ")[0].trim() : "";
    const planDetails = planName ? planPaymentDetails[planName] : undefined;
    const amount = planDetails?.amount ?? 75000;
    const txRef = `VS_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

    try {
      fetch("https://formsubmit.co/ajax/b9b501a5ebe69924b6d7c1e2618256a8", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          name: form.name,
          whatsapp: form.whatsapp,
          email: form.email,
          business: form.business,
          plan: selectedPlan,
          budget: form.budget,
          goal: form.goal,
          message: form.message,
          tx_ref: txRef,
          _subject: "New VerveScale Lead - " + selectedPlan,
          _template: "table",
          _captcha: "false"
        }),
        keepalive: true
      }).catch(() => {});
    } catch {
      // Keep the checkout flow moving even if sending the lead fails.
    }

    try {
      await ensureFlutterwaveScript();

      if (typeof window.FlutterwaveCheckout !== "function") {
        throw new Error("Flutterwave Checkout script not available");
      }

      window.FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: txRef,
        amount: amount,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd",
        customer: {
          email: form.email.trim(),
          phone_number: form.whatsapp.trim(),
          name: form.name.trim(),
        },
        customizations: {
          title: "VerveScale Digital",
          description: `Payment for ${selectedPlanName || selectedPlan}`,
          logo: "https://vervescale.vercel.app/favicon.png",
        },
        callback: (response: any) => {
          if (response?.status === "successful" || response?.status === "completed") {
            try {
              fetch("https://formsubmit.co/ajax/b9b501a5ebe69924b6d7c1e2618256a8", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                  payment_status: "SUCCESSFUL",
                  flw_ref: response.flw_ref,
                  tx_ref: response.tx_ref || txRef,
                  transaction_id: response.transaction_id,
                  amount: response.amount || amount,
                  currency: response.currency || "NGN",
                  name: form.name,
                  email: form.email,
                  whatsapp: form.whatsapp,
                  plan: selectedPlan,
                  _subject: "✅ PAYMENT CONFIRMED: " + selectedPlan + " - " + form.name,
                  _template: "table",
                  _captcha: "false"
                }),
                keepalive: true
              }).catch(() => {});
            } catch {}

            window.location.href = "/thank-you";
          } else {
            setIsSending(false);
          }
        },
        onclose: () => {
          setIsSending(false);
        },
      });
    } catch (err) {
      console.error("Flutterwave inline checkout failed, fallback to payment link:", err);
      const paymentUrl = planDetails?.paymentUrl;
      const destination = paymentUrl ?? "https://flutterwave.com/pay/puvwlyl3fcce";
      window.location.href = destination;
    }
  };
  const plans = tab==="one"? oneTime : monthly;

  return (
    <div data-safe-area-inset-root style={shellStyle} className="min-h-screen bg-[#050E1A] text-white overflow-x-clip pb-24">
      {/* NAV */}
      <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-40 border-b border-white/10 bg-[#050E1A]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="#top" className="flex items-center gap-2 sm:gap-3 shrink-0 bg-transparent" style={{ background:"transparent", border:"none", boxShadow:"none", padding:0, display:"flex", visibility:"visible", opacity:1, overflow:"visible", flexShrink:0 }}>
            <img src={vArrow} alt="VerveScale Digital logo" className="h-[36px] max-w-[150px] w-auto shrink-0 object-contain bg-transparent sm:h-[44px] sm:max-w-none" style={{ background:"transparent", border:"none", boxShadow:"none", padding:0, visibility:"visible", opacity:1, flexShrink:0 }} />
            <span className="leading-none block shrink-0"><span className="block whitespace-nowrap text-[15px] font-extrabold tracking-tight sm:text-[20px]">VerveScale <span className="text-[#FF8A2A]">Digital</span></span><span className="mt-1 block text-[8px] font-bold uppercase tracking-[.22em] text-[#8A9DB0] sm:text-[9px]">Premium Media Buying</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-[13px] font-semibold text-[#C7D6E3] lg:flex">
            <a href="#how" className="hover:text-white">How It Works</a><a href="#services" className="hover:text-white">Services</a><a href="#results" className="hover:text-white">Results</a><a href="#pricing" className="hover:text-white">Pricing</a><a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FF8A2A] xl:inline-flex"><Flame size={12}/> 4 Launch Spots / Month</span>
            <button type="button" onClick={()=>goToForm("Audit — One-Time")} className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-4 py-3 text-[13px] font-extrabold text-white shadow-lg shadow-orange-600/30 hover:brightness-110 sm:inline-flex">Get My Audit <ArrowRight size={15}/></button>
            <a href="#pricing" className="shrink-0 rounded-full border border-white/15 px-3.5 py-2.5 text-xs font-extrabold text-white lg:hidden">Pricing</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-x-clip bg-[#050E1A]" style={{ overflowX: "clip", overflowY: "visible" }}>
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[#FF5E00]/20 blur-[110px]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-[-80px] top-[280px] h-72 w-72 rounded-full bg-[#3A9AD9]/20 blur-[90px]" aria-hidden="true" />
        <div className="pointer-events-none absolute left-[-80px] bottom-[40px] h-72 w-72 rounded-full bg-[#FF8A2A]/10 blur-[90px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-9 sm:px-6 sm:pt-14 lg:pb-10">
          <div className="grid gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-12 lg:items-center">
            <div>
              <span aria-hidden="true" className="block h-[3px] w-12 rounded-full bg-[#FF7A1A]" />
              <h1 className="mt-6 text-[clamp(2.7rem,7.8vw,4.9rem)] leading-[1.3] tracking-tight" style={{ overflow: "visible", lineHeight: 1.3, paddingBottom: "0.18em" }}>Stop Boosting.<br/><HeroTypewriter /></h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#C7D6E3] sm:text-lg">Meta ads built to sell — not just get likes. We handle strategy, creative, targeting, and scaling, so your offer reaches the right buyers and beyond.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button onClick={()=>goToForm("Launch — One-Time")} className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-6 py-4 text-sm font-extrabold text-white shadow-xl shadow-orange-600/30 hover:brightness-110">Get My Launch Plan <ArrowRight size={17}/></button>
                <a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-4 text-sm font-extrabold text-white hover:bg-white/5">See Pricing <ArrowUpRight size={17}/></a>
              </div>
              <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold text-[#8A9DB0]"><span>3–5 Day Launch</span><span className="text-[#FF8A2A]">•</span><span>No Guesswork</span><span className="text-[#FF8A2A]">•</span><span>Ad Spend Paid Directly to Meta</span></p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-8">
                {[{n:"3–5",l:"days to launch"},{n:"9",l:"creatives in Full Funnel"},{n:"30",l:"days support"}].map(s=><div key={s.l}><div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{s.n}</div><div className="mt-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#8A9DB0]">{s.l}</div></div>)}
              </div>
            </div>

            <aside className="hero-photo-wrap relative flex items-center justify-center overflow-visible bg-transparent" style={{ background: "transparent", border: "none", boxShadow: "none", overflow: "visible", alignSelf: "flex-end", position: "relative", zIndex: 20 }}>
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_38%_32%,rgba(255,138,42,0.36),transparent_58%),radial-gradient(circle_at_72%_72%,rgba(58,154,217,0.30),transparent_55%)] blur-2xl" />
              <img src={heroWoman} alt="VerveScale Digital media buyer in a navy VerveScale Digital t-shirt holding a laptop showing the Meta Ads Manager dashboard" fetchPriority="high" decoding="async" className="hero-photo-zoom relative z-10 h-[320px] w-full max-w-[520px] object-contain bg-transparent sm:h-[440px] lg:h-[520px] lg:max-h-[520px]" style={{ background: "transparent", boxShadow: "none", border: "none" }} />
            </aside>
          </div>


        </div>
      </section>

      {/* TRUST BAR */}
      <div className="border-y border-white/10 bg-[#071A2E] py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-4 sm:px-6">
          {["Meta Ads That Sell","Funnel & Retargeting","WhatsApp Sales Systems","Creative That Stops The Scroll","Launch In 3–5 Days"].map(t=><span key={t} className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-white whitespace-nowrap"><span className="text-[#FF8A2A]">●</span>{t}</span>)}
        </div>
      </div>

      {/* PAIN */}
      <section id="pain" className="bg-[#050E1A]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="mt-3 text-[clamp(2.1rem,5.5vw,3.5rem)]">Sound <span className="text-gradient">familiar?</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-[#C7D6E3]">Most businesses don’t have a product problem. They have a system problem — and it shows up in the same three places.</p></div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[{t:"Boosting posts with no sales",d:"Likes feel good. Likes do not pay rent. A boosted post without a funnel is just expensive attention.", icon:Megaphone},{t:"Paying for clicks that never buy",d:"Traffic is not the problem. The wrong audience, weak offer, and no follow-up are.", icon:Target},{t:"Lots of effort, not enough clarity",d:"You’re doing the work. You just need updates, a plan, and a next step you can actually see.", icon:Users}].map((c,i)=><article key={c.t} className="glass rounded-3xl bg-[#0F2F4D]/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#FF8A2A]/40 sm:p-7"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF8A2A]/15 text-[#FF8A2A]"><c.icon size={22}/></div><span className="text-2xl font-extrabold text-white/15">0{i+1}</span></div><h3 className="mt-6 text-[21px] leading-tight">{c.t}</h3><p className="mt-3 text-sm leading-relaxed text-[#C7D6E3]">{c.d}</p></article>)}
          </div>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-white/10 bg-[#071A2E] p-6 sm:flex-row sm:items-center sm:p-7"><div><p className="text-2xl font-extrabold tracking-tight sm:text-[28px]">It’s not your product. It’s your <span className="text-gradient">funnel.</span></p><p className="mt-1.5 text-sm text-[#C7D6E3]">Fix the system, and the same product can finally sell.</p></div><a href="#how" className="shrink-0 rounded-full bg-white px-5 py-3 text-sm font-extrabold text-[#050E1A] hover:bg-[#EAF2F8]">See the fix →</a></div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="bg-[#071A2E]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end"><div><h2 className="mt-3 max-w-2xl text-[clamp(2.1rem,5.5vw,3.5rem)]">Built to sell,<br/>not to <span className="text-gradient">look busy.</span></h2></div><p className="max-w-md text-sm leading-relaxed text-[#C7D6E3]">Every campaign follows the same discipline: understand the buyer, make the offer impossible to ignore, test it fast, then scale what works.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[{n:"01",t:"Audit & Strategy",d:"We find what is wasting money, who should see your offer, and what must change first.",icon:Search},{n:"02",t:"Creative That Stops The Scroll",d:"Bold visuals and direct copy written for your buyer — not generic templates.",icon:PenLine},{n:"03",t:"Launch & Test",d:"A focused campaign goes live in days. We test creative, audience, and offer angles.",icon:Zap},{n:"04",t:"Optimise & Scale",d:"Winners get more budget. Losers get cut. The system gets sharper every week.",icon:TrendingUp}].map(s=><article key={s.n} className="glass rounded-3xl bg-[#0F2F4D]/60 p-6 transition hover:-translate-y-1 hover:border-[#FF8A2A]/50"><span className="text-4xl font-extrabold text-gradient">{s.n}</span><div className="mt-5 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white"><s.icon size={20}/></div><h3 className="mt-4 text-[19px] leading-tight">{s.t}</h3><p className="mt-2 text-sm leading-relaxed text-[#C7D6E3]">{s.d}</p></article>)}
          </div>
          <div className="mt-6 text-center"><a href="#services" className="inline-flex items-center gap-2 font-extrabold text-white">What we can build for you <ArrowRight size={17}/></a></div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-[#0A2340]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="mt-3 max-w-3xl text-[clamp(2.1rem,5.5vw,3.5rem)]">Everything your ads need.<br/><span className="text-gradient">Nothing they don’t.</span></h2>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[{t:"Meta Ads Setup",d:"Business Manager, ad account, pixel, and foundation — set up correctly from day one.",icon:BadgeCheck},{t:"Ad Creatives & Copy",d:"Scroll-stopping visuals and direct-response copy built around your offer.",icon:Sparkles},{t:"Funnel & Retargeting",d:"Cold, warm, and ready-to-buy audiences working together as one system.",icon:Target},{t:"WhatsApp Funnel Review",d:"Your replies, offer flow, and follow-up checked — because sales happen in the chat.",icon:MessageCircle},{t:"Landing Page Review",d:"A clear diagnosis of why visitors leave, and what to change first.",icon:Search},{t:"Monthly Management",d:"Testing, optimisation, reporting, and scaling — without you babysitting ads.",icon:CalendarClock}].map(s=><article key={s.t} className="glass rounded-3xl bg-[#0F2F4D]/60 p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#FF8A2A]/40"><s.icon className="text-[#FF8A2A]" size={26}/><h3 className="mt-4 text-[20px]">{s.t}</h3><p className="mt-2 text-sm leading-relaxed text-[#C7D6E3]">{s.d}</p></article>)}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#pricing" className="inline-flex justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-6 py-3.5 text-sm font-extrabold text-white hover:brightness-110">Pick a plan that fits</a><a href="#contact" className="inline-flex justify-center rounded-full border border-white/20 bg-transparent px-6 py-3.5 text-sm font-extrabold text-white hover:bg-white/5">Talk through my offer</a></div>
        </div>
      </section>

      {/* BUILT FOR BUSINESSES */}
      <section id="results" className="bg-[#050E1A]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <h2 className="max-w-4xl text-[clamp(2.1rem,5.5vw,3.7rem)] leading-[1.02]">Built for businesses that need customers<br/><span className="font-normal italic text-[#FF7A1A]" style={{fontFamily:"Georgia,'Times New Roman',serif"}}>— not just likes.</span></h2>
          <MetricsCarousel />
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["E-commerce","Real estate","Skincare / Beauty","Fashion","Coaches / Courses","Local services"].map((pill)=><span key={pill} className="rounded-full border border-white/20 bg-[#071A2E] px-4 py-2 text-[13px] font-bold text-white">{pill}</span>)}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.45fr_.85fr] lg:items-stretch">
            <div className="rounded-[28px] border border-white/10 bg-[#071A2E]/80 p-6 shadow-sm sm:p-8">
              <p className="text-[11px] font-extrabold uppercase tracking-[.22em] text-[#FF8A2A]">Everything your ad needs</p>
              <div className="mt-6 grid gap-x-8 sm:grid-cols-2">
                {["Meta Ads Setup","Creatives","Copy","Targeting","Retargeting","Scaling","WhatsApp / Sales funnels"].map((item,i)=><div key={item} className={`flex items-baseline gap-4 py-4 ${i < 6 ? "border-b border-white/10" : ""} ${i === 5 ? "sm:border-b" : ""} ${i === 6 ? "sm:col-span-2" : ""}`}><span className="shrink-0 text-sm font-extrabold text-[#FF8A2A]">0{i+1}</span><span className="text-[17px] font-bold leading-snug text-white sm:text-lg">{item}</span></div>)}
              </div>
            </div>
            <div className="flex flex-col rounded-[28px] bg-[#FF7A1A] p-6 text-white shadow-xl sm:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 text-white"><Sparkles size={22}/></span>
              <h3 className="mt-6 text-[28px] leading-[1.08] sm:text-[32px]">Not sure what you need?</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/90">Start with Launch. It covers the essentials.</p>
              <button onClick={()=>{ setTab("one"); setSelectedPlan("Launch — One-Time"); window.setTimeout(()=>{ document.getElementById("pricing")?.scrollIntoView({ behavior:"smooth" }); }, 80); }} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-extrabold text-[#050E1A] hover:bg-[#EAF2F8] lg:mt-auto">See Launch <ArrowRight size={17}/></button>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#071A2E]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="text-center"><h2 className="mx-auto mt-3 max-w-3xl text-[clamp(2.1rem,5.5vw,3.5rem)]">Choose your<br/><span className="text-gradient">starting point.</span></h2><p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#C7D6E3]">Start lean and launch fast — or hand us the whole funnel and scale with support.</p></div>
          <div className="mx-auto mt-8 flex w-fit rounded-full border border-white/10 bg-[#050E1A] p-1.5 shadow-sm" role="tablist" aria-label="Pricing period">
            <button role="tab" aria-selected={tab==="one"} onClick={()=>setTab("one")} className={`rounded-full px-5 py-3 text-sm font-extrabold transition sm:px-8 ${tab==="one"?"bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white shadow-lg shadow-orange-600/30":"text-[#8A9DB0] hover:text-white"}`}>One-Time</button>
            <button role="tab" aria-selected={tab==="monthly"} onClick={()=>setTab("monthly")} className={`rounded-full px-5 py-3 text-sm font-extrabold transition sm:px-8 ${tab==="monthly"?"bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white shadow-lg shadow-orange-600/30":"text-[#8A9DB0] hover:text-white"}`}>Monthly</button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {plans.map(p=>{
              const popular=!!p.tag;
              return <article key={p.name} className={`relative flex flex-col rounded-[26px] p-6 transition hover:-translate-y-1 sm:p-7 ${popular?"bg-[#0A2340] text-white shadow-2xl ring-2 ring-[#FF8A2A] shadow-orange-600/20":"glass bg-[#0F2F4D]/50 shadow-sm hover:shadow-lg"}`}>
                {popular && <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-white shadow-lg">{p.tag}</span>}
                <div className="flex items-start justify-between gap-3"><h3 className="text-[24px] leading-none">{p.name}</h3><span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider ${popular?"bg-white/10 text-white":"bg-[#FF8A2A]/15 text-[#FF8A2A]"}`}>{tab==="one"?"One-Time":"Monthly"}</span></div>
                <div className="mt-4 flex items-baseline gap-1.5"><span className="text-[40px] font-extrabold leading-none tracking-tight">{p.price}</span>{tab==="monthly" && <span className="text-sm font-bold opacity-70">/month</span>}</div>
                <div className="mt-4 h-px bg-white/10" />
                <p className="mt-4 text-sm leading-relaxed text-[#C7D6E3]">{p.desc}</p>
                <ul className="mt-5 flex-1 space-y-2.5">{p.gets.map(g=><li key={g} className="flex items-start gap-2.5 text-sm font-medium"><span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white"><Check size={12} strokeWidth={3}/></span><span>{g}</span></li>)}</ul>
                {p.note && <p className="mt-4 rounded-xl bg-[#FF8A2A]/10 border border-[#FF8A2A]/20 p-3 text-xs font-bold leading-relaxed text-[#FFB98A]">{p.note}</p>}
                {selectedPlan === `${p.name} — ${tab==="one"?"One-Time":"Monthly"}` && <p className="mt-4 flex items-start gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 px-3 py-2.5 text-xs font-extrabold text-emerald-300"><Check size={15} className="mt-0.5 shrink-0"/> Selected — your form below is set to {p.name}.</p>}
                <button onClick={()=>goToForm(`${p.name} — ${tab==="one"?"One-Time":"Monthly"}`)} aria-pressed={selectedPlan === `${p.name} — ${tab==="one"?"One-Time":"Monthly"}`} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] py-3.5 text-sm font-extrabold text-white hover:brightness-110">Start with {p.name} <ArrowRight size={17}/></button>
              </article>;
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-[#FF8A2A]/60 bg-[#050E1A] p-5 text-center text-sm font-bold leading-relaxed">Ad spend NOT included. You pay Meta directly. Service fee paid upfront before work starts. Minimum 2 months for monthly plans.</div>
          <p className="mt-4 text-center text-sm text-[#C7D6E3]">Not sure which one fits? <a href="#contact" className="font-extrabold text-white underline decoration-[#FF8A2A] decoration-2 underline-offset-4">Book a free audit call →</a></p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#050E1A]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]"><div><h2 className="mt-3 text-[clamp(2rem,5vw,3.2rem)]">Questions every<br/>smart buyer <span className="text-gradient">asks.</span></h2><p className="mt-4 max-w-md text-sm leading-relaxed text-[#C7D6E3]">If your question is not here, bring it to your free audit call. We would rather give you an honest “not yet” than sell you the wrong plan.</p></div>
          <div className="space-y-3">{faqs.map((f,i)=><div key={f.q} className="overflow-hidden rounded-2xl border border-white/10 bg-[#071A2E] shadow-sm"><button onClick={()=>setOpenFaq(openFaq===i?-1:i)} aria-expanded={openFaq===i} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"><span className="font-extrabold leading-snug">{f.q}</span><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${openFaq===i?"bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white":"bg-white/5 text-[#FF8A2A]"}`}><ChevronDown size={18} className={`transition-transform ${openFaq===i?"rotate-180":""}`}/></span></button>{openFaq===i && <p className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-[#C7D6E3]">{f.a}</p>}</div>)}</div></div>
        </div>
      </section>

      {/* FINAL CTA + FORM */}
      <section id="contact" className="relative bg-[#071A2E] text-white overflow-x-clip">
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#FF5E00]/15 blur-[90px]" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <h2 className="mt-4 text-[clamp(2.5rem,6.5vw,4.4rem)] leading-[1.02]">Stop boosting.<br/><span className="text-gradient">Start selling.</span></h2>
              <p className="mt-5 max-w-lg leading-relaxed text-[#C7D6E3]">Tell us about your offer. We will reply within 24 hours on WhatsApp with the honest next step — whether that is Audit, Launch, or a monthly plan.</p>
              <div className="mt-7 space-y-4">
                {[["Your offer gets a real funnel","No guesswork, no ghosting"],["Launch in 3–5 days","Once we have your assets and access"],["You stay in control of ad spend","You pay Meta directly"]].map(([a,b])=><div key={a} className="flex items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] text-white"><Check size={17} strokeWidth={3}/></span><div><p className="font-extrabold leading-tight">{a}</p><p className="text-sm text-[#8A9DB0]">{b}</p></div></div>)}
              </div>

            </div>
            <form id="leadForm" onSubmit={handleSubmit} className="rounded-[28px] bg-white p-5 text-[#0B1A27] card-shadow sm:p-7">
              <div className="flex items-start justify-between gap-3"><h3 className="text-[25px] leading-none sm:text-[28px]">Claim My Launch Spot</h3><span className="shrink-0 rounded-full bg-[#050E1A] px-3 py-1.5 text-[11px] font-extrabold tracking-wider text-white">24HR REPLY</span></div>
              <p className="mt-2.5 text-sm text-slate-600">Plan selected: <strong className="text-[#0B1A27]">{selectedPlan}</strong></p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Your name *</span><input required id="name" name="name" value={form.name} onChange={e=>update("name",e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"/></label>
                <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">WhatsApp number *</span><input required id="whatsapp" name="whatsapp" value={form.whatsapp} onChange={e=>update("whatsapp",e.target.value)} placeholder="e.g. 0803 555 0147" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"/></label>
                <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Email *</span><input required id="email" name="email" type="email" value={form.email} onChange={e=>update("email",e.target.value)} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"/></label>
                <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">{isSetupOnly ? "What are you selling? *" : "Business type *"}</span><input required id="business" name="business" value={form.business} onChange={e=>update("business",e.target.value)} placeholder="Fashion, skincare, real estate…" className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"/></label>
                <div className="block" style={{ display: isSetupOnly ? "none" : "block" }} aria-hidden={isSetupOnly}>
                <label className="block"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Monthly ad budget range</span><select id="budget" name="budget" value={form.budget} onChange={e=>update("budget",e.target.value)} disabled={isSetupOnly} required={!isSetupOnly} className={`w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm ${isSetupOnly ? "bg-slate-100 text-slate-400 opacity-60" : "bg-white"}`}><option value="" disabled>Select monthly budget</option><option>None — Setup Only, no ad budget needed</option><option>Under ₦50,000 / month</option><option>₦50,000 – ₦150,000 / month</option><option>₦150,000 – ₦300,000 / month</option><option>₦300,000+ / month</option><option>Not sure yet</option></select></label>
                </div>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Your goal</span><select id="goal" name="goal" value={form.goal} onChange={e=>update("goal",e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"><option value="" disabled>Select your goal</option><option>Get Leads</option><option>Get Sales</option><option>Get Calls</option><option>Get Bookings</option><option>Get Appointments</option><option>Not sure yet</option></select></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Plan interested in</span><select id="plan" name="plan" value={selectedPlan} onChange={e=>setSelectedPlan(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm">{allPlans.map(p=><option key={p.value} value={p.value}>{p.label}</option>)}</select>{isSetupOnly && <p role="note" className="mt-2 rounded-xl bg-orange-50 p-3 text-xs font-bold leading-relaxed text-orange-800">Setup Only — no monthly budget needed. We&apos;ll set up your account, pixel &amp; foundation correctly.</p>}</label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[.12em]">Your offer / Message (optional)</span><textarea id="message" name="message" value={form.message} onChange={e=>update("message",e.target.value)} rows={4} placeholder="What are you selling? What has not worked so far?" className="w-full resize-y rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm"/></label>
              </div>
              {selectedPlanDetails && <p aria-live="polite" className="mt-4 text-center text-xs font-bold leading-relaxed text-slate-600">{planSummaryText}</p>}
              <button type="submit" className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full py-4 text-sm font-extrabold text-white hover:brightness-110 ${isSending ? "bg-green-600" : "bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00]"}`}>{isSending ? "Processing..." : ctaText} <ArrowRight size={18}/></button>
              <p className="mt-3 text-center text-xs font-semibold text-slate-500">Secure Flutterwave checkout for {selectedPlanName} — {selectedPlanDetails?.ctaPrice ?? "₦75,000"}.</p>
              <p className="mt-2 text-center text-xs font-semibold text-slate-500">We reply within 24 hours on WhatsApp.</p>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#030A13] text-white border-t border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_.8fr_1fr]">
          <div className="bg-transparent" style={{ background:"transparent", border:"none", boxShadow:"none", padding:0 }}><a href="#top" className="flex items-center gap-3 min-w-0 bg-transparent" style={{ background:"transparent", border:"none", boxShadow:"none", padding:0 }}><img src={footerLogo} alt="VerveScale Digital logo" className="h-[56px] w-auto shrink-0 object-contain bg-transparent" style={{ background:"transparent", border:"none", boxShadow:"none", padding:0 }} /><span className="leading-none min-w-0"><span className="block truncate text-[20px] font-extrabold tracking-tight">VerveScale <span className="text-[#FF8A2A]">Digital</span></span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-[#8A9DB0]">Premium Media Buying</span></span></a><p className="mt-4 max-w-sm text-sm leading-relaxed text-[#C7D6E3]">Media buying that sells — not just runs ads. Cold strangers, turned into paying customers.</p></div>
          <div><h3 className="font-extrabold text-white">Contact</h3><p className="mt-3 text-sm leading-relaxed">Phone / WhatsApp:<br/><a href="https://wa.me/2348135831548" target="_blank" rel="noopener" className="font-bold underline">0813 583 1548</a></p><p className="mt-3 text-sm leading-relaxed">Email:<br/><a href="mailto:miraabel32@gmail.com" className="font-bold underline [overflow-wrap:anywhere]">miraabel32@gmail.com</a></p></div>
          <div><h3 className="font-extrabold text-white">Location</h3><p className="mt-3 text-sm leading-relaxed text-[#C7D6E3]">Owode Wole Oludare Langbasa Close, 21 Oke Ira, Ajah / Lekki, Lagos State, Nigeria<br/><span className="font-bold text-white">Walk-in by appointment.</span></p></div>
        </div>
        <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-[#8A9DB0] sm:flex-row sm:px-6"><span>© 2026 VerveScale Digital. All rights reserved.</span></div></div>
      </footer>

      {/* STICKY CTA — mobile / tablet portrait only. Hidden on landscape, laptop and desktop via CSS. */}
      <div id="stickyCta" className="sticky-cta sticky-bottom-cta fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#050E1A]/95 p-3 shadow-[0_-10px_30px_rgba(0,0,0,.4)] backdrop-blur">
        <div className="flex gap-2"><a href="https://wa.me/2348135831548" target="_blank" rel="noopener" className="whatsapp-floating-cta flex flex-1 items-center justify-center gap-2 rounded-full border border-[#25D366] bg-transparent py-3 text-sm font-extrabold text-[#25D366]"><MessageCircle size={18}/> WhatsApp Us</a><button type="button" onClick={()=>goToForm("Setup Only — One-Time")} className="flex flex-[1.3] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] py-3 text-sm font-extrabold text-white">Ad Setup <ArrowRight size={16}/></button></div>
      </div>
    </div>
  );
}
