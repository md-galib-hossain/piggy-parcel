import { UserSummary, BaseQueryParams } from '../common/shared';

export interface Rating {
  id: number;
  reviewerId: string;
  reviewedId: string;
  deliveryId: number;
  rating: number; // 1-5
  comment?: string | null;
  createdAt: Date;
}

// Using Pick for creation
export interface CreateRating extends Pick<
  Rating,
  'reviewedId' | 'deliveryId' | 'rating' | 'comment'
> {}

// Using Partial with Pick for updates
export interface UpdateRating extends Partial<Pick<
  Rating,
  'rating' | 'comment'
>> {}

// Using intersection types for extended interfaces
export interface RatingWithUsers extends Rating {
  reviewer: UserSummary;
  reviewed: UserSummary;
}

// Query parameters
export interface RatingQueryParams extends BaseQueryParams {
  reviewerId?: string;
  reviewedId?: string;
  deliveryId?: number;
  rating?: number;
}

// Rating statistics using Record utility type
export interface UserRatingStats {
  userId: string;
  averageRating: number;
  totalRatings: number;
  ratingsBreakdown: Record<1 | 2 | 3 | 4 | 5, number>;
}
