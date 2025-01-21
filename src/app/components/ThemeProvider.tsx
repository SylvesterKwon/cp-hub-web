"use client";

import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * ThemeProvider component. Wraps the MUI ThemeProvider.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const paletteMode = resolvedTheme === "dark" ? "dark" : "light";
  useEffect(() => {
    if (resolvedTheme === "light") setCurrentTheme(lightTheme);
    else setCurrentTheme(darkTheme);
  }, [resolvedTheme]);
  console.log("paletteMode", paletteMode);

  return (
    <MUIThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export const lightTheme = createTheme({
  palette: {
    // primary: { main: "#9147FF" }, // need to be updated
    // secondary: { main: "#2a48f3" },
    mode: "light",
  },
  cssVariables: true, // https://mui.com/material-ui/customization/css-theme-variables/overview/
  typography: {
    fontFamily: "var(--font-roboto)", // https://mui.com/material-ui/integrations/nextjs/#font-optimization
  },
});

export const darkTheme = createTheme({
  palette: {
    // primary: { main: "#9147FF" },
    // secondary: { main: "#2a48f3" },
    mode: "dark",
  },
  cssVariables: true, // https://mui.com/material-ui/customization/css-theme-variables/overview/
  typography: {
    fontFamily: "var(--font-roboto)", // https://mui.com/material-ui/integrations/nextjs/#font-optimization
  },
});
