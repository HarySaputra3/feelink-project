import Menggila from "../../components/_menggila.jsx";
import { useMemo } from "react";
import { Link } from 'react-router-dom'
import Loading from "../../components/Loading";
import ProgressCircle from "../../components/ProgressCircle.jsx";
import { useMonthlyReport, useFullMonthsReport } from "../../hooks/useReport";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";
import { Plus } from "lucide-react";
import useProfile from "../../hooks/useProfile.js";
import { Heart, Zap, Angry, Frown, Ghost, Smile } from "lucide-react";
import useHistory from "../../hooks/useHistory";

const emotionIcons = {
  Cinta: <Heart className="text-primary" />,
  Terkejut: <Zap className="text-primary" />,
  Marah: <Angry className="text-primary" />,
  Sedih: <Frown className="text-primary" />,
  Takut: <Ghost className="text-primary" />,
  Gembira: <Smile className="text-primary" />,
};

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];
const monthShortNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Okt", "Nov", "Des",
];

const COLORS = [
  'var(--color-primary)',
  'var(--color-accent)',
  'var(--color-primary-darker)',
  'var(--color-accent-darker)',
  'var(--color-primary-lighter)',
  'var(--color-accent-lighter)',
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
  const { latestSummary } = useHistory();
  const currentMonth = new Date().getMonth() + 1;

  const { data: currentMonthData, isLoading: isPieLoading } = useMonthlyReport(currentMonth);
  const { data: fullMonthsData, isLoading: isBarLoading } = useFullMonthsReport();
  const isLoading = isPieLoading || isBarLoading;

  const pieChartData = useMemo(() => {
    if (!currentMonthData?.emotionsSummary) return [];
    return Object.entries(currentMonthData.emotionsSummary)
      .filter(([key]) => key !== "totalyourmood")
      .map(([emotion, value]) => ({
        name: emotion,
        value: parseFloat(value) || 0,
      }))
      .filter(item => item.value > 0);
  }, [currentMonthData]);

  const topThreeEmotions = useMemo(() =>
    [...pieChartData].sort((a, b) => b.value - a.value).slice(0, 3),
  [pieChartData]);

  const lineChartData = useMemo(() =>
    Array.isArray(fullMonthsData)
      ? fullMonthsData.map((monthReport) => ({
          month: monthNames[monthReport.month - 1],
          monthShort: monthShortNames[monthReport.month - 1],
          mood: parseInt(monthReport.emotionsSummary?.totalyourmood) || 0,
          totalEntries: monthReport.totalEntries ?? 0,
        }))
      : [],
  [fullMonthsData]);

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2 flex flex-col lg:flex-row lg:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold">Selamat datang, {name || "user"}!</h1>
          <p className="text-accent-darker text-lg">Lacak perjalanan suasana hatimu dan temukan wawasan untuk mendukung kesejahteraanmu.</p>
        </div>
        <div>
          <Link
            to="/story"
            className="bg-primary text-secondary px-4 py-4 rounded inline-flex items-center gap-2 whitespace-nowrap h-max w-max"
          >
            <Plus /> Cerita Baru
          </Link>
        </div>
      </header>

      <main className="max-w-7xl text-primary flex flex-col items-center mx-auto">
        <div className="py-6 sm:p-6 md:p-12 w-full" style={{ backgroundColor: "var(--color-secondary-lighter)" }}>
          {isLoading ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Ringkasan Suasana Hatimu Bulan Ini</h2>
              <div className="flex justify-center items-center h-64">
                <Loading className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Tren Suasana Hatimu Sepanjang Tahun</h2>
              <div className="flex justify-center items-center h-64">
                <Loading className="text-primary" />
              </div>
            </>
          ) : (
            <>
              <div className="mb-8 grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="col-span-2 rounded border border-accent-darker px-6 py-4">
                  <div className="flex justify-between flex-wrap gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-semibold">Ringkasan Suasana Hatimu Bulan Ini</h2>
                      <p className="text-sm text-accent-darker">Suasana hati yang paling sering kamu rasakan bulan ini</p>
                    </div>
                    <div className="bg-accent border border-accent-darker h-max px-4 py-1 rounded-4xl">{monthNames[currentMonth - 1]}</div>
                  </div>

                  {topThreeEmotions.length > 0 && (
                    <div className="flex flex-col md:flex-row gap-4 mb-4">
                      {topThreeEmotions.map(({ name, value }) => (
                        <div key={name} className="flex flex-col w-full items-center gap-2 p-2 rounded border border-accent-darker">
                          {emotionIcons[name] || <span className="text-primary">❓</span>}
                          <span className="font-medium">{name}</span>
                          <span className="text-sm text-accent-darker">({value})</span>
                        </div>
                      ))}
                    </div>
                  )}

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
                            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-neutral-500">
                      Belum ada data suasana hatimu untuk bulan {monthNames[currentMonth - 1]}
                    </div>
                  )}
                </div>

                {/* Mood Score */}
                <div className="flex flex-col rounded border border-accent-darker px-6 py-4 col-span-2 lg:col-span-1">
                  <div className="mb-4">
                    <h2 className="text-2xl font-semibold">Skor Suasana Hatimu Saat Ini</h2>
                    <p className="text-sm text-accent-darker">Dihitung dari beberapa cerita terakhirmu</p>
                  </div>
                  <div className="overflow-x-auto mb-8">
                    <ProgressCircle percentage={parseFloat(latestSummary?.yourmoodtotal) || 0} />
                  </div>
                  <Link 
                    to="/history"
                    className="block w-full text-center rounded border border-secondary-darker hover:bg-secondary-darker active:bg-secondary-darker py-1 mb-4"
                  >
                    Lihat Riwayat
                  </Link>
                  <Menggila />
                </div>
              </div>

              {/* Line Chart */}
              <div className="mb-8 rounded border border-accent-darker px-6 py-4">
                <div>
                  <h2 className="text-2xl font-semibold">Tren Suasana Hatimu Sepanjang Tahun</h2>
                  <p className="text-sm text-accent-darker">Bandingkan perkembangan suasana hatimu dari bulan ke bulan</p>
                </div>
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
                            value: "Mood Score (%)",
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
                            value: "Total Stories",
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
                            if (name === "Mood Score") {
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
                          name="Mood Score"
                          dot={{ r: 4, stroke: "var(--color-primary-darker)", strokeWidth: 1 }}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="totalEntries"
                          stroke="var(--color-accent)"
                          strokeWidth={2}
                          name="Total Stories"
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
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
