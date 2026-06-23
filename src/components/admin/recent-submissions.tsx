import { CATEGORY_LABELS } from "@/features/feedback/schemas";
import { STATUS_LABELS, STATUS_STYLES } from "@/features/dashboard/constants";
import { formatDate } from "@/lib/format";
import type { Analytics } from "@/features/dashboard/types";

export function RecentSubmissions({
  analytics,
}: {
  analytics: Analytics | null;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">
        Recent Submissions
      </h2>
      {!analytics || analytics.recent.length === 0 ? (
        <p className="text-sm text-gray-400 py-12 text-center">
          No submissions yet.
        </p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {analytics.recent.map((item) => (
            <li key={item.id} className="py-3 flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">{item.comment}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {CATEGORY_LABELS[item.category] || item.category} ·{" "}
                  {formatDate(item.createdAt)}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${
                  STATUS_STYLES[item.status]
                }`}
              >
                {STATUS_LABELS[item.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}