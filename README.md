# 🐷 Piggy Parcel

> **A peer-to-peer parcel delivery platform that connects senders with travelers to create an eco-friendly, cost-effective delivery network.**

## 🎯 Project Overview

Piggy Parcel is a revolutionary delivery platform that leverages existing travel plans to create a sustainable parcel delivery network. When people travel between cities, they can earn money by delivering parcels for others, reducing carbon footprint and making travel more economical.

### Core Concept
- **Senders** post delivery requests for parcels they need to send
- **Travelers** share their travel plans and can accept delivery requests along their route  
- **Community-driven** platform with ratings and rewards system
- **Eco-friendly** approach reducing dedicated delivery vehicles

---

## 🏗️ Technical Architecture

Built as a **monorepo using Turborepo** with clean architecture principles:

```
piggy-parcel/
├── apps/
│   ├── admin/          # Admin dashboard (Next.js)
│   ├── client/         # User frontend (Next.js)  
│   └── api-v1/         # Backend API (Express.js)
└── packages/
    ├── db/             # Database schemas & migrations
    ├── types/          # TypeScript type definitions
    ├── validations/    # Zod validation schemas
    ├── auth/           # Authentication utilities
    ├── ui/             # Shared UI components
    ├── utils/          # Shared utilities
    ├── config/         # Configuration management
    ├── errors/         # Error handling utilities
    └── middlewares/    # Express middlewares
```

### 🏛️ Clean Architecture Layers

1. **Domain Layer** (`packages/types`, `packages/db/schema`)
   - Core business entities and rules
   - Database schemas and relationships
   - Business logic interfaces

2. **Application Layer** (`apps/api-v1/src/app/modules`)
   - Use cases and business logic implementation
   - Service interfaces and implementations
   - Application-specific rules

3. **Interface Layer** (`apps/api-v1/src/app/routes`, `apps/client`, `apps/admin`)
   - API controllers and routes
   - Frontend components and pages
   - External service integrations

4. **Infrastructure Layer** (`packages/db`, `packages/auth`, `packages/middlewares`)
   - Database implementation
   - Authentication providers
   - External service integrations

---

## 📚 API Documentation

### Base URL
```
Development: http://localhost:8000/api/v1
Production: https://api.piggyparcel.com/v1
```

### Authentication
All protected endpoints require a Bearer token in the Authorization header:
```bash
Authorization: Bearer <your-access-token>
```

### Core Endpoints

#### 🔐 Authentication
```http
POST   /auth/login           # User login
POST   /auth/register        # User registration
POST   /auth/logout          # User logout
POST   /auth/refresh         # Refresh access token
GET    /auth/me              # Get current user
```

#### 👤 Users
```http
GET    /users                # Get users (admin only)
GET    /users/:id            # Get user by ID
PUT    /users/:id            # Update user
DELETE /users/:id            # Delete user (admin only)
POST   /users/:id/ban        # Ban user (admin only)
```

#### 📦 Delivery Requests
```http
GET    /delivery-requests    # Get delivery requests
POST   /delivery-requests    # Create delivery request
GET    /delivery-requests/:id # Get delivery request by ID
PUT    /delivery-requests/:id # Update delivery request
DELETE /delivery-requests/:id # Delete delivery request
POST   /delivery-requests/:id/accept # Accept delivery request
```

#### ✈️ Travel Plans
```http
GET    /travel-plans         # Get travel plans
POST   /travel-plans         # Create travel plan
GET    /travel-plans/:id     # Get travel plan by ID
PUT    /travel-plans/:id     # Update travel plan
DELETE /travel-plans/:id     # Delete travel plan
```

#### ⭐ Ratings
```http
GET    /ratings              # Get ratings
POST   /ratings              # Create rating
GET    /ratings/:id          # Get rating by ID
PUT    /ratings/:id          # Update rating
DELETE /ratings/:id          # Delete rating
```

#### 🎁 Rewards
```http
GET    /rewards              # Get user rewards
GET    /rewards/leaderboard  # Get points leaderboard
POST   /rewards/points       # Add points to user
POST   /rewards/badge        # Award badge to user
```

### Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "message": "Request successful",
  "data": { ... },
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"],
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

---

## 🗄️ Database Overview

The platform uses **PostgreSQL** with 5 core entities:
- **Users** - Platform members (senders & travelers)
- **Delivery Requests** - Parcels needing delivery
- **Travel Plans** - User travel schedules
- **Ratings** - Community feedback system
- **Rewards** - Gamification with points & badges

---

## 🔄 Application Flow

### 1. User Journey - Sender

```
1. Register/Login → 2. Create Delivery Request → 3. Wait for Traveler Match 
     ↓
4. Accept Traveler → 5. Arrange Pickup → 6. Track Delivery → 7. Rate Traveler
```

### 2. User Journey - Traveler

```
1. Register/Login → 2. Create Travel Plan → 3. Browse Delivery Requests
     ↓
4. Accept Delivery → 5. Pickup Parcel → 6. Transport → 7. Deliver → 8. Get Rated & Rewarded
```

### 3. Delivery Status Flow

```
pending → accepted → picked_up → in_transit → delivered
   ↓
cancelled (possible from any status)
```

### 4. Reward System Flow

```
Complete Delivery → Earn Green Points → Unlock Badges → Climb Leaderboard
```

**Badge Types:**
- 🌱 `eco_warrior` - Multiple eco-friendly deliveries
- 📦 `reliable_sender` - Consistent sender with good ratings  
- 🚗 `trusted_traveler` - Reliable traveler with excellent service
- ⚡ `quick_deliverer` - Fast delivery completions
- 🤝 `community_helper` - High community engagement
- 🌍 `carbon_saver` - Significant environmental impact
- 🔄 `frequent_user` - Regular platform usage

---

## 🔐 Authentication & Security

- **Better Auth** integration for secure authentication
- **Session management** with secure tokens
- **OAuth providers** support (Google, GitHub, etc.)
- **Role-based access control** (user/admin)
- **Rate limiting** for API protection
- **Input validation** with Zod schemas

### Authentication Tables

- `session` - User session management
- `account` - OAuth account linking  
- `verification` - Email/phone verification
- `rate_limit` - API rate limiting

---

## 📊 Key Features

### For Senders
- ✅ Create delivery requests with detailed parcel info
- ✅ Set urgency levels and proposed fees
- ✅ Track delivery status in real-time
- ✅ Rate and review travelers
- ✅ Secure payment processing

### For Travelers  
- ✅ Share travel plans and earn money
- ✅ Browse and accept delivery requests
- ✅ Flexible pickup/delivery points
- ✅ Build reputation through ratings
- ✅ Earn green points and badges

### For Platform
- ✅ Community-driven trust system
- ✅ Environmental impact tracking
- ✅ Gamification with rewards
- ✅ Admin dashboard for management
- ✅ Analytics and reporting



*Building the future of sustainable logistics, one delivery at a time! 🌱*
