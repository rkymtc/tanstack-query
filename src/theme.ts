import { createTheme, alpha, Shadows } from "@mui/material/styles";

const greenPalette = {
  main: "#00A76F",
  light: "#3FC79A",
  dark: "#007867",
  contrastText: "#FFFFFF",
};

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: greenPalette,
    background: {
      default: "#171C24",
      paper: "#222B36",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#919EAB",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: Array(25).fill("none").map((_, index) => 
    index === 0 
      ? "none" 
      : `0 0 2px 0 ${alpha("#919EAB", 0.2)}, 0 12px 24px -4px ${alpha("#919EAB", 0.12)}`
  ) as unknown as Shadows,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#6b6b6b #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            width: 8,
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#6b6b6b",
            minHeight: 24,
          },
          "&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track": {
            borderRadius: 8,
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: `0 0 2px 0 ${alpha("#919EAB", 0.2)}, 0 12px 24px -4px ${alpha("#919EAB", 0.12)}`,
        },
      },
    },
  },
}); 