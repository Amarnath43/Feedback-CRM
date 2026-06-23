"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  createFeedbackSchema,
  type CreateFeedbackInput,
  CATEGORIES,
  CATEGORY_LABELS,
} from "@/features/feedback/schemas";

export default function HomePage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateFeedbackInput>({
    resolver: zodResolver(createFeedbackSchema),
    defaultValues: { category: undefined, comment: "", email: "" },
  });

  const commentValue = watch("comment") || "";

  async function onSubmit(data: CreateFeedbackInput) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setSubmitError(body?.error || "Something went wrong. Please try again.");
        return;
      }

      reset();
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please try again.");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            We value your feedback
          </h1>
          <p className="text-gray-500 mt-2">
            Help us improve by sharing your experience.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✓</div>
              <h2 className="text-xl font-semibold text-gray-800">
                Thank you for your feedback!
              </h2>
              <p className="text-gray-500 mt-2">
                Your feedback has been submitted successfully.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
              {/* Category */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  {...register("category")}
                  aria-invalid={!!errors.category}
                  defaultValue=""
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {CATEGORY_LABELS[cat]}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Comment */}
              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="comment"
                  {...register("comment")}
                  aria-invalid={!!errors.comment}
                  rows={5}
                  maxLength={2000}
                  placeholder="Share your thoughts, suggestions, or issues…"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <div className="flex justify-between mt-1">
                  {errors.comment && (
                    <p className="text-red-500 text-xs">
                      {errors.comment.message}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs ml-auto">
                    {commentValue.length}/2000
                  </p>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your email{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
                <p className="text-gray-400 text-xs mt-1">
                  We&apos;ll never share your email.
                </p>
              </div>

              {/* Submit error */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
                  {submitError}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
              >
                {isSubmitting ? "Submitting…" : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2026 Acowale. Built by Amarnath Goshika.
        </p>
      </div>
    </div>
  );
}