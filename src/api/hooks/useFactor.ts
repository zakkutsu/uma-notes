// src/api/hooks/useFactor.ts
import { useQuery } from '@tanstack/react-query';
import { factorApi } from '../factor';
import type { PaginationParams } from '../index';

// Query keys
export const factorKeys = {
  all: ['factors'] as const,
  lists: () => [...factorKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...factorKeys.lists(), params] as const,
  details: () => [...factorKeys.all, 'detail'] as const,
  detail: (id: number) => [...factorKeys.details(), id] as const,
};

// Hooks for Factor API
export const useFactors = (params?: PaginationParams) => {
  return useQuery({
    queryKey: factorKeys.list(params),
    queryFn: () => factorApi.getAll(params),
  });
};

export const useFactor = (id: number, enabled = true) => {
  return useQuery({
    queryKey: factorKeys.detail(id),
    queryFn: () => factorApi.getById(id),
    enabled: enabled && !!id,
  });
};