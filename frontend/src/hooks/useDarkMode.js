import { useContext } from "react";
import { ThemeContext } from "../context/context.js";

export function useDarkMode() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return [darkMode, setDarkMode];
}
