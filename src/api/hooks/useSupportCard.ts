// src/api/hooks/useSupportCard.ts
import { useQuery } from '@tanstack/react-query';
import { supportCardApi } from '../supportCard';
import type { PaginationParams } from '../index';

// Query keys
export const supportCardKeys = {
  all: ['supportCards'] as const,
  lists: () => [...supportCardKeys.all, 'list'] as const,
  list: (params?: PaginationParams) => [...supportCardKeys.lists(), params] as const,
  details: () => [...supportCardKeys.all, 'detail'] as const,
  detail: (id: number) => [...supportCardKeys.details(), id] as const,
};

// Hooks for Support Card API
export const useSupportCards = (params?: PaginationParams) => {
  return useQuery({
    queryKey: supportCardKeys.list(params),
    queryFn: () => supportCardApi.getAll(params),
  });
};

export const useSupportCard = (id: number, enabled = true) => {
  return useQuery({
    queryKey: supportCardKeys.detail(id),
    queryFn: () => supportCardApi.getById(id),
    enabled: enabled && !!id,
  });
};