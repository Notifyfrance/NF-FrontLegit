import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockGlobalStats, mockTopMembers } from "@/lib/mockData";
import logoNF from "@/assets/logo-nf.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Hero Section - Full screen épuré */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Blur orange subtil background */}
        <div className="absolute inset-0 -z-10 opacity-30">
          <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-primary blur-[150px] rounded-full" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          {/* Logo NF subtil en haut */}
          <div className="mb-8">
            <img src={logoNF} className="w-16 h-16 mx-auto opacity-80" alt="Notify France" />
          </div>

          {/* Titre principal */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Votre réputation,<br />
            <span className="text-primary">prouvée</span> en 2 secondes
          </h1>

          {/* Sous-titre épuré */}
          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            Système de validation de deals utilisé par les membres Notify France
          </p>

          {/* CTA simple */}
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg rounded-full shadow-glow-primary transition-all duration-300 hover:scale-105"
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

          {/* Stats minimalistes en bas */}
          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-white mb-1">{mockGlobalStats.totalDeals}</div>
              <div className="text-sm text-text-muted">Deals confirmés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-1">{mockGlobalStats.activeMembers}</div>
              <div className="text-sm text-text-muted">Vendeurs vérifiés</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-text-muted">Sécurisé</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Vendeurs - Simplifié */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Vendeurs de confiance
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTopMembers.slice(0, 3).map((seller) => (
              <Link
                key={seller.username}
                to={`/${seller.username}`}
                className="group bg-bg-card rounded-2xl p-8 border border-transparent hover:border-primary transition-all duration-300 hover:shadow-glow-primary hover:scale-105"
              >
                {/* Avatar centré */}
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <img
                    src={seller.avatar}
                    className="w-full h-full rounded-full border-4 border-badge-10"
                    alt={seller.username}
                  />
                  {/* Badge niveau petit en overlay */}
                  <div className="absolute -bottom-2 -right-2 bg-badge-10 text-bg-base px-2 py-1 rounded-full text-xs font-bold">
                    {seller.totalDeals}+
                  </div>
                </div>

                {/* Username */}
                <div className="text-center">
                  <div className="text-white font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                    @{seller.username}
                  </div>
                  <div className="text-text-muted text-sm">
                    {seller.totalDeals} deals confirmés
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
