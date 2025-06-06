import { useState } from "react";
import useHistory from "../../hooks/useHistory";
import useDebounce from "../../hooks/useDebounce";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";
import { NotebookText, Search } from "lucide-react";

const HistoryPage = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [modalEntry, setModalEntry] = useState(null);
  const [modalOrigin, setModalOrigin] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const {
    loading,
    filteredMoods,
    totalPages,
    latestSummary,
    // getDominantEmotion,
  } = useHistory(page, pageSize, debouncedSearch);

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
        <h1 className="text-4xl">
          This history okay, yu see yu prob prob hsty here
        </h1>
      </header>
      <main className="max-w-7xl text-primary">
        <div className="py-6 sm:p-6 md:p-12 w-full">

          {/* Upper table */}
          <div className="mb-4 flex justify-between items-center gap-4 flex-wrap sm:flex-nowrap">
            <span className="text-center md:text-right md:whitespace-nowrap font-medium text-lg border-x-2 px-4">
              Your Latest Overall Mood Rating: {latestSummary?.yourmoodtotal ?? "-"}
            </span>
            <div className="relative flex-grow max-w-full sm:max-w-xs">
              <span className="absolute inset-y-0 right-0 flex items-center p-3 bg-primary text-secondary rounded-r-3xl">
                <Search size={18} />
              </span>
              <input
                type="text"
                className="border-2 rounded-3xl px-3 py-2 w-full bg-neutral-50 placeholder-neutral-500 outline-none focus:ring focus:ring-primary pr-10"
                placeholder="Search by story or date..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* History table */}
          <div className="overflow-x-auto">
            <table className="min-w-max w-full">
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
                      <Loading className="text-primary"/>
                    </td>
                  </tr>
                ) : filteredMoods.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4 text-neutral-500">
                      No history found
                    </td>
                  </tr>
                ) : (
                  filteredMoods.map((entry, idx) => (
                    <tr key={entry.id || idx}>
                      <td className="border-y px-4 py-4 text-center">
                        {(page - 1) * pageSize + idx + 1}
                      </td>
                      <td className="border-y px-4 py-4 text-center">
                        {entry.createdAt
                          ? new Date(entry.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                      <td className="border-y px-4 py-4 text-center">
                        {entry.emotions?.totalyourmood ?? "-"}
                      </td>
                      <td className="border-y px-4 py-4 text-center">
                        <button
                          className="bg-primary text-secondary px-4 py-2 rounded cursor-pointer"
                          onClick={(e) => handleOpenModal(entry, e)}
                        >
                          <NotebookText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-4">
            <button
              className={`px-2 ${
                page === 1
                  ? "cursor-not-allowed text-neutral-500"
                  : "cursor-pointer"
              }`}
              disabled={page === 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-2 rounded ${
                  page === i + 1
                    ? "bg-primary text-secondary"
                    : "cursor-pointer"
                }`}
                disabled={loading}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className={`px-2 ${
                page === totalPages
                  ? "cursor-not-allowed text-neutral-500"
                  : "cursor-pointer"
              }`}
              disabled={page === totalPages || loading}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              {">"}
            </button>
          </div>
        </div>
      </main>

      {/* Entry details */}
      <Modal open={!!modalEntry} onClose={() => setModalEntry(null)} origin={modalOrigin}>
        {modalEntry && (
          <div>
            <h2 className="text-3xl font-bold mb-3">Entry Details</h2>
            <div className="mb-2">
              <span className="font-semibold">Date: </span>
              {modalEntry.createdAt
                ? new Date(modalEntry.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Mood Rating: </span>
              {modalEntry.emotions?.totalyourmood ?? "-"}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Stories: </span>
              <pre className="whitespace-pre-wrap break-words bg-primary-darker rounded p-2 mt-1">
                {modalEntry.story
                  ? (() => {
                      let count = 0;
                      const cleaned = modalEntry.story.replace(/"\s+"/g, '""');
                      return cleaned.split("").map((char, idx) => {
                        if (char === '"') count++;
                        return (
                          <span key={idx}>
                            {char}
                            {char === '"' && count % 2 === 0 ? <br /> : null}
                          </span>
                        );
                      });
                    })()
                  : "-"}
              </pre>
            </div>
            {modalEntry.emotions && (
              <div className="mb-2">
                <span className="font-semibold">Emotions: </span>
                <pre className="whitespace-pre-wrap break-words bg-primary-darker rounded p-2 mt-1">
                  {Object.entries(modalEntry.emotions)
                    .filter(([key]) => key !== "totalyourmood")
                    .map(([key, value]) => `${key}: ${value}%`)
                    .join("\n") || "-"}
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