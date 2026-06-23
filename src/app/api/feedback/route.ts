import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createFeedbackSchema } from "@/features/feedback/schemas";
import { z } from "zod";

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