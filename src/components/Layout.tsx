import { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { useAuth } from "../context/AuthContext";

const DRAWER_WIDTH = 280;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "isMobile",
})<{
  open?: boolean;
  isMobile?: boolean;
}>(({ theme, open, isMobile }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isMobile ? 0 : `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
  },
}));

export function Layout() {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useAuth();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  if (!user) return null;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <TopBar 
        open={open}
        onDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        open={open}
        onClose={handleDrawerToggle}
        width={DRAWER_WIDTH}
        variant={isMobile ? "temporary" : "permanent"}
      />
      <Main open={open} isMobile={isMobile}>
        <Box component="div" sx={{ pt: { xs: 8, sm: 9 } }}>
          <Outlet />
        </Box>
      </Main>
    </Box>
  );
} 