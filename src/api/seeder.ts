// src/api/seeder.ts
import { apiClient } from './config';
import type { ApiResponse } from './config';

// Response types
export interface SeederStatus {
  statistics: {
    umas: number;
    skills: number;
    factors: number;
    support_cards: number;
  };
  autoSeedEnabled: boolean;
}

export interface SeederResponse {
  success: boolean;
  message: string;
  timestamp: string;
}

// API Functions
export const seederApi = {
  // GET /api/v1/seed - Get seeding status/info
  getStatus: async (): Promise<ApiResponse<SeederStatus>> => {
    return apiClient.get('/seed');
  },

  // POST /api/v1/seed/run - Manual trigger to run seeders
  runSeeders: async (): Promise<ApiResponse<SeederResponse>> => {
    return apiClient.post('/seed/run');
  },

  // DELETE /api/v1/seed/clear - Clear all seeded data
  clearData: async (): Promise<ApiResponse<SeederResponse>> => {
    return apiClient.delete('/seed/clear');
  },

  // POST /api/v1/seed/reset - Clear and re-seed all data
  resetData: async (): Promise<ApiResponse<SeederResponse>> => {
    return apiClient.post('/seed/reset');
  },
};