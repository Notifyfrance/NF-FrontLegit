// Types pour l'API NF-LegitCheck

export interface ApiBadge {
  level: string;
  text: string;
  color: string;
  icon: string;
}

export interface ApiUserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  stats: {
    totalDeals: number;
  };
  badge: ApiBadge;
  memberSince: string;
  lastActive: string;
  publicProfile: boolean;
}

export interface ApiGlobalStats {
  totalDeals: number;
  activeMembers: number;
}

export interface ApiTopMember {
  username: string; // userId Discord
  displayName: string;
  avatar: string;
  totalDeals: number;
  badge: {
    level: string;
    color: string;
  };
}

// Types frontend (doit correspondre à mockUser)
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
    level: string;
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
  monthlyDealsData?: Array<{
    month: string;
    deals: number;
  }>;
}

// Fonction de transformation backend → frontend
export function transformUserProfile(apiProfile: ApiUserProfile, mockStats: any): UserProfile {
  return {
    userId: apiProfile.userId,
    username: apiProfile.username,
    displayName: apiProfile.displayName,
    avatar: apiProfile.avatar,
    stats: {
      // Données réelles de l'API
      totalDeals: apiProfile.stats.totalDeals,
      lastActive: apiProfile.lastActive,
      // Données mock temporaires
      confirmedDeals: mockStats.confirmedDeals,
      pendingDeals: mockStats.pendingDeals,
      disputedDeals: mockStats.disputedDeals,
      successRate: mockStats.successRate,
      uniquePartners: mockStats.uniquePartners,
      averageDealsPerMonth: mockStats.averageDealsPerMonth,
      rating: mockStats.rating,
      reviewCount: mockStats.reviewCount,
      responseRate: mockStats.responseRate,
      avgResponseTime: mockStats.avgResponseTime,
      reliability: mockStats.reliability,
      disputes: mockStats.disputes,
    },
    badge: apiProfile.badge,
    ranking: mockStats.ranking, // Temporaire - mock
    keyDates: mockStats.keyDates, // Temporaire - mock
    memberSince: apiProfile.memberSince,
    publicProfile: apiProfile.publicProfile,
    monthlyDealsData: mockStats.monthlyDealsData, // Temporaire - mock
  };
}
