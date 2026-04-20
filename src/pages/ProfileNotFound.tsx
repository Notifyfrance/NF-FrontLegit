import { type FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function ProfileNotFound() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryFromState = (location.state as { query?: string } | null)?.query;
  const [query, setQuery] = useState("");

  const displayedQuery = queryFromState ?? "ghost_user";

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim().replace(/^@/, "");
    if (!trimmed) return;
    navigate(`/${encodeURIComponent(trimmed)}`);
  };

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
            · PROFIL INTROUVABLE ·
          </div>

          <h1 className="mb-6 text-[120px] font-extrabold leading-[0.85] tracking-[-0.05em] tabular-nums md:text-[180px]">
            @<span className="text-primary">?</span>
          </h1>

          <p className="mx-auto mb-9 max-w-[520px] text-[18px] leading-relaxed text-text-secondary md:text-[20px]">
            Aucun membre Notify France ne correspond à{" "}
            <span className="inline-block rounded-md bg-white/[0.06] px-2 py-0.5 font-mono font-medium text-foreground">
              @{displayedQuery}
            </span>
            .<br />
            Vérifiez l'orthographe ou cherchez un autre pseudo.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[480px] flex-col gap-2 sm:flex-row"
          >
            <div className="flex flex-1 items-center gap-2.5 rounded-[10px] border border-white/[0.14] bg-bg-darkest px-4 py-3 transition-colors focus-within:border-primary/60">
              <Search className="h-3.5 w-3.5 text-text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Chercher un pseudo…"
                className="w-full bg-transparent text-sm text-white placeholder:text-text-muted focus:outline-none"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="rounded-[10px] bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
            >
              Vérifier →
            </button>
          </form>

          <div className="mt-8 text-sm text-text-muted">
            <Link
              to="/"
              className="transition-colors hover:text-primary"
            >
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
