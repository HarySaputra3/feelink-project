import { useState } from "react";
import { useToast } from "../contexts/ToastContext";
import API from "../utils/api";
import { useQueryClient } from "@tanstack/react-query";

const submitEntry = async (story) => {
  return await API.post(
    "/mood",
    { story },
    {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
};

const useEntry = () => {
  const [answers, setAnswers] = useState(["", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const handleChange = (idx, value) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answers.some((a) => !a.trim())) {
      showToast("Please answer all questions.", "error");
      return;
    }
    setLoading(true);
    try {
      const story = answers.map((a) => `"${a}"`).join(" ");
      const res = await submitEntry(story);
      console.log("[ENTRY SUBMISSION SUCCESS]", res.data);
      showToast(res.data.message || "Entry submitted successfully!", "success");
      setAnswers(["", "", "", "", ""]);
      // Update history cache
      queryClient.invalidateQueries({ queryKey: ["history"] });
    } catch (err) {
      console.error("[ENTRY SUBMISSION ERROR]", err.response?.data);
      showToast(err.response?.data?.message || "Failed to submit entry.", "error");
    } finally {
      setLoading(false);
    }
  };

  return { answers, handleChange, handleSubmit, loading };
};

export default useEntry;