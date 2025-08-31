import { z } from 'zod';

// Parcel Details Schema
export const parcelDetailsSchema = z.object({
  size: z.string().min(1, 'Size is required'),
  weight: z.number().positive('Weight must be positive'),
  contents: z.string().min(1, 'Contents description is required'),
  fragile: z.boolean().optional(),
  value: z.number().positive().optional(),
});

// Delivery Status Schema
export const deliveryStatusSchema = z.enum([
  'pending',
  'accepted',
  'picked_up',
  'in_transit',
  'delivered',
  'cancelled'
]);

// Create Delivery Request Schema
export const createDeliveryRequestSchema = z.object({
  origin: z.string().min(1, 'Origin is required'),
  destination: z.string().min(1, 'Destination is required'),
  parcelDetails: parcelDetailsSchema,
  urgency: z.boolean().optional().default(false),
  proposedFee: z.string().optional(),
  pickupPoint: z.string().optional(),
  dropOffPoint: z.string().optional(),
});

// Update Delivery Request Schema
export const updateDeliveryRequestSchema = z.object({
  travelerId: z.string().optional(),
  status: deliveryStatusSchema.optional(),
  pickupPoint: z.string().optional(),
  dropOffPoint: z.string().optional(),
  proposedFee: z.string().optional(),
});

// Query Params for filtering delivery requests
export const deliveryRequestQuerySchema = z.object({
  status: deliveryStatusSchema.optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  urgent: z.boolean().optional(),
  senderId: z.string().optional(),
  travelerId: z.string().optional(),
  page: z.string().optional().transform((val) => val ? parseInt(val, 10) : 1),
  limit: z.string().optional().transform((val) => val ? parseInt(val, 10) : 10),
});

// Delivery Request ID Param Schema
export const deliveryRequestParamsSchema = z.object({
  id: z.string().transform((val) => parseInt(val, 10)),
});

// Accept Delivery Request Schema
export const acceptDeliveryRequestSchema = z.object({
  travelerId: z.string().min(1, 'Traveler ID is required'),
});

// Update Delivery Status Schema
export const updateDeliveryStatusSchema = z.object({
  status: deliveryStatusSchema,
});

export type ParcelDetailsInput = z.infer<typeof parcelDetailsSchema>;
export type CreateDeliveryRequestInput = z.infer<typeof createDeliveryRequestSchema>;
export type UpdateDeliveryRequestInput = z.infer<typeof updateDeliveryRequestSchema>;
export type DeliveryRequestQueryInput = z.infer<typeof deliveryRequestQuerySchema>;
export type AcceptDeliveryRequestInput = z.infer<typeof acceptDeliveryRequestSchema>;
export type UpdateDeliveryStatusInput = z.infer<typeof updateDeliveryStatusSchema>;
