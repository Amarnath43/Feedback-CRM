# Acowale Feedback CRM

A full-stack feedback collection and management platform that enables users to submit feedback and administrators to analyze, filter, and manage submissions through a secure dashboard.

## Live Demo

**Application:** https://feedback-crm-chi.vercel.app/

### Demo Credentials

```text
Email: admin@acowale-test.com
Password: Admin@123456
```

---

## Features

### Public Feedback Portal

* Submit feedback with category selection
* Optional email field
* Client-side and server-side validation using Zod
* Rate limiting using Upstash Redis

### Admin Dashboard

* Secure authentication with Auth.js
* View all feedback submissions
* Search feedback by comment
* Filter by category
* Filter by status
* Pagination support
* Update feedback status

  * Open
  * In Progress
  * Resolved

### Analytics

* Total Feedback Count
* Open Feedback Count
* In Progress Feedback Count
* Resolved Feedback Count
* Category Distribution Chart
* Recent Submissions Overview

### Security

* Protected admin routes
* Auth.js JWT-based authentication
* Server-side authorization checks
* Input validation with Zod
* Rate limiting using Upstash Redis

### Platform Features

* Responsive mobile-first dashboard
* PostgreSQL database
* Prisma ORM
* Health Check Endpoint
* Production deployment on Vercel

---

## Screenshots

### Feedback Form

![Feedback Form](public/screenshots/feedback-form.png)

### Admin Dashboard

![Admin Dashboard](public/screenshots/dashboard.png)

### Feedback Management

![Feedback Management](public/screenshots/feedback-table.png)

---

## Tech Stack

### Frontend

* Next.js 16
* React
* TypeScript
* React Hook Form
* Recharts
* Tailwind CSS

### Backend

* Next.js Route Handlers
* Auth.js
* Prisma ORM

### Database

* PostgreSQL

### Validation

* Zod

### Rate Limiting

* Upstash Redis

### Deployment

* Vercel

---

## Architecture

The application follows a feature-based architecture with clear separation of concerns.

* `app/` contains routes, pages, and API handlers
* `features/` contains domain-specific business logic
* `components/` contains reusable UI components
* `lib/` contains shared infrastructure and utilities
* `prisma/` contains database schema and seed scripts

Authentication is handled using Auth.js with JWT sessions. Database access is managed through Prisma ORM, while Upstash Redis provides rate limiting for public-facing APIs.

---

## Project Structure

```text
src
├── app
│   ├── admin
│   │   ├── dashboard
│   │   └── login
│   └── api
│       ├── analytics
│       ├── auth
│       ├── feedback
│       └── health
│
├── components
│   └── admin
│
├── features
│   ├── analytics
│   ├── dashboard
│   └── feedback
│
├── lib
│   ├── auth
│   ├── prisma
│   ├── ratelimit
│   └── redis
│
└── types
```

---

## API Endpoints

### Feedback

```http
POST /api/feedback
```

Submit feedback.

```http
GET /api/feedback
```

Retrieve feedback submissions (admin only).

```http
PATCH /api/feedback/:id/status
```

Update feedback status (admin only).

### Analytics

```http
GET /api/analytics/summary
```

Retrieve dashboard analytics.

### Health

```http
GET /api/health
```

Application health status.

---

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=

SEED_ADMIN_EMAIL=
SEED_ADMIN_PASSWORD=

AUTH_SECRET=
AUTH_TRUST_HOST=true

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

Generate a secure value for `AUTH_SECRET`:

```sh
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## Installation

Clone the repository:

```sh
git clone https://github.com/Amarnath43/Feedback-CRM.git
```

Move into the project:

```sh
cd Feedback-CRM
```

Install dependencies:

```sh
npm install
```

---

## Database Setup

Run migrations:

```sh
npx prisma migrate deploy
```

Generate Prisma Client:

```sh
npx prisma generate
```

Seed the admin user:

```sh
npm run seed
```

---

## Running Locally

Start the development server:

```sh
npm run dev
```

Application URL:

```text
http://localhost:3000
```

---

## Deployment

The application is deployed on Vercel.

Deployment URL:

```text
https://feedback-crm-chi.vercel.app/
```

---

## Health Check

Health endpoint:

```http
GET /api/health
```

Used for deployment verification and application monitoring.

---

## Future Improvements

* Multi-admin support and role-based access control
* Email notifications for new feedback
* Export feedback as CSV
* Audit history for status changes
* Advanced analytics and reporting

---

## Author

**Amarnath Goshika**

GitHub: https://github.com/Amarnath43

---

## License

This project was built as part of the Acowale Full Stack Developer Machine Test.
