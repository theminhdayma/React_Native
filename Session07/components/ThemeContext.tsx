import React, { createContext, useContext } from "react";

export type ThemeType = "light" | "dark";
export interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextProps>({
  theme: "light",
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}
