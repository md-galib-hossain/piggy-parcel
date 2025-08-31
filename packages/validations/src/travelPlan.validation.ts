import { z } from 'zod';

// Transport Mode Schema
export const transportModeSchema = z.enum([
  'bus',
  'car',
  'train',
  'plane',
  'motorcycle',
  'bicycle',
  'walking'
]);

// Create Travel Plan Schema
export const createTravelPlanSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureTime: z.string().datetime('Invalid departure time').transform((val) => new Date(val)),
  transportMode: transportModeSchema,
}).refine((data) => {
  // Ensure departure time is in the future
  return data.departureTime > new Date();
}, {
  message: 'Departure time must be in the future',
  path: ['departureTime']
});

// Update Travel Plan Schema
export const updateTravelPlanSchema = z.object({
  origin: z.string().min(1, 'Origin is required').optional(),
  destination: z.string().min(1, 'Destination is required').optional(),
  departureTime: z.string().datetime('Invalid departure time').transform((val) => new Date(val)).optional(),
  transportMode: transportModeSchema.optional(),
}).refine((data) => {
  // If departure time is provided, ensure it's in the future
  if (data.departureTime) {
    return data.departureTime > new Date();
  }
  return true;
}, {
  message: 'Departure time must be in the future',
  path: ['departureTime']
});

// Query Params for filtering travel plans
export const travelPlanQuerySchema = z.object({
  origin: z.string().optional(),
  destination: z.string().optional(),
  transportMode: transportModeSchema.optional(),
  travelerId: z.string().optional(),
  dateFrom: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
  dateTo: z.string().datetime().optional().transform((val) => val ? new Date(val) : undefined),
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
});

// Travel Plan ID Param Schema
export const travelPlanParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// Search Travel Plans Schema (for matching with delivery requests)
export const searchTravelPlansSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  departureDate: z.string().datetime().optional(),
  transportMode: transportModeSchema.optional(),
});

export type CreateTravelPlanInput = z.infer<typeof createTravelPlanSchema>;
export type UpdateTravelPlanInput = z.infer<typeof updateTravelPlanSchema>;
export type TravelPlanQueryInput = z.infer<typeof travelPlanQuerySchema>;
export type SearchTravelPlansInput = z.infer<typeof searchTravelPlansSchema>;
