import type { Analytics } from "@/features/dashboard/types";

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={`text-2xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}

export function StatCards({ analytics }: { analytics: Analytics | null }) {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        label="Total Feedback"
        value={analytics?.total ?? "—"}
        accent="text-gray-900"
      />
      <StatCard
        label="Open"
        value={analytics?.byStatus.OPEN ?? "—"}
        accent="text-amber-600"
      />
      <StatCard
        label="In Progress"
        value={analytics?.byStatus.IN_PROGRESS ?? "—"}
        accent="text-blue-600"
      />
      <StatCard
        label="Resolved"
        value={analytics?.byStatus.RESOLVED ?? "—"}
        accent="text-green-600"
      />
    </section>
  );
}