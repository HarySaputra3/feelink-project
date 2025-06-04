import { useState } from "react";
import useHistory from "../../hooks/useHistory";

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const { history, loading } = useHistory();

  const pagedHistory = history.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil((history.length || 1) / pageSize);

  return (
    <>
      <header className="text-primary p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">This history okay, yu see yu prob prob hsty here</h1>
      </header>
      <main className="max-w-7xl text-primary">
        <div className="p-6 md:p-12 w-full">
          <table className="w-full border mb-4">
            <thead>
              <tr>
                <th className="border px-2 py-1 text-center">No</th>
                <th className="border px-2 py-1 text-center">Date</th>
                <th className="border px-2 py-1 text-center">Mood Rating</th>
                <th className="border px-2 py-1 text-center">Answers</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">Loading...</td>
                </tr>
              ) : pagedHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No history found.</td>
                </tr>
              ) : (
                pagedHistory.map((entry, idx) => (
                  <tr key={entry.id || idx}>
                    <td className="border px-2 py-1 text-center">{(page - 1) * pageSize + idx + 1}</td>
                    <td className="border px-2 py-1 text-center">
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="border px-2 py-1 text-center">{entry.moodRating || "-"}</td>
                    <td className="border px-2 py-1 text-center">
                      <button className="bg-primary text-secondary px-4 py-1 rounded">
                        See your answers
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button
              className="px-2"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-2 rounded ${page === i + 1 ? "bg-primary text-secondary" : ""}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-2"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HistoryPage;