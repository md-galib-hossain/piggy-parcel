import { z } from 'zod';

// Common pagination schema
export const paginationSchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

// Common ID parameter schema
export const idParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

// Common numeric ID parameter schema
export const numericIdParamSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// Common search schema
export const searchSchema = z.object({
  query: z.string().min(1, 'Search query is required').max(100, 'Search query must be less than 100 characters'),
  ...paginationSchema.shape,
});

// Date range schema
export const dateRangeSchema = z.object({
  from: z.string().datetime('Invalid from date').optional(),
  to: z.string().datetime('Invalid to date').optional(),
}).refine((data) => {
  if (data.from && data.to) {
    return new Date(data.from) <= new Date(data.to);
  }
  return true;
}, {
  message: 'From date must be before or equal to to date',
  path: ['to'],
});

// Location schema
export const locationSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  city: z.string().min(1, 'City is required').optional(),
  state: z.string().optional(),
  country: z.string().min(1, 'Country is required').optional(),
  postalCode: z.string().optional(),
});

// File upload schema
export const fileUploadSchema = z.object({
  filename: z.string().min(1, 'Filename is required'),
  mimetype: z.string().min(1, 'MIME type is required'),
  size: z.number().positive('File size must be positive'),
  data: z.any(), // File data - can be Buffer, ArrayBuffer, etc.
});

// Contact info schema
export const contactInfoSchema = z.object({
  phone: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid phone number format').optional(),
  whatsapp: z.string().regex(/^\+?[\d\s\-\(\)]+$/, 'Invalid WhatsApp number format').optional(),
  telegram: z.string().min(1, 'Telegram username is required').optional(),
});

// API response schema
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  errors: z.array(z.string()).optional(),
  meta: z.object({
    page: z.number().optional(),
    limit: z.number().optional(),
    total: z.number().optional(),
    totalPages: z.number().optional(),
  }).optional(),
});

// Error response schema
export const errorResponseSchema = z.object({
  success: z.literal(false),
  message: z.string(),
  errors: z.array(z.string()).optional(),
  code: z.string().optional(),
  statusCode: z.number().optional(),
});

export type PaginationInput = z.infer<typeof paginationSchema>;
export type IdParamInput = z.infer<typeof idParamSchema>;
export type NumericIdParamInput = z.infer<typeof numericIdParamSchema>;
export type SearchInput = z.infer<typeof searchSchema>;
export type DateRangeInput = z.infer<typeof dateRangeSchema>;
export type LocationInput = z.infer<typeof locationSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type ContactInfoInput = z.infer<typeof contactInfoSchema>;
export type ApiResponseInput = z.infer<typeof apiResponseSchema>;
export type ErrorResponseInput = z.infer<typeof errorResponseSchema>;
