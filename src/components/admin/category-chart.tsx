import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CATEGORY_LABELS } from "@/features/feedback/schemas";
import { CHART_COLORS } from "@/features/dashboard/constants";
import type { Analytics } from "@/features/dashboard/types";

export function CategoryChart({ analytics }: { analytics: Analytics | null }) {
  const chartData =
    analytics?.categoryDistribution.filter((c) => c.count > 0) ?? [];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-sm font-semibold text-gray-900 mb-4">
        Category Distribution
      </h2>
      {chartData.length === 0 ? (
        <p className="text-sm text-gray-400 py-12 text-center">
          No feedback yet.
        </p>
      ) : (
       <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-48 h-48 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="category"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={2}
                >
                  {chartData.map((entry, i) => (
                    <Cell
                      key={entry.category}
                      fill={CHART_COLORS[i % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, _name, props) => [
                    `${value} (${props.payload.percentage}%)`,
                    CATEGORY_LABELS[props.payload.category] ||
                      props.payload.category,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:flex-1 space-y-2">
            {chartData.map((entry, i) => (
              <div
                key={entry.category}
               className="flex items-center justify-between text-sm max-w-[200px] mx-auto lg:max-w-none"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: CHART_COLORS[i % CHART_COLORS.length],
                    }}
                  />
                  <span className="text-gray-700">
                    {CATEGORY_LABELS[entry.category] || entry.category}
                  </span>
                </div>
                <span className="text-gray-500 font-medium">
                  {entry.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}