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
        {/* Mobile Cards */}
        <div className="md:hidden p-4 space-y-3">
          {loading ? (
            <div className="py-8 text-center text-gray-400">Loading...</div>
          ) : feedback.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              No feedback matches your filters.
            </div>
          ) : (
            feedback.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="font-medium text-gray-900 break-words">
                    {item.comment}
                  </p>

                  <span
                    className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[item.status]
                      }`}
                  >
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>

                <div className="mt-3 space-y-1 text-sm text-gray-500">
                  <p>
                    <span className="font-medium text-gray-700">Category:</span>{" "}
                    {CATEGORY_LABELS[item.category] || item.category}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Email:</span>{" "}
                    {item.email || "—"}
                  </p>

                  <p>
                    <span className="font-medium text-gray-700">Date:</span>{" "}
                    {formatDate(item.createdAt)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
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
                    Loading...
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
                      <p className="truncate text-gray-800">{item.comment}</p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {CATEGORY_LABELS[item.category] || item.category}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {item.email || "—"}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[item.status]
                          }`}
                      >
                        {STATUS_LABELS[item.status]}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {formatDate(item.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-4 md:px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center sm:text-left">
            Page {pagination.page} of {pagination.totalPages} · {pagination.total} total
          </p>

          <div className="flex justify-center gap-2">
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