// src/api/trainedUma.ts
import { apiClient } from './config';
import type { PaginatedApiResponse, ApiResponse, PaginationParams } from './config';
import type { TrainedUma, TrainedUmaDetailed } from '../types';

// API Functions
export const trainedUmaApi = {
  // GET /api/v1/trained-umas - Get all trained umas with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedApiResponse<TrainedUma[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/trained-umas${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(url);
  },

  // GET /api/v1/trained-umas/:id - Get trained uma by ID
  getById: async (id: number): Promise<ApiResponse<TrainedUmaDetailed>> => {
    return apiClient.get(`/trained-umas/${id}`);
  },
};