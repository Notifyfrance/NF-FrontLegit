import { useParams, Navigate } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Link as LinkIcon } from "lucide-react";
import { mockUser } from "@/lib/mockData";
import { toast } from "sonner";
import { format, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

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
      <div className="max-w-2xl mx-auto">
        {/* CARD PROFIL UNIQUE - Tout dans une seule card */}
        <div className="bg-bg-card rounded-3xl p-10 shadow-2xl border border-primary/20">
          {/* Header : Avatar + Username */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <img
                src={user.avatar}
                className="w-32 h-32 rounded-full border-4 border-badge-10 shadow-glow-badge-10"
                alt={user.username}
              />
              {/* Badge vérifié en overlay */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Vérifié
              </div>
            </div>

            <h1 className="text-3xl font-bold text-white mb-1">
              @{user.username}
            </h1>
            <p className="text-text-muted text-sm">
              Membre depuis {format(new Date(user.memberSince), 'MMMM yyyy', { locale: fr })}
            </p>
          </div>

          {/* Stats principales - Grid 2 colonnes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Total deals */}
            <div className="bg-bg-darker rounded-2xl p-6 text-center border-l-4 border-primary">
              <div className="text-5xl font-bold text-white mb-2">
                {user.stats.totalDeals}
              </div>
              <div className="text-text-muted text-sm">
                Deals confirmés
              </div>
            </div>

            {/* Badge niveau */}
            <div className="bg-gradient-to-br from-badge-10 to-badge-5 rounded-2xl p-6 text-center shadow-glow-badge-10">
              <div className="text-4xl mb-2">{user.badge.icon}</div>
              <div className="text-white font-bold text-lg">
                {user.badge.text}
              </div>
              <div className="text-white/80 text-xs">
                {user.badge.level}
              </div>
            </div>
          </div>

          {/* Dernière activité (simple) */}
          <div className="bg-bg-darker rounded-2xl p-4 mb-8">
            <div className="flex items-center justify-between">
              <span className="text-text-muted text-sm">Dernière activité</span>
              <span className="text-white text-sm font-medium">
                {formatDistanceToNow(new Date(user.stats.lastActive), { locale: fr, addSuffix: true })}
              </span>
            </div>
          </div>

          {/* CTA - Un seul bouton épuré */}
          <Button
            className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-full text-lg font-medium shadow-glow-primary transition-all duration-300 hover:scale-105"
            onClick={() => window.open('https://discord.gg/notifyfrance', '_blank')}
          >
            Rejoindre Notify France
          </Button>

          {/* Partage (minimaliste en bas) */}
          <div className="mt-6 text-center">
            <button
              className="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-2 mx-auto"
              onClick={handleCopyLink}
            >
              <LinkIcon className="w-4 h-4" />
              Copier le lien du profil
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
