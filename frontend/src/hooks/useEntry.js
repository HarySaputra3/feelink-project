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
  const [result, setResult] = useState(null);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const handleChange = (idx, value) => {
    setAnswers((prev) => prev.map((a, i) => (i === idx ? value : a)));
  };

  const handleSubmit = async () => {
    if (answers.some((a) => !a.trim())) {
      showToast("Harap isi semua pertanyaan.", "error");
      return false;
    }
    setLoading(true);
    try {
      const story = answers.map((a) => `"${a}"`).join(" ");
      const res = await submitEntry(story);
      showToast(res.data.message || "Entri berhasil dikirim!", "success");
      setResult(res.data);
      console.log(result)
      setAnswers(["", "", "", "", ""]);
      queryClient.invalidateQueries({ queryKey: ["history"] });
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || "Gagal mengirim entri.", "error");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { answers, handleChange, handleSubmit, loading, result };
};

export default useEntry;
