// src/api/factor.ts
import { apiClient } from './config';
import type { PaginatedApiResponse, ApiResponse, PaginationParams } from './config';
import type { Factor } from '../types';

// API Functions
export const factorApi = {
  // GET /api/v1/factors - Get all factors with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedApiResponse<Factor[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/factors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(url);
  },

  // GET /api/v1/factors/:id - Get factor by ID
  getById: async (id: number): Promise<ApiResponse<Factor>> => {
    return apiClient.get(`/factors/${id}`);
  },
};