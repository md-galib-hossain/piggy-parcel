// Re-export auth types for backwards compatibility
export * from './auth';

// Legacy DTO interface - deprecated, use User from auth.ts instead
export interface UserDTO {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'user' | 'admin';
  banned?: boolean;
  banReason?: string;
  banExpires?: Date;
  userName?: string;
}
