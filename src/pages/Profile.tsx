import { useParams, Navigate } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Link as LinkIcon } from "lucide-react";
import { mockUser, mockTopPartners, mockMonthlyDealsData, mockActivities } from "@/lib/mockData";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { StatsExtended } from "@/components/profile/stats-extended";
import { RankingCard } from "@/components/profile/ranking-card";
import { TopPartners } from "@/components/profile/top-partners";
import { DealsChart } from "@/components/profile/deals-chart";
import { DealsHistory } from "@/components/profile/deals-history";
import { KeyDates } from "@/components/profile/key-dates";

export default function Profile() {
  const { username } = useParams();

  // For demo, only gattogaming exists
  if (username !== "gattogaming") {
    return <Navigate to="/not-found" replace />;
  }

  const user = mockUser;

  const handleCopyLink = () => {
    const link = `${window.location.origin}/${username}`;
    navigator.clipboard.writeText(link);
    toast.success("Lien copié !", {
      description: "Le lien du profil a été copié dans le presse-papiers",
    });
  };

  return (
    <div className="min-h-screen bg-bg-base py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* HEADER - Avatar + Info de base */}
        <div className="bg-bg-card rounded-3xl p-8 shadow-2xl border border-primary/20">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={user.avatar}
                className="w-32 h-32 rounded-full border-4 border-badge-10 shadow-glow-badge-10"
                alt={user.username}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Vérifié
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">
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

            <div className="bg-gradient-to-br from-badge-10 to-badge-5 rounded-2xl p-6 text-center shadow-glow-badge-10 flex-shrink-0">
              <div className="text-5xl mb-2">{user.badge.icon}</div>
              <div className="text-white font-bold text-lg">
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
        <div className="bg-bg-card rounded-3xl p-8 shadow-xl border border-primary/10">
          <h2 className="text-2xl font-bold text-white mb-6">📊 Statistiques Détaillées</h2>
          <StatsExtended stats={user.stats} />
        </div>

        {/* GRAPHIQUE ÉVOLUTION */}
        <DealsChart data={mockMonthlyDealsData} />

        {/* TOP 3 PARTENAIRES + HISTORIQUE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopPartners partners={mockTopPartners} />
          <DealsHistory activities={mockActivities} />
        </div>

        {/* DATES CLÉS */}
        <div className="bg-bg-card rounded-3xl p-8 shadow-xl border border-primary/10">
          <h2 className="text-2xl font-bold text-white mb-6">📅 Dates Clés</h2>
          <KeyDates keyDates={user.keyDates} memberSince={user.memberSince} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
