import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import { useLoading } from "../contexts/LoadingContext";
import API from "../utils/api";

const useEntry = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const { showToast } = useToast();
  const { setIsLoading } = useLoading();

  const handleChange = (idx, value) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((a) => !a.trim())) {
      showToast("Please answer all questions.", "error");
      return;
    }
    setIsLoading(true);
    try {
      const story = answers.map((a) => `"${a}"`).join(" ");
      const res = await API.post("/mood",
        { story },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("[ENTRY SUBMISSION SUCCESS]", res.data);
      showToast(res.data.message || "Entry submitted successfully!", "success");
      setAnswers(["", "", "", "", ""]);
    } catch (err) {
      console.error("[ENTRY SUBMISSION ERROR]", err.response?.data);
      showToast(err.response?.data?.message || "Failed to submit entry.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return { answers, handleChange, handleSubmit };
};

export default useEntry;