import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DealHistoryItem {
  partnerUsername: string;
  partnerAvatar: string;
  object: string;
  comment: string;
  date: string;
}

interface DealsHistoryProps {
  history: DealHistoryItem[];
}

export function DealsHistory({ history }: DealsHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-bg-card rounded-2xl p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
          <span>📜</span> Historique (10 derniers)
        </h3>
        <div className="text-text-muted text-center py-8">
          Aucun deal enregistré pour le moment
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg-card rounded-2xl p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>📜</span> Historique (10 derniers)
      </h3>

      <div className="space-y-2 md:space-y-3">
        {history.slice(0, 10).map((deal, index) => (
          <div
            key={`${deal.partnerUsername}-${index}`}
            className="bg-bg-darker rounded-xl p-3 md:p-4 hover:bg-bg-base hover:border-l-4 hover:border-primary transition-all duration-300 group"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 flex-shrink-0">
                <Link to={`/${deal.partnerUsername}`}>
                  <img
                    src={deal.partnerAvatar}
                    alt={deal.partnerUsername}
                    className="w-10 h-10 rounded-full border-2 border-primary hover:scale-110 transition-transform"
                  />
                </Link>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white text-sm md:text-base font-medium group-hover:text-primary transition-colors">
                  Deal avec{" "}
                  <Link to={`/${deal.partnerUsername}`} className="hover:underline">
                    @{deal.partnerUsername}
                  </Link>
                </div>
                <div className="text-text-secondary text-xs md:text-sm mt-1">
                  {deal.object}
                </div>
                {deal.comment && (
                  <div className="text-text-muted text-xs italic mt-1 truncate">
                    "{deal.comment}"
                  </div>
                )}
              </div>

              <div className="text-text-inactive text-xs whitespace-nowrap flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-badge-10 inline mr-1" />
                {formatDistanceToNow(new Date(deal.date), { locale: fr, addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
