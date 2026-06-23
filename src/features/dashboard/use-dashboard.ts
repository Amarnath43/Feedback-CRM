"use client";

import { useEffect, useState, useCallback } from "react";
import type { Analytics, FeedbackItem, Pagination } from "./types";

export function useDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [status, setStatus] = useState("ALL");
  const [page, setPage] = useState(1);

  // Analytics — fetched once
  useEffect(() => {
    fetch("/api/analytics/summary")
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(setAnalytics)
      .catch(() => setAnalytics(null));
  }, []);

  // Feedback — re-fetched on filter/page change
  const fetchFeedback = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: "10",
      category,
      status,
    });
    if (search.trim()) params.set("search", search.trim());

    try {
      const res = await fetch(`/api/feedback?${params}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      setFeedback(data.data || []);
      setPagination(data.pagination || null);
    } catch {
      setFeedback([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [page, category, status, search]);

  // Debounce search; immediate for other filters
  useEffect(() => {
    const t = setTimeout(fetchFeedback, search ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchFeedback, search]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [search, category, status]);

  return {
    analytics,
    feedback,
    pagination,
    loading,
    filters: { search, category, status, page },
    setSearch,
    setCategory,
    setStatus,
    setPage,
  };
}