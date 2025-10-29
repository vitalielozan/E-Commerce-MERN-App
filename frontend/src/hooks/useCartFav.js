import { useContext } from "react";
import { CartFavContext } from "../context/context.js";

export const useCartFav = () => {
  const context = useContext(CartFavContext);
  if (!context) {
    throw new Error("CartFavContext must be used within a CartFavProvider");
  }
  return context;
};
