# Uma Notes Frontend API

This directory contains all the API functions and React hooks for interacting with the Uma Notes backend.

## Overview

The API layer is organized as follows:

```
src/api/
├── config.ts          # Axios configuration and base types
├── queryClient.ts     # React Query client setup
├── index.ts           # Main exports
├── uma.ts             # Uma API functions
├── factor.ts          # Factor API functions
├── supportCard.ts     # Support Card API functions
├── trainedUma.ts      # Trained Uma API functions
├── skill.ts           # Skill API functions
├── seeder.ts          # Seeder API functions
└── hooks/             # React Query hooks
    ├── index.ts       # Hook exports
    ├── useUma.ts      # Uma hooks
    ├── useFactor.ts   # Factor hooks
    ├── useSupportCard.ts  # Support Card hooks
    ├── useTrainedUma.ts   # Trained Uma hooks
    ├── useSkill.ts    # Skill hooks
    └── useSeeder.ts   # Seeder hooks
```

## Setup

1. **Install dependencies** (already done):
   ```bash
   npm install axios @tanstack/react-query @tanstack/react-query-devtools
   ```

2. **Wrap your app with QueryProvider**:
   ```tsx
   // src/main.tsx or src/App.tsx
   import { QueryProvider } from './providers/QueryProvider';

   function App() {
     return (
       <QueryProvider>
         {/* Your app components */}
       </QueryProvider>
     );
   }
   ```

3. **Set environment variable** (optional):
   Create `.env` file:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api/v1
   ```

## API Functions

Each entity has dedicated API functions:

### Uma API (`umaApi`)
```typescript
import { umaApi } from '@/api';

// Get all umas with pagination
const umas = await umaApi.getAll({ page: 1, limit: 10 });

// Get uma by ID
const uma = await umaApi.getById(1);

// Create new uma
const newUma = await umaApi.create(umaData);

// Update uma
const updatedUma = await umaApi.update(1, updateData);

// Delete uma
await umaApi.delete(1);
```

### Skill API (`skillApi`)
```typescript
import { skillApi } from '@/api';

// Get all skills with pagination
const skills = await skillApi.getAll({ page: 1, limit: 10 });

// Get skill by ID
const skill = await skillApi.getById(1);

// Create new skill
const newSkill = await skillApi.create(skillData);

// Update skill
const updatedSkill = await skillApi.update(1, updateData);

// Delete skill
await skillApi.delete(1);
```

### Read-only APIs
- `factorApi` - Get all factors, get by ID
- `supportCardApi` - Get all support cards, get by ID (with skills)
- `trainedUmaApi` - Get all trained umas, get by ID

### Seeder API (`seederApi`)
```typescript
import { seederApi } from '@/api';

// Get seeding status
const status = await seederApi.getStatus();

// Run seeders
await seederApi.runSeeders();

// Clear all data
await seederApi.clearData();

// Reset (clear + seed)
await seederApi.resetData();
```

## React Hooks

For easier integration with React components, use the provided hooks:

### Uma Hooks
```tsx
import { useUmas, useUma, useCreateUma, useUpdateUma, useDeleteUma } from '@/api';

function UmaList() {
  // Get paginated list
  const { data: umasResponse, isLoading, error } = useUmas({ page: 1, limit: 10 });
  
  // Get single uma
  const { data: umaResponse } = useUma(1);
  
  // Mutations
  const createMutation = useCreateUma();
  const updateMutation = useUpdateUma();
  const deleteMutation = useDeleteUma();
  
  const handleCreate = () => {
    createMutation.mutate(newUmaData);
  };
  
  const handleUpdate = (id: number) => {
    updateMutation.mutate({ id, data: updateData });
  };
  
  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };
  
  // Access data
  const umas = umasResponse?.data || [];
  const pagination = umasResponse?.pagination;
  
  return (
    <div>
      {/* Render umas */}
    </div>
  );
}
```

### Other Entity Hooks
- `useFactors(params)`, `useFactor(id)` - Factor hooks
- `useSupportCards(params)`, `useSupportCard(id)` - Support Card hooks
- `useTrainedUmas(params)`, `useTrainedUma(id)` - Trained Uma hooks
- `useSkills(params)`, `useSkill(id)`, `useCreateSkill()`, `useUpdateSkill()`, `useDeleteSkill()` - Skill hooks
- `useSeederStatus()`, `useRunSeeders()`, `useClearData()`, `useResetData()` - Seeder hooks

## Response Format

All API responses follow this standardized format:

```typescript
// Regular response
interface ApiResponse<T> {
  meta: {
    code: number;          // HTTP status code
    status: string;        // Status message
    message: boolean;      // Success flag
    isPaginated: boolean;  // Whether response has pagination
  };
  data?: T;               // Response data
  error?: string;         // Error message (if any)
}

// Paginated response
interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRows: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    startIndex: number;
    endIndex: number;
    showing: string;      // "1-10 of 50 items"
  };
}
```

## Error Handling

The API client automatically handles errors and throws meaningful error messages:

```tsx
import { useUmas } from '@/api';

function UmaList() {
  const { data, isLoading, error } = useUmas();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{/* Render data */}</div>;
}
```

## Backend API Endpoints

The frontend API functions map to these backend endpoints:

| Frontend Function | HTTP Method | Backend Endpoint | Description |
|------------------|-------------|------------------|-------------|
| `umaApi.getAll()` | GET | `/api/v1/umas` | Get all umas with pagination |
| `umaApi.getById(id)` | GET | `/api/v1/umas/:id` | Get uma by ID |
| `umaApi.create(data)` | POST | `/api/v1/umas` | Create new uma |
| `umaApi.update(id, data)` | PUT | `/api/v1/umas/:id` | Update uma |
| `umaApi.delete(id)` | DELETE | `/api/v1/umas/:id` | Delete uma |
| `factorApi.getAll()` | GET | `/api/v1/factors` | Get all factors |
| `factorApi.getById(id)` | GET | `/api/v1/factors/:id` | Get factor by ID |
| `supportCardApi.getAll()` | GET | `/api/v1/support-cards` | Get all support cards |
| `supportCardApi.getById(id)` | GET | `/api/v1/support-cards/:id` | Get support card with skills |
| `trainedUmaApi.getAll()` | GET | `/api/v1/trained-umas` | Get all trained umas |
| `trainedUmaApi.getById(id)` | GET | `/api/v1/trained-umas/:id` | Get trained uma by ID |
| `skillApi.getAll()` | GET | `/api/v1/skills` | Get all skills |
| `skillApi.getById(id)` | GET | `/api/v1/skills/:id` | Get skill by ID |
| `skillApi.create(data)` | POST | `/api/v1/skills` | Create new skill |
| `skillApi.update(id, data)` | PUT | `/api/v1/skills/:id` | Update skill |
| `skillApi.delete(id)` | DELETE | `/api/v1/skills/:id` | Delete skill |
| `seederApi.getStatus()` | GET | `/api/v1/seed` | Get seeding status |
| `seederApi.runSeeders()` | POST | `/api/v1/seed/run` | Run seeders |
| `seederApi.clearData()` | DELETE | `/api/v1/seed/clear` | Clear all data |
| `seederApi.resetData()` | POST | `/api/v1/seed/reset` | Reset (clear + seed) |

## Features

- ✅ **Type-safe** - Full TypeScript support with proper typing
- ✅ **Standardized responses** - Consistent response format handling
- ✅ **Pagination support** - Built-in pagination for list endpoints
- ✅ **Error handling** - Automatic error parsing and meaningful messages
- ✅ **React Query integration** - Caching, background updates, optimistic updates
- ✅ **Developer experience** - DevTools for debugging queries
- ✅ **Automatic cache invalidation** - Smart cache management on mutations
- ✅ **Environment configuration** - Configurable API base URL

## Usage Examples

### Simple data fetching:
```tsx
function UmaPage() {
  const { data, isLoading } = useUmas({ page: 1, limit: 20 });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div>
      <h1>Umas ({data?.pagination.totalRows})</h1>
      {data?.data.map(uma => (
        <div key={uma.id}>{uma.name}</div>
      ))}
    </div>
  );
}
```

### CRUD operations:
```tsx
function UmaManager() {
  const { data: umas } = useUmas();
  const createMutation = useCreateUma();
  const updateMutation = useUpdateUma();
  const deleteMutation = useDeleteUma();
  
  const handleCreate = (formData: CreateUmaRequest) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        alert('Uma created successfully!');
      },
      onError: (error) => {
        alert(\`Error: \${error.message}\`);
      }
    });
  };
  
  return (
    <div>
      {/* Your UI components */}
    </div>
  );
}
```