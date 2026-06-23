import { CATEGORY_LABELS } from "@/features/feedback/schemas";
import { STATUS_LABELS, STATUS_STYLES } from "@/features/dashboard/constants";
import { formatDate } from "@/lib/format";
import type { FeedbackItem, Pagination } from "@/features/dashboard/types";

type Props = {
  feedback: FeedbackItem[];
  pagination: Pagination | null;
  loading: boolean;
  page: number;
  onPageChange: (updater: (p: number) => number) => void;
};

export function FeedbackTable({
  feedback,
  pagination,
  loading,
  page,
  onPageChange,
}: Props) {
  return (
    <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="text-left text-gray-500">
              <th className="px-6 py-3 font-medium">Comment</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  Loading…
                </td>
              </tr>
            ) : feedback.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No feedback matches your filters.
                </td>
              </tr>
            ) : (
              feedback.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-gray-800 truncate">{item.comment}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
                    {CATEGORY_LABELS[item.category] || item.category}
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {item.email || "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        STATUS_STYLES[item.status]
                      }`}
                    >
                      {STATUS_LABELS[item.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {formatDate(item.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages} ·{" "}
            {pagination.total} total
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                onPageChange((p) => Math.min(pagination.totalPages, p + 1))
              }
              disabled={page >= pagination.totalPages}
              className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </section>
  );
}