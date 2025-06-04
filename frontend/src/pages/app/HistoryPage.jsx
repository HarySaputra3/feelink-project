import { useState } from "react";
import useHistory from "../../hooks/useHistory";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { NotebookText } from "lucide-react";

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [modalEntry, setModalEntry] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);

  const { history, loading } = useHistory();

  const pagedHistory = history.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil((history.length || 1) / pageSize);

  const handleOpenModal = (entry, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setModalOrigin({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
    setModalEntry(entry);
  };

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">This history okay, yu see yu prob prob hsty here</h1>
      </header>
      <main className="max-w-7xl text-primary overflow-x-auto">
        <div className="py-6 sm:p-6 md:p-12 w-full">
          <table className="min-w-max w-full mb-4">
            <thead>
              <tr>
                <th className="border-b px-4 py-4 text-center">No</th>
                <th className="border-b px-4 py-4 text-center">Date</th>
                <th className="border-b px-4 py-4 text-center">Mood Rating</th>
                <th className="border-b px-4 py-4 text-center">Details</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <Loading />
                  </td>
                </tr>
              ) : pagedHistory.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">No history found.</td>
                </tr>
              ) : (
                pagedHistory.map((entry, idx) => (
                  <tr key={entry.id || idx}>
                    <td className="border-y px-4 py-4 text-center">{(page - 1) * pageSize + idx + 1}</td>
                    <td className="border-y px-4 py-4 text-center">
                      {entry.date
                        ? new Date(entry.date).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="border-y px-4 py-4 text-center">{entry.moodRating || "-"}</td>
                    <td className="border-y px-4 py-4 text-center">
                      <button
                        className="bg-primary text-secondary px-4 py-2 rounded cursor-pointer"
                        onClick={e => handleOpenModal(entry, e)}
                      >
                        <NotebookText size={18} />
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
      <Modal open={!!modalEntry} onClose={() => setModalEntry(null)} origin={modalOrigin}>
        {modalEntry && (
          <div>
            <h2 className="text-3xl font-bold mb-3">Entry Details</h2>
            <div className="mb-2">
              <span className="font-semibold">Date: </span>
              {modalEntry.date
                ? new Date(modalEntry.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Mood Rating: </span>
              {modalEntry.moodRating || "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Answers: </span>
              <pre className="whitespace-pre-wrap break-words bg-primary-darker rounded p-2 mt-1">
                {modalEntry.story || "-"}
              </pre>
            </div>
            {modalEntry.emotions && (
              <div className="mb-2">
                <span className="font-semibold">Emotions: </span>
                <pre className="whitespace-pre-wrap break-words bg-primary-darker rounded p-2 mt-1">
                  {JSON.stringify(modalEntry.emotions, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </Modal>
    </>
  );
};

export default HistoryPage;