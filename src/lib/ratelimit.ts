import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./redis";

export const feedbackRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
});