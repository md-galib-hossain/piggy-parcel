// Common user summary type that can be reused across the application
export interface UserSummary {
  id: string;
  name: string;
  email: string;
  userName?: string | null;
  image?: string | null;
}

// Basic user info type with additional fields
export interface BasicUserInfo extends UserSummary {
  role: string;
  emailVerified: boolean;
  createdAt: Date;
}

// Pagination metadata type
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// Common API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  meta?: PaginationMeta;
}

// Common error response
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  code?: string;
  statusCode?: number;
}

// Timestamp fields that are common across entities
export interface TimestampFields {
  createdAt: Date;
  updatedAt: Date;
}

// Base entity with ID and timestamps
export interface BaseEntity extends TimestampFields {
  id: number | string;
}

// Query parameters for filtering
export interface BaseQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Search query parameters
export interface SearchQueryParams extends BaseQueryParams {
  search?: string;
}

// Date range query parameters
export interface DateRangeQueryParams {
  dateFrom?: Date;
  dateTo?: Date;
}
