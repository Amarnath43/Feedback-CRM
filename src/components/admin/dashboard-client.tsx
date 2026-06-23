"use client";

import { signOut } from "next-auth/react";
import { useDashboard } from "@/features/dashboard/use-dashboard";
import { StatCards } from "./stat-cards";
import { CategoryChart } from "./category-chart";
import { RecentSubmissions } from "./recent-submissions";
import { FeedbackFilters } from "./feedback-filters";
import { FeedbackTable } from "./feedback-table";
import type { FeedbackItem } from "@/features/dashboard/types"; 


export function DashboardClient() {
  const {
    analytics,
    feedback,
    pagination,
    loading,
    filters,
    setSearch,
    setCategory,
    setStatus,
    setPage,
    setFeedback,
    fetchAnalytics
  } = useDashboard();

 const updateStatus = async (
  id: string,
  status: FeedbackItem["status"]
) => {
  try {
    const res = await fetch(
      `/api/feedback/${id}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    setFeedback((prev) => {

  return prev.map((item) =>
    item.id === id
      ? { ...item, status }
      : item
  );
});

    await fetchAnalytics();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Acowale Feedback
            </h1>
            <p className="text-xs text-gray-500">Admin Dashboard</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Section 1 — Stat cards */}
        <StatCards analytics={analytics} />

        {/* Section 2 — Chart + Recent */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CategoryChart analytics={analytics} />
          <RecentSubmissions analytics={analytics} />
        </section>

        {/* Section 3 — Filters */}
        <FeedbackFilters
          search={filters.search}
          category={filters.category}
          status={filters.status}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onStatusChange={setStatus}
        />

        {/* Section 4 + 5 — Table + Pagination */}
        <FeedbackTable
          feedback={feedback}
          pagination={pagination}
          loading={loading}
          page={filters.page}
          onPageChange={setPage}
           updateStatus={updateStatus}
        />
      </main>
    </div>
  );
}