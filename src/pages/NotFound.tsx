import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-bg-base">
      <Navbar />

      <div className="relative flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(240,123,60,0.1) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 max-w-2xl text-center">
          <div className="mb-7 font-mono text-[16px] tracking-[0.15em] text-primary">
            · PAGE INTROUVABLE ·
          </div>

          <h1 className="mb-6 text-[120px] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums md:text-[180px]">
            4<span className="text-primary">0</span>4
          </h1>

          <p className="mx-auto mb-9 max-w-[520px] text-[18px] leading-relaxed text-text-secondary md:text-[20px]">
            Cette page n'existe pas, ou n'existe plus.
            <br />
            Retour à l'accueil ?
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-[10px] bg-primary px-7 py-3.5 text-[15px] font-semibold text-white transition-all hover:brightness-110"
          >
            Retour à l'accueil →
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
