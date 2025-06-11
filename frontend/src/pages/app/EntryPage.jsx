import useEntry from "../../hooks/useEntry";
import Loading from "../../components/Loading";

const questions = [
  "Bagaimana perasaanmu hari ini?",
  "Apakah ada hal yang mengganggumu akhir-akhir ini?",
  "Kalau perasaanmu bisa bicara, kira-kira apa yang ingin mereka sampaikan?",
  "Apa hal kecil yang membuatmu merasa lebih baik hari ini?",
  "Apa yang sedang kamu butuhkan, tapi sulit diungkapkan dengan kata-kata?"
];

const EntryPage = () => {
  const { answers, handleChange, handleSubmit, loading } = useEntry();

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2 flex justify-between">
        <h1 className="text-4xl font-semibold">Tulis apa yang kamu rasakan, pikirkan, atau butuhkan hari ini</h1>
      </header>
      <main className="max-w-7xl text-primary flex flex-col items-center mx-auto">
        <form className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full" onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <label key={idx}>
              <h2 className="text-lg font-semibold">{`Question ${idx + 1}`}</h2>
              <p className="mb-2">{q}</p>
              <input
                className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                type="text"
                placeholder="Type here"
                value={answers[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                disabled={loading}
                autoFocus={idx === 0}
              />
            </label>
          ))}
          <button
            type="submit"
            className={`px-3 py-2 mt-2 rounded ${
              loading ? "bg-primary-lighter cursor-not-allowed" : "bg-primary cursor-pointer"
            } text-secondary`}
            disabled={loading}
          >
            {loading ? <Loading /> : "Ceritain harimu, yuk!"}
          </button>
        </form>
      </main>
    </>
  );
};

export default EntryPage;