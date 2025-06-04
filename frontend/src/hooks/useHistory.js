import { useEffect, useState } from "react";
import { useLoading } from "../contexts/LoadingContext";
import API from "../utils/api";

const useHistory = () => {
  const [history, setHistory] = useState([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const res = await API.get(`/report`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistory(res.data.entries || []);
      } catch (err) {
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
    // eslint-disable-next-line
  }, []);

  return { history, loading: isLoading };
};

export default useHistory;