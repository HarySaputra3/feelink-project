import { useEffect, useState } from "react";
import API from "../utils/api";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalEntries, setTotalEntries] = useState(0);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/report`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistory(res.data.entries || []);
        setTotalEntries(res.data.totalEntries || 0);
      } catch (err) {
        setHistory([]);
        setTotalEntries(0);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return { history, loading, totalEntries };
};

export default useHistory;