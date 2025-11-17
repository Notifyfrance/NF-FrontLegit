import { Trophy } from "lucide-react";

interface RankingCardProps {
  ranking: {
    position: number;
    totalMembers: number;
    badge: string;
  };
}

export function RankingCard({ ranking }: RankingCardProps) {
  const isTopThree = ranking.position <= 3;

  return (
    <div className={`bg-gradient-to-br ${
      isTopThree 
        ? 'from-primary to-primary-light' 
        : 'from-bg-darker to-bg-card'
    } rounded-2xl p-6 shadow-glow-primary hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-white" />
          <div>
            <div className="text-text-muted text-sm">Classement</div>
            <div className="text-white font-bold text-xl">
              #{ranking.position} <span className="text-base">sur {ranking.totalMembers}</span>
            </div>
          </div>
        </div>
        {isTopThree && (
          <div className="text-6xl animate-pulse">{ranking.badge}</div>
        )}
      </div>
      {isTopThree && (
        <div className="text-white/90 text-sm font-medium">
          🎉 Top 3 des vendeurs <span className="text-white">Notify</span>{' '}
          <span className="text-white">France</span>
        </div>
      )}
    </div>
  );
}
