import { Link } from "react-router-dom";
import logoNF from "@/assets/logo-nf.png";
export function Footer() {
  return <footer className="border-t border-bg-card py-12 px-4 mt-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo + baseline */}
        <div className="flex items-center gap-3">
          <img src={logoNF} className="w-8 h-8 opacity-60" alt="NF" />
          <span className="text-text-muted text-sm">Notify France • Système de Legit Check    </span>
        </div>

        {/* Liens */}
        <div className="flex gap-6 text-sm">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-text-secondary hover:text-primary transition-colors">
            Accueil
          </Link>

          <a href="https://notify-france.fr" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary transition-colors">
            Discord
          </a>
        </div>

        {/* Copyright */}
        <div className="text-text-muted text-xs">
          © 2025 Notify France
        </div>
      </div>
    </footer>;
}