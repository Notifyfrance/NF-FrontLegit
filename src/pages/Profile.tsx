import { useParams, Navigate } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Link as LinkIcon } from "lucide-react";
import { mockUser, mockTopPartners, mockActivities } from "@/lib/mockData";
import { useUserProfile } from "@/hooks/useUserProfile";
import { toast } from "sonner";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { StatsExtended } from "@/components/profile/stats-extended";
import { RankingCard } from "@/components/profile/ranking-card";
import { TopPartners } from "@/components/profile/top-partners";
import { DealsHistory } from "@/components/profile/deals-history";
import { KeyDates } from "@/components/profile/key-dates";

export default function Profile() {
  const { username } = useParams();

  const { data: user, isLoading, error } = useUserProfile(username!);

  // Si erreur 404, rediriger vers not-found
  if (error && (error as any).status === 404) {
    return <Navigate to="/not-found" replace />;
  }

  // Afficher loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-base py-6 md:py-12 px-3 md:px-4">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          <div className="bg-bg-card rounded-3xl p-6 md:p-8 shadow-2xl border border-primary/20">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-48 mx-auto md:mx-0" />
                <Skeleton className="h-6 w-32 mx-auto md:mx-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/not-found" replace />;
  }

  const handleCopyLink = () => {
    const link = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié !", {
      description: "Le lien du profil a été copié dans le presse-papiers",
    });
  };

  return (
    <div className="min-h-screen bg-bg-base py-6 md:py-12 px-3 md:px-4">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* HEADER - Avatar + Info de base */}
        <div className="bg-bg-card rounded-3xl p-6 md:p-8 shadow-2xl border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary shadow-glow-primary"
                alt={user.username}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Vérifié
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                @{user.username}
              </h1>
              <p className="text-white mb-4">
                Membre de Notify <span className="text-primary">France</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-medium shadow-glow-primary transition-all duration-300 hover:scale-105"
                  onClick={() => window.open('https://discord.gg/notifyfrance', '_blank')}
                >
                  Rejoindre Notify France
                </Button>
                
                <button
                  className="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-2 justify-center px-4 py-3 bg-bg-darker rounded-full hover:bg-bg-base"
                  onClick={handleCopyLink}
                >
                  <LinkIcon className="w-4 h-4" />
                  Copier le lien
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-5 md:p-6 text-center shadow-glow-primary flex-shrink-0">
              <div className="text-4xl md:text-5xl mb-2">{user.badge.icon}</div>
              <div className="text-white font-bold text-base md:text-lg">
                {user.badge.text}
              </div>
              <div className="text-white/80 text-sm">
                {user.stats.totalDeals} deals
              </div>
            </div>
          </div>
        </div>

        {/* CLASSEMENT */}
        <RankingCard ranking={user.ranking} />

        {/* STATISTIQUES ÉTENDUES */}
        <div className="bg-bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-primary/10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">📊 Statistiques Détaillées</h2>
          <StatsExtended stats={user.stats} />
        </div>

        {/* HISTORIQUE */}
        <DealsHistory activities={mockActivities} />

        {/* TOP 3 PARTENAIRES */}
        <TopPartners partners={mockTopPartners} />

        {/* DATES CLÉS */}
        <div className="bg-bg-card rounded-3xl p-6 md:p-8 shadow-xl border border-primary/10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6">📅 Dates Clés</h2>
          <KeyDates keyDates={user.keyDates} memberSince={user.memberSince} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
