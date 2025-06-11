import { useState } from "react";
import useEntry from "../../hooks/useEntry";
import Loading from "../../components/Loading";
import { Heart, Zap, Angry, Frown, Ghost, Smile } from "lucide-react";

const questions = [
  "Bagaimana perasaanmu hari ini?",
  "Apakah ada hal yang mengganggumu akhir-akhir ini?",
  "Kalau perasaanmu bisa bicara, kira-kira apa yang ingin mereka sampaikan?",
  "Apa hal kecil yang membuatmu merasa lebih baik hari ini?",
  "Apa yang sedang kamu butuhkan, tapi sulit diungkapkan dengan kata-kata?"
];

const emotionIcons = {
  Cinta: <Heart className="text-primary" />,
  Kaget: <Zap className="text-primary" />,
  Marah: <Angry className="text-primary" />,
  Sedih: <Frown className="text-primary" />,
  Takut: <Ghost className="text-primary" />,
  Gembira: <Smile className="text-primary" />,
};

const EntryPage = () => {
  const { answers, handleChange, handleSubmit, loading, result } = useEntry();
  const [step, setStep] = useState(1); // 1 = form, 2 = result

  const onSubmit = async (e) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) setStep(2);
  };

  return (
    <>
      <header className="text-primary py-6 sm:p-6 md:p-12 border-b-2 flex justify-between">
        <h1 className="text-4xl font-semibold">
          {step === 1 ? "Tulis apa yang kamu rasakan, pikirkan, atau butuhkan hari ini" : "Hasil Analisis Emosi Kamu"}
        </h1>
      </header>

      <main className="max-w-7xl text-primary flex flex-col items-center mx-auto">
        {step === 1 ? (
          <form
            className="flex flex-col gap-4 py-6 sm:p-6 md:p-12 w-full"
            onSubmit={onSubmit}
          >
            {questions.map((q, idx) => (
              <label key={idx}>
                <h2 className="text-lg font-semibold">{`Pertanyaan ${idx + 1}`}</h2>
                <p className="mb-2">{q}</p>
                <textarea
                  className="border rounded px-3 py-2 bg-neutral-50 w-full placeholder-neutral-500 outline-none focus:ring focus:ring-primary"
                  rows={3}
                  placeholder="Luapkan perasaanmu di sini..."
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
        ) : (
          <section className="py-6 sm:p-6 md:p-12 w-full">
            <div>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                {result?.emotions &&
                  Object.entries(result.emotions).map(([emotion, value]) => (
                    <li
                      key={emotion}
                      className="border border-primary rounded-lg px-3 py-2 shadow text-sm"
                    >
                      <div className="flex flex-col items-center gap-2">
                        {emotionIcons[emotion]}
                        <span className="font-medium">{emotion}</span>
                        <span className="text-sm text-neutral-600">{value}</span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 underline text-accent-darker hover:text-accent-dark cursor-pointer"
            >
              Tulis lagi cerita baru →
            </button>
          </section>
        )}
      </main>
    </>
  );
};

export default EntryPage;
