import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { useGlobalStats } from "@/hooks/useGlobalStats";
import { useTopMembers } from "@/hooks/useTopMembers";
import logoNF from "@/assets/logo-nf.png";

export default function Home() {
  const { data: globalStats, isLoading: statsLoading } = useGlobalStats();
  const { data: topMembers, isLoading: membersLoading } = useTopMembers(3);

  return (
    <div className="min-h-screen bg-bg-base bg-grid-pattern relative overflow-hidden">
      {/* Background decorations - Blurs multiples */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        {/* Blur orange top */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary opacity-10 blur-[150px] rounded-full" />
        {/* Blur orange center */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary opacity-10 blur-[180px] rounded-full animate-float" />
        {/* Blur orange bottom */}
        <div className="absolute bottom-0 left-1/2 w-[700px] h-[700px] bg-primary-light opacity-8 blur-[200px] rounded-full" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-base opacity-60" />
      </div>

      {/* Hero Section - Full screen épuré */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
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
            Système de validation de deals utilisé par les membres <span className="text-white">Notify</span> <span className="text-primary">France</span>
          </p>

          {/* CTA simple */}
          <div className="flex gap-4 justify-center">
            <Button
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg rounded-full shadow-glow-primary transition-all duration-300 hover:scale-105"
              asChild
            >
              <a
                href="https://notify-france.fr"
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
              {statsLoading ? (
                <Skeleton className="h-10 w-20 mx-auto mb-1" />
              ) : (
                <div className="text-4xl font-bold text-white mb-1">{globalStats?.totalDeals || 0}</div>
              )}
              <div className="text-sm text-text-muted">Deals confirmés</div>
            </div>
            <div>
              {statsLoading ? (
                <Skeleton className="h-10 w-20 mx-auto mb-1" />
              ) : (
                <div className="text-4xl font-bold text-white mb-1">{globalStats?.activeMembers || 0}</div>
              )}
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
            Nos meilleurs vendeurs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membersLoading ? (
              // Skeleton loading pour top membres
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-bg-card rounded-2xl p-8">
                  <Skeleton className="w-24 h-24 mx-auto mb-4 rounded-full" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-4 w-24 mx-auto" />
                </div>
              ))
            ) : (
              topMembers?.map((seller) => (
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
                      alt={seller.displayName}
                    />
                    {/* Badge niveau petit en overlay */}
                    <div className="absolute -bottom-2 -right-2 bg-badge-10 text-bg-base px-2 py-1 rounded-full text-xs font-bold">
                      {seller.totalDeals}+
                    </div>
                  </div>

                  {/* Display Name */}
                  <div className="text-center">
                    <div className="text-white font-medium text-lg mb-1 group-hover:text-primary transition-colors">
                      {seller.displayName}
                    </div>
                    <div className="text-text-muted text-sm">
                      {seller.totalDeals} deals confirmés
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-primary rounded-3xl p-12 md:p-16 text-center relative overflow-hidden shadow-glow-primary">
            <div className="absolute inset-0 bg-primary opacity-90" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Prêt à rejoindre la communauté ?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Rejoignez plus de 500 membres actifs et commencez à construire votre réputation dès aujourd'hui
              </p>
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                asChild
              >
                <a
                  href="https://notify-france.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Rejoindre Discord
                  <span className="text-2xl">→</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
