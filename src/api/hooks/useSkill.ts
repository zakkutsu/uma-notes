// src/api/hooks/useSkill.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillApi } from '../skill';
import type { CreateSkillRequest, UpdateSkillRequest, PaginationParams } from '../index';

// Query keys
export const skillKeys = {
  all: ['skills'] as const,
  lists: () => [...skillKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...skillKeys.lists(), params] as const,
  details: () => [...skillKeys.all, 'detail'] as const,
  detail: (id: number) => [...skillKeys.details(), id] as const,
};

// Hooks for Skill API
export const useSkills = (params?: PaginationParams) => {
  return useQuery({
    queryKey: skillKeys.list(params),
    queryFn: () => skillApi.getAll(params),
  });
};

export const useSkill = (id: number, enabled = true) => {
  return useQuery({
    queryKey: skillKeys.detail(id),
    queryFn: () => skillApi.getById(id),
    enabled: enabled && !!id,
  });
};

export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateSkillRequest) => skillApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch skill lists
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
    },
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSkillRequest }) => 
      skillApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific skill and lists
      queryClient.invalidateQueries({ queryKey: skillKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
    },
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => skillApi.delete(id),
    onSuccess: (_, id) => {
      // Remove specific skill from cache and invalidate lists
      queryClient.removeQueries({ queryKey: skillKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: skillKeys.lists() });
    },
  });
};