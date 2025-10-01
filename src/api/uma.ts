// src/api/uma.ts
import { apiClient } from './config';
import type { PaginatedApiResponse, ApiResponse, PaginationParams } from './config';
import type { Uma } from '../types';

// Request types
export interface CreateUmaRequest {
  name: string;
  star_initial?: number;
  speed_aptitude: string;
  stamina_aptitude: string;
  power_aptitude: string;
  guts_aptitude: string;
  wit_aptitude: string;
  turf_aptitude: string;
  dirt_aptitude: string;
  sprint_aptitude: string;
  mile_aptitude: string;
  medium_aptitude: string;
  long_aptitude: string;
  runner_aptitude: string;
  leader_aptitude: string;
  betweener_aptitude: string;
  chaser_aptitude: string;
}

export type UpdateUmaRequest = Partial<CreateUmaRequest>;

// API Functions
export const umaApi = {
  // GET /api/v1/umas - Get all umas with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedApiResponse<Uma[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/umas${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(url);
  },

  // GET /api/v1/umas/:id - Get uma by ID
  getById: async (id: number): Promise<ApiResponse<Uma>> => {
    return apiClient.get(`/umas/${id}`);
  },

  // POST /api/v1/umas - Create new uma
  create: async (data: CreateUmaRequest): Promise<ApiResponse<Uma>> => {
    return apiClient.post('/umas', data);
  },

  // PUT /api/v1/umas/:id - Update uma
  update: async (id: number, data: UpdateUmaRequest): Promise<ApiResponse<Uma>> => {
    return apiClient.put(`/umas/${id}`, data);
  },

  // DELETE /api/v1/umas/:id - Delete uma
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiClient.delete(`/umas/${id}`);
  },
};