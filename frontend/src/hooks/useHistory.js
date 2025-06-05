import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";

// const getDominantEmotion = (emotions) => {
//   if (!emotions) return "-";
//   const filtered = Object.entries(emotions).filter(([k]) => k !== "totalyourmood");
//   if (filtered.length === 0) return "-";
//   return filtered.reduce((max, curr) => (curr[1] > max[1] ? curr : max))[0];
// };

const useHistory = (page = 1, limit = 10, search = "") => {
  const { data, isLoading } = useQuery({
    queryKey: ["history", page, limit, search],
    queryFn: async () => {
      const res = await API.get(`/history?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
    keepPreviousData: true,
  });

  const moods = data?.moods || [];
  const totalEntries = data?.totalEntries || 0;
  const totalPages = Math.max(1, Math.ceil(totalEntries / limit));

  // Filter moods by search
  const filteredMoods = moods.filter((entry) => {
    const searchLower = search.toLowerCase();
    return (
      (entry.story && entry.story.toLowerCase().includes(searchLower)) ||
      (entry.createdAt &&
        new Date(entry.createdAt)
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
          .toLowerCase()
          .includes(searchLower))
    );
  });

  return {
    loading: isLoading,
    filteredMoods,
    totalPages,
    emotionsSummary: data?.emotionsSummary,
    // getDominantEmotion,
  };
};

export default useHistory;