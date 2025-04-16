"use client";

import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// reference: https://mui.com/material-ui/customization/palette/#typescript-2
declare module "@mui/material/styles" {
  interface Palette {
    red: Palette["primary"];
    blue: Palette["primary"];
  }

  interface PaletteOptions {
    red?: PaletteOptions["primary"];
    blue?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include a custom option
// reference: https://mui.com/material-ui/customization/palette/#custom-colors
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    red: true;
    blue: true;
  }
}

/**
 * ThemeProvider component. Wraps the MUI ThemeProvider.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  useEffect(() => {
    if (resolvedTheme === "light") setCurrentTheme(lightTheme);
    else setCurrentTheme(darkTheme);
  }, [resolvedTheme]);

  return (
    <MUIThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

let theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)", // https://mui.com/material-ui/integrations/nextjs/#font-optimization
  },
});
theme = createTheme(theme, {
  cssVariables: true, // https://mui.com/material-ui/customization/css-theme-variables/overview/
  palette: {
    red: theme.palette.augmentColor({
      color: {
        main: "#ef5350",
      },
      name: "red",
    }),
    blue: theme.palette.augmentColor({
      color: {
        main: "#2196f3",
      },
      name: "blue",
    }),
  },
});

export const lightTheme = createTheme(theme, {
  palette: {
    mode: "light",
  },
});

export const darkTheme = createTheme(theme, {
  palette: {
    mode: "dark",
  },
});
