import Menggila from "../../components/_menggila.jsx";
import Loading from "../../components/Loading";
import { useMonthlyReport, useFullMonthsReport } from "../../hooks/useReport";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import useProfile from "../../hooks/useProfile.js";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const monthShortNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-primary-darker)',
  'var(--color-accent-darker)',
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#00ff00',
  '#ff00ff',
];

const tooltipStyle = {
  backgroundColor: "var(--color-primary-darker)",
  borderRadius: "6px",
  color: "var(--color-secondary)",
  padding: "8px",
  fontSize: "0.9rem",
};

const DashboardPage = () => {
  const { name } = useProfile();
  const currentMonth = new Date().getMonth() + 1;

  // Pie chart: current month only
  const { data: currentMonthData, isLoading: isPieLoading } = useMonthlyReport(currentMonth);

  // Bar/Line chart: all months
  const { data: fullMonthsData, isLoading: isBarLoading } = useFullMonthsReport();

  // Pie chart data
  const pieChartData = currentMonthData && currentMonthData.emotionsSummary
    ? Object.entries(currentMonthData.emotionsSummary)
        .filter(([key]) => key !== "totalyourmood")
        .map(([emotion, value]) => ({
          name: emotion,
          value: parseFloat(value) || 0,
        }))
        .filter(item => item.value > 0)
    : [];

  // Bar/Line chart data
  const lineChartData = Array.isArray(fullMonthsData)
    ? fullMonthsData.map((monthReport) => ({
        month: monthNames[monthReport.month - 1],
        monthShort: monthShortNames[monthReport.month - 1],
        mood: parseInt(monthReport.emotionsSummary?.totalyourmood) || 0,
        totalEntries: monthReport.totalEntries ?? 0,
      }))
    : [];

  const isLoading = isPieLoading || isBarLoading;

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
          <h2 className="text-lg mb-6">Halo {name}, welcome to your emotion journey</h2>
          
          {isLoading ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Current Month Emotion Breakdown</h2>
              <div className="flex justify-center items-center h-64">
                <Loading className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Monthly Mood Trends</h2>
              <div className="flex justify-center items-center h-64">
                <Loading className="text-primary" />
              </div>
            </>
          ) : (
            <>
              {/* Pie Chart for Current Month */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  {monthNames[currentMonth - 1]} Emotion Breakdown
                </h2>
                {pieChartData.length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="flex justify-center min-w-[400px]">
                      <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={tooltipStyle}
                            itemStyle={{ color: "var(--color-secondary)" }}
                            formatter={(value, name) => [`${value}`, name]}
                          />
                          <Legend 
                            wrapperStyle={{ 
                              color: "var(--color-primary-darker)",
                              fontSize: "14px"
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    No emotion data available for {monthNames[currentMonth - 1]}
                  </div>
                )}
              </div>
            
              {/* Line Chart */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Monthly Mood Trends</h2>
                <div className="overflow-x-auto">
                  <div className="min-w-[500px]">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData} margin={{ top: 20, right: 40, left: 20, bottom: 20 }}>
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
                          stroke="var(--color-accent)"
                          tick={{ fontSize: 12, fill: "var(--color-primary-darker)" }}
                        />
                        <Tooltip
                          contentStyle={tooltipStyle}
                          itemStyle={{ color: "var(--color-secondary)" }}
                          cursor={{ stroke: "var(--color-primary)", strokeWidth: 1 }}
                          labelFormatter={(label) => {
                            const idx = monthShortNames.indexOf(label);
                            return idx !== -1 ? monthNames[idx] : label;
                          }}
                          formatter={(value, name) => {
                            if (name === "Mood Rating") {
                              return [`${value}%`, name];
                            }
                            return [value, name];
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
              </div>
            </>
          )}
          <Menggila />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;