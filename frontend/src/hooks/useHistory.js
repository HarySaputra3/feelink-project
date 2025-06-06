import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";

// const getDominantEmotion = (emotions) => {
//   if (!emotions) return "-";
//   const filtered = Object.entries(emotions).filter(([k]) => k !== "totalyourmood");
//   if (filtered.length === 0) return "-";
//   return filtered.reduce((max, curr) => (curr[1] > max[1] ? curr : max))[0];
// };

const useHistory = (page = 1, limit = 10, search = "") => {
  const isSearching = !!search;
  const { data, isLoading } = useQuery({
    queryKey: isSearching
      ? ["history-search", search]
      : ["history", page, limit],
    queryFn: async () => {
      if (isSearching) {
        const res = await API.get(`/history?search=${encodeURIComponent(search)}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return res.data;
      } else {
        const res = await API.get(`/history?page=${page}&limit=${limit}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        return res.data;
      }
    },
    keepPreviousData: true,
  });

  let moods = data?.moods || [];
  let totalEntries = data?.totalEntries || 0;
  let totalPages = Math.max(1, Math.ceil(totalEntries / limit));
  let filteredMoods = moods;

  if (isSearching) {
    totalEntries = moods.length;
    totalPages = Math.max(1, Math.ceil(totalEntries / limit));
    filteredMoods = moods.slice((page - 1) * limit, page * limit);
  }

  return {
    loading: isLoading,
    filteredMoods,
    totalPages,
    // getDominantEmotion,
  };
};

export default useHistory;