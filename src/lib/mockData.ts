// Mock data for development
export interface UserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  stats: {
    totalDeals: number;
    confirmedDeals: number;
    pendingDeals: number;
    disputedDeals: number;
    successRate: number;
    uniquePartners: number;
    averageDealsPerMonth: number;
    rating: number;
    reviewCount: number;
    responseRate: number;
    avgResponseTime: string;
    lastActive: string;
    reliability: number;
    disputes: number;
  };
  badge: {
    level: "1 Deal" | "5 Deals" | "10+ Deals";
    text: string;
    color: string;
    icon: string;
  };
  ranking: {
    position: number;
    totalMembers: number;
    badge: string;
  };
  keyDates: {
    firstDeal: string;
    lastDeal: string;
  };
  memberSince: string;
  publicProfile: boolean;
}

export interface Review {
  id: string;
  reviewer: {
    username: string;
    avatar: string;
    hasPublicProfile: boolean;
  };
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  category: "Sneakers" | "Pokémon" | "Random Resell";
  date: string;
  verified: boolean;
  helpful: number;
  criteria: {
    responseTime: "slow" | "normal" | "fast";
    shipping: "slow" | "normal" | "fast";
    packaging: "poor" | "good" | "excellent";
  };
}

export interface Activity {
  id: string;
  type: "deal" | "badge" | "milestone";
  title: string;
  description: string;
  date: string;
  icon?: string;
}

export interface Partner {
  username: string;
  avatar: string;
  dealCount: number;
}

export interface MonthlyData {
  month: string;
  deals: number;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progress?: {
    current: number;
    required: number;
  };
}

// Mock user data
export const mockUser: UserProfile = {
  userId: "591895054868676621",
  username: "gattogaming",
  displayName: "GattoGaming",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GattoGaming",
  stats: {
    totalDeals: 84,
    confirmedDeals: 78,
    pendingDeals: 4,
    disputedDeals: 2,
    successRate: 92.9,
    uniquePartners: 45,
    averageDealsPerMonth: 6.5,
    rating: 4.8,
    reviewCount: 82,
    responseRate: 95,
    avgResponseTime: "2h",
    lastActive: new Date().toISOString(),
    reliability: 100,
    disputes: 2,
  },
  badge: {
    level: "10+ Deals",
    text: "Vendeur Expert",
    color: "#80ff80",
    icon: "🥇",
  },
  ranking: {
    position: 3,
    totalMembers: 156,
    badge: "👨‍💻",
  },
  keyDates: {
    firstDeal: "2024-03-15T14:20:00Z",
    lastDeal: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  memberSince: "2024-01-10T10:30:00Z",
  publicProfile: true,
};

export const mockTopPartners: Partner[] = [
  {
    username: "sneakerlover",
    avatar: "https://i.pravatar.cc/150?u=sneakerlover",
    dealCount: 12,
  },
  {
    username: "pokemonmaster",
    avatar: "https://i.pravatar.cc/150?u=pokemonmaster",
    dealCount: 8,
  },
  {
    username: "resellpro",
    avatar: "https://i.pravatar.cc/150?u=resellpro",
    dealCount: 7,
  },
];

export const mockMonthlyDealsData: MonthlyData[] = [
  { month: "Oct 2024", deals: 8 },
  { month: "Nov 2024", deals: 12 },
  { month: "Déc 2024", deals: 15 },
  { month: "Jan 2025", deals: 10 },
  { month: "Fév 2025", deals: 14 },
  { month: "Mar 2025", deals: 11 },
];

export const mockReviews: Review[] = [
  {
    id: "1",
    reviewer: {
      username: "sneakerlover",
      avatar: "https://i.pravatar.cc/150?u=sneakerlover",
      hasPublicProfile: true,
    },
    rating: 5,
    comment: "Deal ultra rapide, vendeur de confiance ! Jordan 1 authentiques.",
    category: "Sneakers",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
    helpful: 12,
    criteria: {
      responseTime: "fast",
      shipping: "fast",
      packaging: "excellent",
    },
  },
  {
    id: "2",
    reviewer: {
      username: "pokemonmaster",
      avatar: "https://i.pravatar.cc/150?u=pokemonmaster",
      hasPublicProfile: true,
    },
    rating: 5,
    comment: "Cartes Pokémon en excellent état, livraison soignée.",
    category: "Pokémon",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
    helpful: 8,
    criteria: {
      responseTime: "fast",
      shipping: "normal",
      packaging: "excellent",
    },
  },
  {
    id: "3",
    reviewer: {
      username: "resellpro",
      avatar: "https://i.pravatar.cc/150?u=resellpro",
      hasPublicProfile: true,
    },
    rating: 5,
    comment: "Professionnel, réactif, je recommande à 100%.",
    category: "Random Resell",
    date: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    verified: true,
    helpful: 15,
    criteria: {
      responseTime: "fast",
      shipping: "fast",
      packaging: "excellent",
    },
  },
];

export const mockActivities: Activity[] = [
  {
    id: "1",
    type: "deal",
    title: "Deal confirmé avec @sneakerlover",
    description: "Jordan 1 Retro High OG",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    type: "deal",
    title: "Deal confirmé avec @pokemonmaster",
    description: "Carte Pokémon Dracaufeu Holo",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    type: "badge",
    title: "Badge débloqué : Vendeur Expert",
    description: "50+ deals confirmés",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    icon: "🥇",
  },
  {
    id: "4",
    type: "deal",
    title: "Deal confirmé avec @resellpro",
    description: "Hoodie Supreme Box Logo",
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    type: "deal",
    title: "Deal confirmé avec @kickscollector",
    description: "Nike Dunk Low Panda",
    date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    type: "deal",
    title: "Deal confirmé avec @cardtrader",
    description: "Lot Pokémon Rare",
    date: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    type: "deal",
    title: "Deal confirmé avec @urbanstyle",
    description: "Veste The North Face",
    date: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "8",
    type: "milestone",
    title: "Palier atteint : 75 deals confirmés",
    description: "Continue comme ça !",
    date: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    icon: "🎉",
  },
  {
    id: "9",
    type: "deal",
    title: "Deal confirmé avec @fashionista",
    description: "Sac Louis Vuitton",
    date: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "10",
    type: "deal",
    title: "Deal confirmé avec @sneakerhead",
    description: "Yeezy Boost 350 V2",
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const mockBadges: Badge[] = [
  {
    id: "expert",
    name: "Vendeur Expert",
    icon: "🥇",
    description: "10+ deals confirmés",
    unlocked: true,
  },
  {
    id: "fast",
    name: "Rapide",
    icon: "⚡",
    description: "Réponse < 1h en moyenne",
    unlocked: true,
  },
  {
    id: "five-star",
    name: "5 Étoiles",
    icon: "🌟",
    description: "Note moyenne 4.8+/5",
    unlocked: true,
  },
  {
    id: "packaging",
    name: "Emballage Pro",
    icon: "📦",
    description: "100% avis positifs emballage",
    unlocked: true,
  },
  {
    id: "legend",
    name: "Légende",
    icon: "🔒",
    description: "50+ deals confirmés",
    unlocked: false,
    progress: {
      current: 84,
      required: 50,
    },
  },
];

export const mockGlobalStats = {
  totalDeals: 462,
  activeMembers: 164,
  averageRating: 4.8,
  engagementRate: 32.8,
};

export const mockTopMembers = [
  {
    username: "gattogaming",
    displayName: "GattoGaming",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GattoGaming",
    totalDeals: 84,
    rating: 4.8,
    badge: { level: "10+ Deals", color: "#80ff80" },
  },
  {
    username: "topvendeur1",
    displayName: "TopVendeur1",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=topvendeur1",
    totalDeals: 67,
    rating: 4.9,
    badge: { level: "10+ Deals", color: "#80ff80" },
  },
  {
    username: "proseller",
    displayName: "ProSeller",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=proseller",
    totalDeals: 52,
    rating: 4.7,
    badge: { level: "10+ Deals", color: "#80ff80" },
  },
];

export const mockMonthlyDeals = [
  { month: "Mai", deals: 20 },
  { month: "Juin", deals: 15 },
  { month: "Juil", deals: 18 },
  { month: "Août", deals: 12 },
  { month: "Sept", deals: 19 },
  { month: "Oct", deals: 16 },
];

export const mockCategoryDistribution = [
  { category: "Sneakers", count: 50, percentage: 60 },
  { category: "Pokémon", count: 21, percentage: 25 },
  { category: "Random Resell", count: 13, percentage: 15 },
];
