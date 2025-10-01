// src/api/supportCard.ts
import { apiClient } from './config';
import type { PaginatedApiResponse, ApiResponse, PaginationParams } from './config';
import type { SupportCard, SupportCardWithSkills } from '../types';

// API Functions
export const supportCardApi = {
  // GET /api/v1/support-cards - Get all support cards with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedApiResponse<SupportCard[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/support-cards${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(url);
  },

  // GET /api/v1/support-cards/:id - Get support card by ID (with skills)
  getById: async (id: number): Promise<ApiResponse<SupportCardWithSkills>> => {
    return apiClient.get(`/support-cards/${id}`);
  },
};