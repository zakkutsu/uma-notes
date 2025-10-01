// src/api/index.ts
// Export all API functions
export { umaApi } from './uma';
export { factorApi } from './factor';
export { supportCardApi } from './supportCard';
export { trainedUmaApi } from './trainedUma';
export { skillApi } from './skill';
export { seederApi } from './seeder';

// Export configuration and types
export { apiClient, API_BASE_URL } from './config';
export type { 
  ApiResponse, 
  PaginatedApiResponse, 
  PaginationParams 
} from './config';

// Export request/response types
export type { 
  CreateUmaRequest, 
  UpdateUmaRequest 
} from './uma';

export type { 
  CreateSkillRequest, 
  UpdateSkillRequest 
} from './skill';

export type { 
  SeederStatus, 
  SeederResponse 
} from './seeder';

// Export React Query setup
export { queryClient } from './queryClient';

// Export all hooks
export * from './hooks';