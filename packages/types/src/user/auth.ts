import { UserSummary, BaseEntity, TimestampFields, BaseQueryParams } from '../common/shared';

export type UserRole = "user" | "admin";

export interface User extends BaseEntity {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  banned?: boolean | null;
  banReason?: string | null;
  banExpires?: Date | null;
  userName?: string | null;
}

// Using Pick and optional fields for creation
export interface CreateUser extends Pick<User, 'name' | 'email' | 'role' | 'userName' | 'image'> {
  password?: string;
}

// Using Partial with Pick for flexible updates
export interface UpdateUser extends Partial<Pick<
  User, 
  'name' | 'email' | 'role' | 'userName' | 'image' | 'banned' | 'banReason' | 'banExpires'
>> {}

// Extended user profile using intersection
export interface UserProfile extends User {
  stats?: {
    totalDeliveries: number;
    totalSentParcels: number;
    averageRating: number;
    greenPoints: number;
    badges: number;
  };
}

// Session interface extending timestamp fields
export interface Session extends TimestampFields {
  id: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  userId: string;
  impersonatedBy?: string | null;
}

// Account interface with timestamps
export interface Account extends TimestampFields {
  id: string;
  accountId: string;
  providerId: string;
  userId: string;
  accessToken?: string | null;
  refreshToken?: string | null;
  idToken?: string | null;
  accessTokenExpiresAt?: Date | null;
  refreshTokenExpiresAt?: Date | null;
  scope?: string | null;
  password?: string | null;
}

// Verification with optional timestamps
export interface Verification {
  id: string;
  identifier: string;
  value: string;
  expiresAt: Date;
  createdAt?: Date | null;
  updatedAt?: Date | null;
}

// Rate limit interface
export interface RateLimit {
  id: string;
  key?: string | null;
  count?: number | null;
  lastRequest?: number | null;
}

// Query parameters for users
export interface UserQueryParams extends BaseQueryParams {
  role?: UserRole;
  banned?: boolean;
  search?: string;
}
