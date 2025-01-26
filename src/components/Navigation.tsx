import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  GridView as GridViewIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
  padding: theme.spacing(0, 3),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(0, 2),
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const NavButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
  fontWeight: 500,
  fontSize: "0.875rem",
  textTransform: "none",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "&.active": {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.light,
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    marginRight: 0,
    marginBottom: theme.spacing(0.5),
    padding: theme.spacing(1.5, 2),
  },
}));

const UserButton = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(0.5, 1.5),
  borderRadius: theme.shape.borderRadius * 2,
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const UserAvatar = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.875rem",
  fontWeight: 600,
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  fontWeight: 500,
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    width: 240,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
  },
}));

const DrawerHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
}));

export function Navigation() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user, logout } = useAuth();


  if (!user) return null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    handleClose();
    logout();
    navigate("/login");
  };

  const navigationItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Data Grid", icon: <GridViewIcon />, path: "/data-grid" },
  ];

  const drawer = (
    <>
      <DrawerHeader>
        <LogoText>Admin Panel</LogoText>
        <IconButton onClick={handleDrawerToggle} size="small">
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider sx={{ mb: 2 }} />
      <List>
        {navigationItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <NavButton
              onClick={() => handleNavigation(item.path)}
              className={location.pathname === item.path ? "active" : ""}>
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    location.pathname === item.path
                      ? "primary.main"
                      : "inherit",
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.875rem",
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              />
            </NavButton>
          </ListItem>
        ))}
      </List>
    </>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <StyledToolbar>
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <LogoText sx={{ mr: 4 }}>Admin Panel</LogoText>
              <Box sx={{ display: "flex" }}>
                {navigationItems.map((item) => (
                  <NavButton
                    key={item.text}
                    onClick={() => handleNavigation(item.path)}
                    className={location.pathname === item.path ? "active" : ""}>
                    <ListItemIcon
                      sx={{
                        minWidth: 40,
                        color:
                          location.pathname === item.path
                            ? "primary.main"
                            : "inherit",
                      }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: "0.875rem",
                        fontWeight: location.pathname === item.path ? 600 : 500,
                      }}
                    />
                  </NavButton>
                ))}
              </Box>
            </Box>
          )}

          <UserButton onClick={handleMenu}>
            <UserAvatar>
              <PersonIcon fontSize="small" />
            </UserAvatar>
            <UserName>John Doe</UserName>
          </UserButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                "& .MuiMenuItem-root": {
                  fontSize: "0.875rem",
                  py: 1,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">My Profile</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              <Typography variant="body2">Logout</Typography>
            </MenuItem>
          </Menu>
        </StyledToolbar>
      </StyledAppBar>

      {isMobile && (
        <StyledDrawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}>
          {drawer}
        </StyledDrawer>
      )}
    </>
  );
}
