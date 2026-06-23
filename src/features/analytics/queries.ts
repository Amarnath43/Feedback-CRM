import { prisma } from "@/lib/prisma";
import { CATEGORIES } from "@/features/feedback/schemas";

export async function getAnalyticsSummary() {
  const [total, statusCounts, categoryCounts, recent] = await Promise.all([
    prisma.feedback.count(),

    prisma.feedback.groupBy({
      by: ["status"],
      _count: { _all: true },
    }),

    prisma.feedback.groupBy({
      by: ["category"],
      _count: { _all: true },
    }),

    prisma.feedback.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        category: true,
        comment: true,
        email: true,
        status: true,
        createdAt: true,
      },
    }),
  ]);

  // Always return all 3 statuses, even if count is 0
  const byStatus = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 };
  for (const row of statusCounts) {
    byStatus[row.status] = row._count._all;
  }

  // Always return all 6 categories, even if count is 0
  const categoryMap = new Map(
    categoryCounts.map((row) => [row.category, row._count._all])
  );
  const categoryDistribution = CATEGORIES.map((cat) => {
    const count = categoryMap.get(cat) ?? 0;
    return {
      category: cat,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    };
  });

  return { total, byStatus, categoryDistribution, recent };
}