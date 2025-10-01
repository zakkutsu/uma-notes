// src/api/hooks/useUma.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { umaApi } from '../uma';
import type { CreateUmaRequest, UpdateUmaRequest, PaginationParams } from '../index';

// Query keys
export const umaKeys = {
  all: ['umas'] as const,
  lists: () => [...umaKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...umaKeys.lists(), params] as const,
  details: () => [...umaKeys.all, 'detail'] as const,
  detail: (id: number) => [...umaKeys.details(), id] as const,
};

// Hooks for Uma API
export const useUmas = (params?: PaginationParams) => {
  return useQuery({
    queryKey: umaKeys.list(params),
    queryFn: () => umaApi.getAll(params),
  });
};

export const useUma = (id: number, enabled = true) => {
  return useQuery({
    queryKey: umaKeys.detail(id),
    queryFn: () => umaApi.getById(id),
    enabled: enabled && !!id,
  });
};

export const useCreateUma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreateUmaRequest) => umaApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch uma lists
      queryClient.invalidateQueries({ queryKey: umaKeys.lists() });
    },
  });
};

export const useUpdateUma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateUmaRequest }) => 
      umaApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate specific uma and lists
      queryClient.invalidateQueries({ queryKey: umaKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: umaKeys.lists() });
    },
  });
};

export const useDeleteUma = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => umaApi.delete(id),
    onSuccess: (_, id) => {
      // Remove specific uma from cache and invalidate lists
      queryClient.removeQueries({ queryKey: umaKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: umaKeys.lists() });
    },
  });
};