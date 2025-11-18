import { TrendingUp, Users, Target, Calendar } from "lucide-react";

interface StatsExtendedProps {
  stats: {
    confirmed: number;
    pending: number;
    successRate: number;
    partnersCount: number;
  };
}

export function StatsExtended({ stats }: StatsExtendedProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Deals confirmés */}
      <div className="bg-bg-darker rounded-2xl p-4 border-l-4 border-primary hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Confirmés</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white">{stats.confirmed}</div>
      </div>

      {/* Deals en attente */}
      <div className="bg-bg-darker rounded-2xl p-4 border-l-4 border-warning hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-warning" />
          <span className="text-text-muted text-xs">En attente</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white">{stats.pending}</div>
      </div>

      {/* Taux de réussite */}
      <div className="bg-bg-darker rounded-2xl p-4 border-l-4 border-primary hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Taux réussite</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white">{stats.successRate}%</div>
      </div>

      {/* Partenaires uniques */}
      <div className="bg-bg-darker rounded-2xl p-4 border-l-4 border-primary hover:scale-105 transition-all duration-300">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Partenaires</span>
        </div>
        <div className="text-3xl md:text-4xl font-bold text-white">{stats.partnersCount}</div>
      </div>
    </div>
  );
}
