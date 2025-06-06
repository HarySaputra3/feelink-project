import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";

export const useMonthlyReport = (month) => {
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

export const useFullMonthsReport = () => {
  return useQuery({
    queryKey: ["full-months-report"],
    queryFn: async () => {
      const res = await API.get("/report/full-months", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return res.data;
    },
  });
};
