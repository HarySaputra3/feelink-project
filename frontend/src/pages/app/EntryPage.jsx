import useEntry from "../../hooks/useEntry";
import Loading from "../../components/Loading";

const questions = [
  "How are you feeling today?",
  "What made you smile recently?",
  "Is there anything worrying you?",
  "What are you grateful for today?",
  "What is one thing you want to improve?",
];

const EntryPage = () => {
  const { answers, handleChange, handleSubmit, loading } = useEntry();

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2">
        <h1 className="text-4xl">This entry okay, yu entry yu prob prob here</h1>
      </header>
      <main className="max-w-7xl text-primary overflow-x-auto">
        <form className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full" onSubmit={handleSubmit}>
          {questions.map((q, idx) => (
            <label key={idx}>
              <h2 className="text-lg font-medium">{`Question ${idx + 1}`}</h2>
              <p className="my-2">{q}</p>
              <input
                className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500"
                type="text"
                placeholder="Type here"
                value={answers[idx]}
                onChange={(e) => handleChange(idx, e.target.value)}
                disabled={loading}
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
            {loading ? <Loading /> : "Entry your answers"}
          </button>
        </form>
      </main>
    </>
  );
};

export default EntryPage;