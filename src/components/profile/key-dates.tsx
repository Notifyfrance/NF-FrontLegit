import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Clock } from "lucide-react";

interface KeyDatesProps {
  keyDates: {
    firstDeal: string;
    lastDeal: string;
  };
  memberSince: string;
}

export function KeyDates({ keyDates, memberSince }: KeyDatesProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:gap-4">
      <div className="bg-bg-darker rounded-xl p-3 md:p-4 border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Membre depuis</span>
        </div>
        <div className="text-white text-sm md:text-base font-medium">
          {format(new Date(memberSince), 'dd MMMM yyyy', { locale: fr })}
        </div>
      </div>

      <div className="bg-bg-darker rounded-xl p-3 md:p-4 border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Premier deal</span>
        </div>
        <div className="text-white text-sm md:text-base font-medium">
          {format(new Date(keyDates.firstDeal), 'dd MMMM yyyy', { locale: fr })}
        </div>
      </div>

      <div className="bg-bg-darker rounded-xl p-3 md:p-4 border-l-4 border-primary">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-text-muted text-xs">Dernier deal</span>
        </div>
        <div className="text-white text-sm md:text-base font-medium">
          {format(new Date(keyDates.lastDeal), 'dd MMMM yyyy', { locale: fr })}
        </div>
      </div>
    </div>
  );
}
