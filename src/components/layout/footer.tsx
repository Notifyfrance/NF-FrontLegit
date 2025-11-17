import { Link } from "react-router-dom";
import logoNF from "@/assets/logo-nf.png";

export function Footer() {
  return (
    <footer className="bg-bg-darker border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={logoNF} alt="Notify France" className="w-12 h-12" />
              <span className="text-xl font-bold">Notify France</span>
            </div>
            <p className="text-text-secondary text-sm max-w-md">
              Le système de validation de deals le plus fiable du resell français.
              Prouvez votre crédibilité et gagnez la confiance de la communauté.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-secondary hover:text-primary transition-colors link-hover">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/gattogaming" className="text-text-secondary hover:text-primary transition-colors link-hover">
                  Profil exemple
                </Link>
              </li>
              <li>
                <a
                  href="https://discord.gg/notifyfrance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors link-hover"
                >
                  Discord
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors link-hover">
                  CGU
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors link-hover">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-text-secondary hover:text-primary transition-colors link-hover">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © 2025 Notify France. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
