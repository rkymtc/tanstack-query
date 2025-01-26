import {
  AppBar,

  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  LightMode,
  Notifications,
  Person,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface TopBarProps {
  open: boolean;
  onDrawerToggle: () => void;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export function TopBar({ open, onDrawerToggle }: TopBarProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <StyledAppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${280}px)` },
        ml: { sm: `${280}px` },
        ...(open && {
          width: `calc(100% - ${280}px)`,
          marginLeft: `${280}px`,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          onClick={onDrawerToggle}
          edge="start"
          sx={{
            marginRight: 2,
            color: "text.primary",
          }}>
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>

        <Stack direction="row" spacing={1}>
          <IconButton color="inherit">
            <LightMode />
          </IconButton>
          <IconButton color="inherit">
            <Notifications />
          </IconButton>
          <IconButton color="inherit">
            <Person />
          </IconButton>
        </Stack>

        <Button
          color="inherit"
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          Logout
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
} 