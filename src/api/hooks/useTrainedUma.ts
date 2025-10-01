// src/api/hooks/useTrainedUma.ts
import { useQuery } from '@tanstack/react-query';
import { trainedUmaApi } from '../trainedUma';
import type { PaginationParams } from '../index';

// Query keys
export const trainedUmaKeys = {
  all: ['trainedUmas'] as const,
  lists: () => [...trainedUmaKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...trainedUmaKeys.lists(), params] as const,
  details: () => [...trainedUmaKeys.all, 'detail'] as const,
  detail: (id: number) => [...trainedUmaKeys.details(), id] as const,
};

// Hooks for Trained Uma API
export const useTrainedUmas = (params?: PaginationParams) => {
  return useQuery({
    queryKey: trainedUmaKeys.list(params),
    queryFn: () => trainedUmaApi.getAll(params),
  });
};

export const useTrainedUma = (id: number, enabled = true) => {
  return useQuery({
    queryKey: trainedUmaKeys.detail(id),
    queryFn: () => trainedUmaApi.getById(id),
    enabled: enabled && !!id,
  });
};