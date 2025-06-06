import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";

const useMonthlyReport = (month) => {
  return useQuery({
    queryKey: ["monthly-report", month],
    queryFn: async () => {
      const res = await API.get(`/report/${month}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
    enabled: !!month,
  });
};

export default useMonthlyReport;
