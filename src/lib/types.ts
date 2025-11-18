// Types pour l'API NF-LegitCheck

export interface ApiBadge {
  level: string;
  text: string;
  color: string;
  icon: string;
}

export interface ApiDealHistory {
  partnerId: string;
  partnerUsername: string;
  partnerAvatar: string;
  object: string;
  comment: string;
  date: string;
}

export interface ApiTopPartner {
  userId: string;
  username: string;
  avatar: string;
  dealsCount: number;
}

export interface ApiRank {
  position: number;
  totalUsers: number;
}

export interface ApiDetailedStats {
  confirmed: number;
  pending: number;
  successRate: number;
  partnersCount: number;
}

export interface ApiKeyDates {
  firstDeal: string;
  lastDeal: string;
  memberSince: string;
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
  rank: ApiRank;
  detailedStats: ApiDetailedStats;
  history: ApiDealHistory[];
  topPartners: ApiTopPartner[];
  keyDates: ApiKeyDates;
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

// Types frontend (100% données API réelles)
export interface UserProfile {
  userId: string;
  username: string;
  displayName: string;
  avatar: string;
  stats: {
    totalDeals: number;
    confirmed: number;
    pending: number;
    successRate: number;
    partnersCount: number;
  };
  badge: ApiBadge;
  ranking: {
    position: number;
    totalMembers: number;
  };
  keyDates: {
    firstDeal: string;
    lastDeal: string;
  };
  memberSince: string;
  lastActive: string;
  publicProfile: boolean;
  history: ApiDealHistory[];
  topPartners: ApiTopPartner[];
}

// Fonction de transformation backend → frontend (100% API)
export function transformUserProfile(apiProfile: ApiUserProfile): UserProfile {
  return {
    userId: apiProfile.userId,
    username: apiProfile.username,
    displayName: apiProfile.displayName,
    avatar: apiProfile.avatar,
    stats: {
      totalDeals: apiProfile.stats.totalDeals,
      confirmed: apiProfile.detailedStats.confirmed,
      pending: apiProfile.detailedStats.pending,
      successRate: apiProfile.detailedStats.successRate,
      partnersCount: apiProfile.detailedStats.partnersCount,
    },
    badge: apiProfile.badge,
    ranking: {
      position: apiProfile.rank.position,
      totalMembers: apiProfile.rank.totalUsers,
    },
    keyDates: {
      firstDeal: apiProfile.keyDates.firstDeal,
      lastDeal: apiProfile.keyDates.lastDeal,
    },
    memberSince: apiProfile.memberSince,
    lastActive: apiProfile.lastActive,
    publicProfile: apiProfile.publicProfile,
    history: apiProfile.history,
    topPartners: apiProfile.topPartners,
  };
}
