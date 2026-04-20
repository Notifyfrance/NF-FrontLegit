import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { NFLogo } from "./nf-logo";
import { useUsernameSearch } from "@/hooks/useUsernameSearch";

export function Navbar() {
  const { query, setQuery, onSubmit } = useUsernameSearch();

  return (
    <nav className="flex items-center justify-between gap-6 border-b border-white/[0.08] px-6 py-5 md:px-12">
      <Link to="/" className="flex flex-shrink-0 items-center gap-2.5">
        <NFLogo size={26} />
        <span className="text-[15px] font-bold tracking-tight">Notify Legit</span>
      </Link>

      <form
        onSubmit={onSubmit}
        className="hidden max-w-[480px] flex-1 items-center gap-2.5 rounded-[10px] border border-white/[0.08] bg-bg-darkest px-4 py-2.5 transition-colors focus-within:border-primary/50 md:flex"
      >
        <Search className="h-3.5 w-3.5 flex-shrink-0 text-text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Chercher un pseudo Discord…"
          className="w-full bg-transparent text-[13px] text-white placeholder:text-text-muted focus:outline-none"
        />
      </form>

      <a
        href="https://notify-france.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 rounded-[10px] bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-all hover:brightness-110 hover:shadow-[0_8px_24px_rgba(240,123,60,0.35)]"
      >
        Rejoindre Discord
      </a>
    </nav>
  );
}
