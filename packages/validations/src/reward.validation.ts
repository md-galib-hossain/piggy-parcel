import { z } from 'zod';

// Badge Type Schema
export const badgeTypeSchema = z.enum([
  'eco_warrior',
  'reliable_sender',
  'trusted_traveler',
  'quick_deliverer',
  'community_helper',
  'carbon_saver',
  'frequent_user'
]);

// Badge Schema
export const badgeSchema = z.object({
  type: badgeTypeSchema,
  name: z.string().min(1, 'Badge name is required'),
  description: z.string().min(1, 'Badge description is required'),
  icon: z.string().min(1, 'Badge icon is required'),
  earnedAt: z.string().datetime().transform((val) => new Date(val)),
});

// Create Reward Schema
export const createRewardSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  greenPoints: z.number().int().min(0, 'Green points must be non-negative').optional().default(0),
  badges: z.string().optional().default('[]'),
});

// Update Reward Schema
export const updateRewardSchema = z.object({
  greenPoints: z.number().int().min(0, 'Green points must be non-negative').optional(),
  badges: z.string().optional(),
});

// Add Green Points Schema
export const addGreenPointsSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  points: z.number().int().positive('Points must be positive'),
  reason: z.string().min(1, 'Reason is required').max(200, 'Reason must be less than 200 characters'),
});

// Award Badge Schema
export const awardBadgeSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  badgeType: badgeTypeSchema,
});

// Query Params for filtering rewards
export const rewardQuerySchema = z.object({
  userId: z.string().optional(),
  minPoints: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined),
  maxPoints: z.string().optional().transform((val) => val ? parseInt(val, 10) : undefined),
  hasBadges: z.string().optional().transform((val) => val === 'true'),
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
});

// Reward ID Param Schema
export const rewardParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// Leaderboard Query Schema
export const leaderboardQuerySchema = z.object({
  period: z.enum(['week', 'month', 'year', 'all-time']).optional().default('month'),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
});

// User Stats Query Schema
export const userStatsQuerySchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

export type BadgeInput = z.infer<typeof badgeSchema>;
export type CreateRewardInput = z.infer<typeof createRewardSchema>;
export type UpdateRewardInput = z.infer<typeof updateRewardSchema>;
export type AddGreenPointsInput = z.infer<typeof addGreenPointsSchema>;
export type AwardBadgeInput = z.infer<typeof awardBadgeSchema>;
export type RewardQueryInput = z.infer<typeof rewardQuerySchema>;
export type LeaderboardQueryInput = z.infer<typeof leaderboardQuerySchema>;
export type UserStatsQueryInput = z.infer<typeof userStatsQuerySchema>;
