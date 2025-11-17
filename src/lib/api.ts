// Client API pour NF-LegitCheck

import type { ApiGlobalStats, ApiTopMember, ApiUserProfile } from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.nf-legit.me';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new ApiError(
        `API request failed: ${response.statusText}`,
        response.status,
        endpoint
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Erreur réseau ou autre
    console.error(`Error fetching ${endpoint}:`, error);
    throw new ApiError(
      `Network error while fetching ${endpoint}`,
      undefined,
      endpoint
    );
  }
}

export async function getGlobalStats(): Promise<ApiGlobalStats> {
  return fetchApi<ApiGlobalStats>('/api/stats/global');
}

export async function getTopMembers(limit: number = 3): Promise<ApiTopMember[]> {
  return fetchApi<ApiTopMember[]>(`/api/top-members?limit=${limit}`);
}

export async function getUserProfile(username: string): Promise<ApiUserProfile> {
  return fetchApi<ApiUserProfile>(`/api/user/${username}`);
}
