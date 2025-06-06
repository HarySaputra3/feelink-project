import Menggila from "../../components/_menggila.jsx";
import useMonthlyReport from "../../hooks/useMonthlyReport";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const months = Array.from({ length: 12 }, (_, i) => i + 1);
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const monthShortNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const DashboardPage = () => {
  const reportQueries = months.map((month) => useMonthlyReport(month));

  const chartData = months.map((month, idx) => {
    const data = reportQueries[idx].data;
    return {
      month: monthNames[month - 1],         // full month name for tooltip
      monthShort: monthShortNames[month - 1], // short month name for x-axis ticks
      mood: data?.emotionsSummary?.yourmoodtotal || 0,
      totalEntries: data?.totalEntries ?? 0,
    };
  });

  const tooltipStyle = {
    backgroundColor: "var(--color-primary-darker)",
    borderRadius: "6px",
    color: "var(--color-secondary)",
    padding: "8px",
    fontSize: "0.9rem",
  };

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">This dashboard okay, yu see yu prob prob here</h1>
      </header>
      <main className="max-w-7xl text-primary">
        <div
          className="py-6 sm:p-6 md:p-12 w-full"
          style={{ backgroundColor: "var(--color-secondary-lighter)" }}
        >
          <p className="text-lg mb-6">Welcome to your dashboard!</p>
          <div className="overflow-x-auto">
            <div className="min-w-[500px]">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
                  <CartesianGrid stroke="var(--color-primary-lighter)" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="monthShort"
                    stroke="var(--color-primary)"
                    tick={{ fontSize: 12, fill: "var(--color-primary-darker)" }}
                  />
                  <YAxis
                    yAxisId="left"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    label={{
                      value: "Mood Rating (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "var(--color-primary-darker)",
                      style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
                    }}
                    stroke="var(--color-primary)"
                    tick={{ fontSize: 12, fill: "var(--color-primary-darker)" }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                      value: "Total Entries",
                      angle: -90,
                      position: "insideRight",
                      fill: "var(--color-primary-darker)",
                      style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
                    }}
                    stroke="var(--color-accent)"  // <-- changed here
                    tick={{ fontSize: 12, fill: "var(--color-primary-darker)" }}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    itemStyle={{ color: "var(--color-secondary)" }}
                    cursor={{ stroke: "var(--color-primary)", strokeWidth: 1 }}
                    // Show full month name in tooltip label
                    labelFormatter={(label) => {
                      // find full month name from short name
                      const idx = monthShortNames.indexOf(label);
                      return idx !== -1 ? monthNames[idx] : label;
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="mood"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    name="Mood Rating"
                    dot={{ r: 4, stroke: "var(--color-primary-darker)", strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="totalEntries"
                    stroke="var(--color-accent)"
                    strokeWidth={2}
                    name="Total Entries"
                    dot={{ r: 4, stroke: "var(--color-accent-darker)", strokeWidth: 1 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Menggila />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
