import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useToast } from "./ToastContext";
import API from "../utils/api";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = res.data;
      setName(data.name || "");
      setEmail(data.email || "");
    } catch (err) {
      showToast("Failed to load profile", "error");
    }
  }, [showToast]);

  // Call fetchProfile once on mount
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider value={{
      name, setName,
      email, setEmail,
      refreshProfile: fetchProfile,
    }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => useContext(ProfileContext);