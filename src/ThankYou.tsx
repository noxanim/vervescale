import { useEffect } from "react";
import logoUrl from "./assets/thank_you_logo.webp";

const whatsappMessage =
  "Hi VerveScale Digital! I just completed my payment.\nQ: What is your name?\nA:\nQ: Which plan did you pay for?\nA:\nQ: What is your business / what are you selling?\nA:\nQ: What is your WhatsApp number?\nA:\nQ: What is your email?\nA:\nPlease confirm my payment. Thank you!";
const whatsappUrl =
  "https://wa.me/2348135831548?text=" + encodeURIComponent(whatsappMessage);

export default function ThankYou() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const partnerId = "10140962";
      (window as any)._linkedin_partner_id = partnerId;
      (window as any)._linkedin_data_partner_ids =
        (window as any)._linkedin_data_partner_ids || [];
      if (!(window as any)._linkedin_data_partner_ids.includes(partnerId)) {
        (window as any)._linkedin_data_partner_ids.push(partnerId);
      }

      if (!(window as any).lintrk) {
        (window as any).lintrk = function (a: any, b: any) {
          (window as any).lintrk.q.push([a, b]);
        };
        (window as any).lintrk.q = [];
      }

      if (!document.querySelector('script[src*="snap.licdn.com/li.lms-analytics/insight.min.js"]')) {
        const s = document.getElementsByTagName("script")[0];
        const b = document.createElement("script");
        b.type = "text/javascript";
        b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        if (s && s.parentNode) {
          s.parentNode.insertBefore(b, s);
        } else {
          document.head.appendChild(b);
        }
      }

      if (typeof (window as any).lintrk === "function") {
        (window as any).lintrk("track");
      }

      if (typeof (window as any).fbq === "function") {
        (window as any).fbq("track", "Purchase");
      }

      if (typeof (window as any).rdt === "function") {
        (window as any).rdt("track", "Purchase");
      }

      if (typeof (window as any).dataLayer !== "undefined") {
        (window as any).dataLayer.push({
          event: "purchase",
          page_type: "thank_you"
        });
      }
      if (typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "purchase", {
          event_category: "ecommerce",
          event_label: "Purchase Completed"
        });
      }
    }
  }, []);

  return (
    <main
      data-safe-area-inset-root
      className="min-h-[100dvh] w-full overflow-x-clip bg-[var(--navy)] text-[var(--text)]"
      style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }}
    >
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=10140962&fmt=gif"
        />
      </noscript>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src="https://www.facebook.com/tr?id=1873021890505457&ev=Purchase&noscript=1"
        />
      </noscript>
      <style>{`
        @keyframes checkmark-pop {
          0% { transform: scale(0.5); opacity: 0; }
          60% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkmark-glow {
          0%, 100% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.12), 0 0 0 0 rgba(34, 197, 94, 0); }
          50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.12), 0 0 28px 8px rgba(34, 197, 94, 0.35); }
        }
        @keyframes checkmark-draw {
          from { stroke-dashoffset: 30; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes checkmark-ripple-once {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes checkmark-ripple-continuous {
          0% { transform: scale(1); opacity: 0.45; }
          100% { transform: scale(1.35); opacity: 0; }
        }
        .checkmark-circle {
          animation:
            checkmark-pop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both,
            checkmark-glow 2s ease-in-out 0.6s infinite;
        }
        .checkmark-draw {
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
          animation: checkmark-draw 0.6s ease-out 0.55s forwards;
        }
        .checkmark-ripple-once {
          animation: checkmark-ripple-once 1.2s ease-out 0.15s forwards;
        }
        .checkmark-ripple-continuous {
          opacity: 0;
          animation: checkmark-ripple-continuous 2s ease-out 1.4s infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .checkmark-circle, .checkmark-draw, .checkmark-ripple-once, .checkmark-ripple-continuous {
            animation: none;
          }
          .checkmark-circle { transform: scale(1); opacity: 1; box-shadow: 0 0 0 10px rgba(34, 197, 94, 0.12); }
          .checkmark-draw { stroke-dashoffset: 0; }
          .checkmark-ripple-once, .checkmark-ripple-continuous { opacity: 0; }
        }
      `}</style>
      <div className="mx-auto flex min-h-[calc(100dvh-var(--safe-area-inset-top))] w-full max-w-[560px] flex-col items-center justify-center px-5 py-12 text-center sm:px-8">
        <img
          src={logoUrl}
          alt="VerveScale Digital logo"
          className="h-auto w-[39px] max-w-[15vw] sm:w-[45px]"
        />

        <p className="mt-2 text-[clamp(1.25rem,5vw,1.65rem)] font-bold leading-tight tracking-tight text-[var(--orange)]">
          VerveScale Digital
        </p>
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
          Premium Media Buying
        </p>

        <div className="relative mt-4 h-[76px] w-[76px]" aria-hidden="true">
          <span className="checkmark-ripple-once absolute inset-0 rounded-full border-2 border-[var(--green)]" />
          <span className="checkmark-ripple-continuous absolute inset-0 rounded-full border-2 border-[var(--green)]" />
          <div className="checkmark-circle relative flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[var(--green)]">
            <svg
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                className="checkmark-draw"
                d="M20 6 9 17l-5-5"
                pathLength={30}
                stroke="white"
                strokeWidth={3.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <h1 className="mt-6 text-[clamp(1.85rem,8vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight [overflow-wrap:anywhere]">
          Thank You<br />Payment Received!
        </h1>

        <p className="mt-4 max-w-[430px] text-[15px] leading-6 text-[var(--muted)] sm:text-base">
          Your request is in. We reply within 24 hours on WhatsApp.
        </p>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener"
          className="mt-8 inline-flex min-h-[56px] w-full max-w-[430px] items-center justify-center rounded-full bg-gradient-to-r from-[#FF8A2A] to-[#FF5E00] px-6 py-4 text-base font-bold text-white shadow-[0_12px_30px_rgba(255,122,26,0.3)] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#081426] sm:w-auto sm:min-w-[360px]"
        >
          Continue to WhatsApp <span className="ml-2" aria-hidden="true">→</span>
        </a>

        <p className="mt-4 max-w-[430px] text-[13px] leading-5 text-white/60 [overflow-wrap:anywhere]">
          Tap the button — just fill the answers and send.
        </p>

        <a
          href="https://vervescale.vercel.app"
          target="_blank"
          rel="noopener"
          className="mt-7 text-sm font-semibold text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
        >
          Back to VerveScale Digital
        </a>
      </div>
    </main>
  );
}
