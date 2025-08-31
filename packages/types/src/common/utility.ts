// Advanced TypeScript utility types for the Piggy Parcel project

// Make specific fields optional
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make specific fields required
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Exclude null and undefined
export type NonNullable<T> = T extends null | undefined ? never : T;

// Extract non-nullable keys
export type NonNullableKeys<T> = {
  [K in keyof T]: T[K] extends null | undefined ? never : K;
}[keyof T];

// Create a type with only non-nullable properties
export type NonNullableProps<T> = Pick<T, NonNullableKeys<T>>;

// Type for API response with data
export type ApiResponseWithData<T> = {
  success: true;
  message: string;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
};

// Type for API error response
export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: string[];
  code?: string;
  statusCode?: number;
};

// Union type for all API responses
export type ApiResult<T> = ApiResponseWithData<T> | ApiErrorResponse;

// Create input type from entity (excludes timestamps and id)
export type CreateInput<T extends { id: any; createdAt: Date; updatedAt: Date }> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;

// Create update type from entity (partial, excludes id and timestamps)
export type UpdateInput<T extends { id: any; createdAt: Date; updatedAt: Date }> = Partial<
  Omit<T, 'id' | 'createdAt' | 'updatedAt'>
>;

// Extract enum values from a readonly array
export type ArrayToUnion<T extends ReadonlyArray<any>> = T[number];

// Create a discriminated union type
export type DiscriminatedUnion<T, K extends keyof T> = T[K] extends infer U
  ? U extends any
    ? { [P in K]: U } & T
    : never
  : never;

// Type for database entity with relations
export type WithRelations<T, R extends Record<string, any>> = T & {
  [K in keyof R]: R[K];
};

// Type for paginated response
export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
};

// Type for sorting parameters
export type SortOrder = 'asc' | 'desc';
export type SortParams<T> = {
  [K in keyof T]?: SortOrder;
};

// Type for filtering parameters
export type FilterParams<T> = {
  [K in keyof T]?: T[K] extends string
    ? string | string[]
    : T[K] extends number
    ? number | { min?: number; max?: number }
    : T[K] extends Date
    ? Date | { from?: Date; to?: Date }
    : T[K] extends boolean
    ? boolean
    : T[K];
};

// Type for search and filter query
export type QueryParams<T> = {
  search?: string;
  page?: number;
  limit?: number;
  sort?: SortParams<T>;
  filters?: FilterParams<Partial<T>>;
};

// Event payload type for domain events
export type DomainEvent<T extends string, P = {}> = {
  type: T;
  payload: P;
  timestamp: Date;
  aggregateId: string;
  version: number;
};

// Status tracking type
export type StatusTransition<T extends string> = {
  from: T;
  to: T;
  timestamp: Date;
  reason?: string;
  userId?: string;
};

// Audit trail type
export type AuditTrail<T = any> = {
  entityId: string;
  entityType: string;
  action: 'create' | 'update' | 'delete';
  changes: Partial<T>;
  userId: string;
  timestamp: Date;
  metadata?: Record<string, any>;
};
