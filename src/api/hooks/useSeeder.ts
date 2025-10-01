// src/api/hooks/useSeeder.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { seederApi } from '../seeder';

// Query keys
export const seederKeys = {
  all: ['seeder'] as const,
  status: () => [...seederKeys.all, 'status'] as const,
};

// Hooks for Seeder API
export const useSeederStatus = () => {
  return useQuery({
    queryKey: seederKeys.status(),
    queryFn: () => seederApi.getStatus(),
  });
};

export const useRunSeeders = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => seederApi.runSeeders(),
    onSuccess: () => {
      // Invalidate seeder status and all data queries
      queryClient.invalidateQueries({ queryKey: seederKeys.status() });
      // Also invalidate all entity queries since data has been seeded
      queryClient.invalidateQueries();
    },
  });
};

export const useClearData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => seederApi.clearData(),
    onSuccess: () => {
      // Invalidate seeder status and all data queries
      queryClient.invalidateQueries({ queryKey: seederKeys.status() });
      // Clear all cached data since it's been deleted
      queryClient.clear();
    },
  });
};

export const useResetData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => seederApi.resetData(),
    onSuccess: () => {
      // Invalidate seeder status and all data queries
      queryClient.invalidateQueries({ queryKey: seederKeys.status() });
      // Clear all cached data and refetch
      queryClient.clear();
    },
  });
};