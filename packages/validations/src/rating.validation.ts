import { z } from 'zod';

// Create Rating Schema
export const createRatingSchema = z.object({
  reviewedId: z.string().min(1, 'Reviewed user ID is required'),
  deliveryId: z.number().int().positive('Valid delivery ID is required'),
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5'),
  comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
}).refine((data) => {
  // If comment is provided, it should not be empty
  if (data.comment !== undefined) {
    return data.comment.trim().length > 0;
  }
  return true;
}, {
  message: 'Comment cannot be empty if provided',
  path: ['comment']
});

// Update Rating Schema
export const updateRatingSchema = z.object({
  rating: z.number().int().min(1, 'Rating must be at least 1').max(5, 'Rating must be at most 5').optional(),
  comment: z.string().max(500, 'Comment must be less than 500 characters').optional(),
}).refine((data) => {
  // If comment is provided, it should not be empty
  if (data.comment !== undefined) {
    return data.comment.trim().length > 0;
  }
  return true;
}, {
  message: 'Comment cannot be empty if provided',
  path: ['comment']
});

// Query Params for filtering ratings
export const ratingQuerySchema = z.object({
  reviewerId: z.string().optional(),
  reviewedId: z.string().optional(),
  deliveryId: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined),
  rating: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined),
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
});

// Rating ID Param Schema
export const ratingParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// User Rating Stats Query Schema
export const userRatingStatsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

// Bulk Rating Schema (for importing multiple ratings)
export const bulkRatingSchema = z.object({
  ratings: z.array(createRatingSchema).min(1, 'At least one rating is required').max(100, 'Maximum 100 ratings allowed'),
});

export type CreateRatingInput = z.infer<typeof createRatingSchema>;
export type UpdateRatingInput = z.infer<typeof updateRatingSchema>;
export type RatingQueryInput = z.infer<typeof ratingQuerySchema>;
export type UserRatingStatsInput = z.infer<typeof userRatingStatsSchema>;
export type BulkRatingInput = z.infer<typeof bulkRatingSchema>;
