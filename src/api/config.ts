// src/api/config.ts
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

// Base API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Create axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle common response patterns
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the data part of the standardized response
    return response.data;
  },
  (error: AxiosError) => {
    // Handle common error patterns
    if (error.response?.data && typeof error.response.data === 'object' && 'meta' in error.response.data) {
      const errorData = error.response.data as ApiResponse<unknown>;
      throw new Error(errorData.meta.status || 'API Error');
    }
    throw error;
  }
);

// Types for standardized API responses
export interface ApiResponse<T> {
  meta: {
    code: number;
    status: string;
    message: boolean;
    isPaginated: boolean;
  };
  data?: T;
  error?: string;
}

export interface PaginatedApiResponse<T> extends ApiResponse<T> {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalRows: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    startIndex: number;
    endIndex: number;
    showing: string;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}