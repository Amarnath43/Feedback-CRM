import { z } from "zod";

export const CATEGORIES = [
    "PRODUCT",
    "FEATURE_REQUEST",
    "UI_UX",
    "SUPPORT",
    "BILLING",
    "OTHER",
] as const;

export const CATEGORY_LABELS: Record<string, string> = {
    PRODUCT: "Product",
    FEATURE_REQUEST: "Feature Request",
    UI_UX: "UI/UX",
    SUPPORT: "Support",
    BILLING: "Billing",
    OTHER: "Other",
};

export const createFeedbackSchema = z.object({
    category: z.enum(CATEGORIES),
    comment: z
        .string()
        .trim()
        .min(5, "Comment must be at least 5 characters")
        .max(2000, "Comment must be under 2000 characters"),
    email: z
        .union([
            z.string().transform((s) => s.trim()).pipe(z.email("Please enter a valid email")),
            z.literal(""),
        ])
        .optional(),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;