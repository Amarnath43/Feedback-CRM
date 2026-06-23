# DECISIONS.md

## Why This Tech Stack?

### Next.js 16

I chose Next.js because it allowed me to build both the frontend and backend in a single codebase. This reduced setup complexity and helped me move quickly while keeping the project organized.

### PostgreSQL + Prisma

The application requires filtering, pagination, and analytics, which are areas where relational databases perform well. PostgreSQL provides strong querying capabilities, while Prisma adds type safety and improves developer productivity.

### Auth.js

Auth.js integrates naturally with Next.js and provides a straightforward way to implement secure authentication and session management.

### Upstash Redis

I used Upstash Redis for rate limiting to protect the public feedback endpoint from abuse. It works well with serverless deployments and requires minimal infrastructure management.

---

## Architecture Decisions

I organized the code using a feature-based structure:


```text
features/
├── analytics
├── dashboard
└── feedback
```

This keeps related logic together and makes the codebase easier to maintain as features grow.

I also separated responsibilities across:

```text
app/         -> routes and API handlers
components/  -> UI components
features/    -> business logic
lib/         -> shared utilities
```

For route protection, I chose page-level authentication instead of middleware because the application only contains a small set of protected admin pages, making the simpler solution sufficient.

---

## Trade-offs

To keep the project focused and deliverable within the available time, I prioritized simplicity over advanced scalability.

Examples:

* Single admin role
* Analytics calculated on demand
* No background jobs
* No caching layer

These choices reduced complexity while meeting all requirements.

---

## What Would Break at Scale?

The first bottleneck would likely be analytics queries as the amount of feedback grows significantly.

Other areas that would need improvement:

* Offset-based pagination
* Single database instance
* Lack of caching

Potential solutions would include Redis caching, cursor-based pagination, and read replicas.

---

## How Would I Improve It?

Given more time, I would add:

* Multi-admin support with roles and permissions
* Audit logs for status changes
* Email notifications
* Advanced analytics and reporting
* Redis caching for dashboard data

---

## AI Usage

AI was used extensively throughout development (approximately 80–90%).

It helped with:

* Initial scaffolding
* Exploring implementation approaches
* Debugging issues
* Reviewing code
* Improving documentation

All generated code was reviewed, tested, and adapted before being integrated into the project.

---

## Key Takeaway

My focus was to build a clean, maintainable, and production-ready application rather than over-engineering the solution. The architecture favors simplicity and clarity while leaving room for future growth.
