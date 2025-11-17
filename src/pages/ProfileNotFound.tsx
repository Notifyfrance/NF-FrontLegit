import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import logoNF from "@/assets/logo-nf.png";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-bg-card rounded-lg p-12 max-w-lg w-full text-center border border-border animate-slide-up">
        <div className="flex justify-center mb-6">
          <img src={logoNF} alt="Notify France" className="w-20 h-20 opacity-50" />
        </div>
        
        <div className="flex justify-center mb-6">
          <Search className="w-16 h-16 text-text-muted" />
        </div>

        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Ce profil n'existe pas</h2>
        <p className="text-text-secondary mb-2">
          ou n'est pas encore activé
        </p>
        <p className="text-text-muted text-sm mb-8">
          Vérifiez le pseudo Discord ou contactez le vendeur
        </p>

        <div className="space-y-3">
          <Button
            className="w-full bg-primary hover:bg-primary-dark font-semibold"
            asChild
          >
            <Link to="/">Retour à l'accueil</Link>
          </Button>
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <a
              href="https://discord.gg/notifyfrance"
              target="_blank"
              rel="noopener noreferrer"
            >
              Rejoindre Notify France
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
