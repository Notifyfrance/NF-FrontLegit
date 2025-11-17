import { Partner } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface TopPartnersProps {
  partners: Partner[];
}

export function TopPartners({ partners }: TopPartnersProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🤝</span> Top 3 Partenaires
      </h3>
      
      <div className="space-y-3">
        {partners.map((partner, index) => (
          <Link
            key={partner.username}
            to={`/${partner.username}`}
            className="flex items-center gap-3 bg-bg-darker rounded-xl p-3 hover:bg-bg-base hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative flex-shrink-0">
              <img
                src={partner.avatar}
                alt={partner.username}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-primary"
              />
              <div className="absolute -top-1 -right-1 bg-primary text-white w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-white text-sm md:text-base font-medium group-hover:text-primary transition-colors truncate">
                @{partner.username}
              </div>
              <div className="text-text-muted text-xs md:text-sm">
                {partner.dealCount} deals
              </div>
            </div>
            
            <div className="text-primary text-xl md:text-2xl font-bold flex-shrink-0">
              {partner.dealCount}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
