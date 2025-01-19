"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: true, // https://mui.com/material-ui/customization/css-theme-variables/overview/
  typography: {
    fontFamily: "var(--font-roboto)", // https://mui.com/material-ui/integrations/nextjs/#font-optimization
  },
});

export default theme;
