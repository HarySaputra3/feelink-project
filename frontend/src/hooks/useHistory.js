import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";

const fetchHistory = async () => {
  const res = await API.get(`/report`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  console.log("[HISTORY FETCHED]", res.data);
  return res.data.entries || [];
};

const useHistory = () => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["history"],
    queryFn: fetchHistory,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return { history, loading: isLoading };
};

export default useHistory;