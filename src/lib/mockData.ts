// Mock data for development
export interface UserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  stats: {
    totalDeals: number;
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
  type: "deal_confirmed" | "badge_unlocked" | "milestone_reached";
  date: string;
  partner?: string;
  category?: string;
  rating?: number;
  badge?: string;
  icon?: string;
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
    rating: 4.8,
    reviewCount: 82,
    responseRate: 95,
    avgResponseTime: "2h",
    lastActive: new Date(Date.now() - 86400000).toISOString(),
    reliability: 100,
    disputes: 0,
  },
  badge: {
    level: "10+ Deals",
    text: "Vendeur Expert",
    color: "#80ff80",
    icon: "🥇",
  },
  memberSince: "2025-05-15T10:30:00Z",
  publicProfile: true,
};

export const mockReviews: Review[] = [
  {
    id: "deal_12345",
    reviewer: {
      username: "acheteur1",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=acheteur1",
      hasPublicProfile: true,
    },
    rating: 5,
    comment:
      "Transaction parfaite, envoi rapide et colis bien emballé. Vendeur sérieux et à l'écoute ! Je recommande à 100%.",
    category: "Sneakers",
    date: new Date(Date.now() - 172800000).toISOString(),
    verified: true,
    helpful: 12,
    criteria: {
      responseTime: "fast",
      shipping: "fast",
      packaging: "excellent",
    },
  },
  {
    id: "deal_12346",
    reviewer: {
      username: "acheteur2",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=acheteur2",
      hasPublicProfile: true,
    },
    rating: 5,
    comment:
      "Super vendeur, communication au top. Les cartes étaient en parfait état, merci !",
    category: "Pokémon",
    date: new Date(Date.now() - 432000000).toISOString(),
    verified: true,
    helpful: 8,
    criteria: {
      responseTime: "fast",
      shipping: "normal",
      packaging: "excellent",
    },
  },
  {
    id: "deal_12347",
    reviewer: {
      username: "membre_nf",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=membre_nf",
      hasPublicProfile: false,
    },
    rating: 4,
    comment: "Bon vendeur, juste un petit délai sur l'envoi mais la qualité était là.",
    category: "Sneakers",
    date: new Date(Date.now() - 604800000).toISOString(),
    verified: true,
    helpful: 5,
    criteria: {
      responseTime: "normal",
      shipping: "normal",
      packaging: "good",
    },
  },
];

export const mockActivities: Activity[] = [
  {
    type: "deal_confirmed",
    date: new Date(Date.now() - 172800000).toISOString(),
    partner: "@acheteur1",
    category: "Sneakers",
    rating: 5,
  },
  {
    type: "deal_confirmed",
    date: new Date(Date.now() - 432000000).toISOString(),
    partner: "@acheteur2",
    category: "Pokémon",
    rating: 5,
  },
  {
    type: "badge_unlocked",
    date: new Date(Date.now() - 604800000).toISOString(),
    badge: "10+ Deals",
    icon: "🥇",
  },
  {
    type: "milestone_reached",
    date: new Date(Date.now() - 1209600000).toISOString(),
    badge: "50 Transactions",
    icon: "🎯",
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
