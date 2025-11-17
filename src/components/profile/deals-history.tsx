import { Activity } from "@/lib/mockData";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { CheckCircle, Award, TrendingUp } from "lucide-react";

interface DealsHistoryProps {
  activities: Activity[];
}

export function DealsHistory({ activities }: DealsHistoryProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "deal":
        return <CheckCircle className="w-5 h-5 text-badge-10" />;
      case "badge":
        return <Award className="w-5 h-5 text-primary" />;
      case "milestone":
        return <TrendingUp className="w-5 h-5 text-badge-5" />;
      default:
        return <CheckCircle className="w-5 h-5 text-text-muted" />;
    }
  };

  return (
    <div className="bg-bg-card rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>📜</span> Historique des Deals (10 derniers)
      </h3>
      
      <div className="space-y-3">
        {activities.slice(0, 10).map((activity) => (
          <div
            key={activity.id}
            className="bg-bg-darker rounded-xl p-4 hover:bg-bg-base hover:border-l-4 hover:border-primary transition-all duration-300 group"
          >
            <div className="flex items-start gap-4">
              <div className="mt-1 flex-shrink-0">
                {activity.icon ? (
                  <span className="text-2xl">{activity.icon}</span>
                ) : (
                  getIcon(activity.type)
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium group-hover:text-primary transition-colors">
                  {activity.title}
                </div>
                <div className="text-text-muted text-sm mt-1">
                  {activity.description}
                </div>
              </div>
              
              <div className="text-text-inactive text-xs whitespace-nowrap">
                {formatDistanceToNow(new Date(activity.date), { locale: fr, addSuffix: true })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
