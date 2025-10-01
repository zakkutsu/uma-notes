// src/api/skill.ts
import { apiClient } from './config';
import type { PaginatedApiResponse, ApiResponse, PaginationParams } from './config';
import type { Skill, SkillRarity, SkillType } from '../types';

// Request types
export interface CreateSkillRequest {
  skill_name: string;
  skill_effect: string;
  skill_rarity: SkillRarity;
  skill_type: SkillType;
}

export type UpdateSkillRequest = Partial<CreateSkillRequest>;

// API Functions
export const skillApi = {
  // GET /api/v1/skills - Get all skills with pagination
  getAll: async (params?: PaginationParams): Promise<PaginatedApiResponse<Skill[]>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const url = `/skills${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    return apiClient.get(url);
  },

  // GET /api/v1/skills/:id - Get skill by ID
  getById: async (id: number): Promise<ApiResponse<Skill>> => {
    return apiClient.get(`/skills/${id}`);
  },

  // POST /api/v1/skills - Create new skill
  create: async (data: CreateSkillRequest): Promise<ApiResponse<Skill>> => {
    return apiClient.post('/skills', data);
  },

  // PUT /api/v1/skills/:id - Update skill
  update: async (id: number, data: UpdateSkillRequest): Promise<ApiResponse<Skill>> => {
    return apiClient.put(`/skills/${id}`, data);
  },

  // DELETE /api/v1/skills/:id - Delete skill
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiClient.delete(`/skills/${id}`);
  },
};