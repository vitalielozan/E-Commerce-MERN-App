import { useContext } from "react";
import { AuthContext } from "../context/context.js";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext must be used within a AuthProvider");
  }
  return context;
};
