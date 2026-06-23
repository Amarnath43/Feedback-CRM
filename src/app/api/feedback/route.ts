import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createFeedbackSchema } from "@/features/feedback/schemas";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { Prisma } from "@prisma/client";
import { feedbackRateLimit } from "@/lib/ratelimit";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate input
    const parsed = createFeedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: z.flattenError(parsed.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    // Check rate limit
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : "anonymous";

    const rateLimit = await feedbackRateLimit.limit(`feedback:${ip}`);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    

    const { category, comment, email } = parsed.data;

    // Save to DB
    const feedback = await prisma.feedback.create({
      data: {
        category,
        comment,
        email: email || null,
      },
      select: {
        id: true,
        category: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { message: "Feedback submitted successfully", data: feedback },
      { status: 201 }
    );
  } catch (error) {
    console.error("Feedback submission error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}


export async function GET(req: Request) {
  // Protect — admin only
  const guard = await requireAdmin();
  if (!guard.ok) return guard.response;

  try {
    const { searchParams } = new URL(req.url);

    // Pagination
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(
      50,
      Math.max(1, parseInt(searchParams.get("limit") || "10", 10))
    );
    const skip = (page - 1) * limit;

    // Filters
    const category = searchParams.get("category");
    const status = searchParams.get("status");
    const search = searchParams.get("search")?.trim();

    // Build where clause
    const where: Prisma.FeedbackWhereInput = {};

    if (category && category !== "ALL") {
      where.category = category as Prisma.FeedbackWhereInput["category"];
    }
    if (status && status !== "ALL") {
      where.status = status as Prisma.FeedbackWhereInput["status"];
    }
    if (search) {
      where.comment = { contains: search, mode: "insensitive" };
    }

    // Fetch data + total count in parallel
    const [feedback, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.feedback.count({ where }),
    ]);

    return NextResponse.json({
      data: feedback,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch feedback error:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );
  }
}