# TEACH_US.md

## What I Learned

This project gave me hands-on experience building and deploying a complete full-stack application within a limited timeframe.

The areas where I learned the most were:

* Auth.js authentication and route protection
* Upstash Redis for rate limiting
* Health checks and production readiness
* Deploying and debugging applications on Vercel

I also gained a better appreciation for project structure and how organizing code by features improves maintainability as an application grows.

---

## Challenges I Faced

The most challenging part was authentication and route protection.

I initially implemented middleware-based protection but later switched to page-level authentication. Since the application only has a small number of protected admin pages, the page-level approach was simpler and easier to maintain while still meeting the requirements.

Another challenge was keeping the dashboard state synchronized. When feedback status changed, I wanted both the table and analytics to update immediately without requiring a page refresh.

---

## Features I'm Most Proud Of

* Analytics dashboard with status metrics and category distribution
* Feedback status management workflow
* Feature-based project architecture
* Responsive admin dashboard

---

## How I Used AI

AI was used extensively throughout development (approximately 80–90%).

It helped with:

* Exploring implementation approaches
* Generating initial scaffolding
* Debugging issues
* Reviewing architecture decisions
* Improving documentation

All generated code was reviewed, tested, and adapted before being integrated into the project.

---

## What I Would Build Next

If this project evolved further, I would prioritize:

* Audit logs for tracking status changes and admin actions
* Email notifications for feedback submissions and updates

---

## Final Thoughts

The biggest takeaway from this project was learning how to balance speed, simplicity, and maintainability. My goal was to build a clean, production-ready solution that satisfies the requirements without over-engineering the implementation.
