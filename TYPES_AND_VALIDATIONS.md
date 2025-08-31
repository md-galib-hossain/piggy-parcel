# Piggy Parcel Types & Validations

This document provides an overview of the types and validation schemas created for the Piggy Parcel project.

## 📦 Packages Overview

### Types Package (`@piggy-parcel/types`)

Contains comprehensive TypeScript interfaces and types for all entities:

- **User & Authentication**: User profiles, sessions, accounts, verification
- **Delivery Requests**: Parcel delivery management with status tracking
- **Travel Plans**: Traveler journey planning and matching
- **Ratings**: User rating and review system
- **Rewards**: Green points and badge system

### Validations Package (`@piggy-parcel/validations`)

Contains Zod validation schemas with proper error handling:

- **Input validation** for API endpoints
- **Type-safe transformations** (string to Date, etc.)
- **Business logic validation** (future dates, rating ranges, etc.)
- **Query parameter validation** with pagination

## 🔧 Usage Examples

### 1. User Registration

```typescript
import { createUserSchema, type CreateUserInput } from '@piggy-parcel/validations';
import { type User } from '@piggy-parcel/types';

// Validate input
const validatedData: CreateUserInput = createUserSchema.parse({
  name: "John Doe",
  email: "john@example.com",
  password: "securepass123",
  userName: "johndoe"
});
```

### 2. Delivery Request Creation

```typescript
import { createDeliveryRequestSchema, type CreateDeliveryRequestInput } from '@piggy-parcel/validations';
import { type DeliveryRequest, type ParcelDetails } from '@piggy-parcel/types';

const parcelData: CreateDeliveryRequestInput = createDeliveryRequestSchema.parse({
  origin: "New York, NY",
  destination: "Boston, MA",
  parcelDetails: {
    size: "medium",
    weight: 2.5,
    contents: "Books",
    fragile: false
  },
  urgency: true,
  proposedFee: "25.00"
});
```

### 3. Travel Plan with Validation

```typescript
import { createTravelPlanSchema, type CreateTravelPlanInput } from '@piggy-parcel/validations';
import { type TravelPlan, type TransportMode } from '@piggy-parcel/types';

const travelData: CreateTravelPlanInput = createTravelPlanSchema.parse({
  origin: "New York, NY",
  destination: "Boston, MA",
  departureTime: "2024-12-25T10:00:00Z",
  transportMode: "car" as TransportMode
});
```

### 4. Rating System

```typescript
import { createRatingSchema, type CreateRatingInput } from '@piggy-parcel/validations';
import { type Rating } from '@piggy-parcel/types';

const ratingData: CreateRatingInput = createRatingSchema.parse({
  reviewedId: "user123",
  deliveryId: 456,
  rating: 5,
  comment: "Excellent service!"
});
```

### 5. Reward Management

```typescript
import { addGreenPointsSchema, type AddGreenPointsInput } from '@piggy-parcel/validations';
import { type Reward, type Badge } from '@piggy-parcel/types';

const pointsData: AddGreenPointsInput = addGreenPointsSchema.parse({
  userId: "user123",
  points: 50,
  reason: "Successful delivery completion"
});
```

## 🎯 Key Features

### Type Safety
- All schemas provide full TypeScript type inference
- Compile-time error checking
- IntelliSense support

### Validation Features
- **Email validation** with proper format checking
- **Date validation** ensuring future dates where required
- **Enum validation** for status fields and categories
- **Number validation** with min/max constraints
- **String validation** with length limits and patterns

### Business Logic
- **User roles** (user, admin) with proper constraints
- **Delivery status** workflow validation
- **Transport modes** with predefined options
- **Rating system** (1-5 scale) with optional comments
- **Badge system** with predefined achievement types

### Pagination & Querying
- **Consistent pagination** across all entities
- **Search and filtering** with type-safe parameters
- **Sorting options** with direction control
- **Date range queries** with proper validation

## 🔄 Integration with Clean Architecture

These types and validations support the clean architecture principles:

1. **Domain Layer**: Core business entities and rules
2. **Application Layer**: Use cases and business logic
3. **Interface Layer**: API contracts and data transfer
4. **Infrastructure Layer**: Database schemas and external services

## 📝 Best Practices

1. **Always validate input** at API boundaries
2. **Use type inference** from Zod schemas
3. **Handle validation errors** gracefully
4. **Transform data types** consistently (strings to dates, etc.)
5. **Maintain backward compatibility** when updating schemas

## 🚀 Next Steps

1. Implement API endpoints using these schemas
2. Create database repository layer with proper typing
3. Add comprehensive error handling
4. Implement rate limiting and security validations
5. Add internationalization support for error messages
