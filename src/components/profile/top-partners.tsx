import { Partner } from "@/lib/mockData";
import { Link } from "react-router-dom";

interface TopPartnersProps {
  partners: Partner[];
}

export function TopPartners({ partners }: TopPartnersProps) {
  return (
    <div className="bg-bg-card rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🤝</span> Top 3 Partenaires Récurrents
      </h3>
      
      <div className="space-y-4">
        {partners.map((partner, index) => (
          <Link
            key={partner.username}
            to={`/${partner.username}`}
            className="flex items-center gap-4 bg-bg-darker rounded-xl p-4 hover:bg-bg-base hover:scale-105 transition-all duration-300 group"
          >
            <div className="relative">
              <img
                src={partner.avatar}
                alt={partner.username}
                className="w-14 h-14 rounded-full border-2 border-primary"
              />
              <div className="absolute -top-1 -right-1 bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="text-white font-medium group-hover:text-primary transition-colors">
                @{partner.username}
              </div>
              <div className="text-text-muted text-sm">
                {partner.dealCount} deals confirmés
              </div>
            </div>
            
            <div className="text-primary text-2xl font-bold">
              {partner.dealCount}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
