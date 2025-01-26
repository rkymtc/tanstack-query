import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
  IconButton,
  useMediaQuery,
  Avatar,
  Divider,
  Tooltip,
  Badge,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
  Person as PersonIcon,
  Close as CloseIcon,
  Logout as LogoutIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const MENU_WIDTH = {
  xs: '85%',  
  sm: 280,    
  lg: 300   
};

const StyledRoot = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: alpha(theme.palette.background.default, 0.95),
  backdropFilter: 'blur(6px)',
}));

const StyledAccount = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
  transition: theme.transitions.create('box-shadow'),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
    boxShadow: `0 0 0 1px ${alpha(theme.palette.grey[500], 0.16)}`
  }
}));

const StyledNavItem = styled(ListItemButton)(({ theme }) => ({
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1, 2),
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.12),
    },
    '&::before': {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      position: 'absolute',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width?: number | string;
  variant: "permanent" | "persistent" | "temporary";
}

export function Sidebar({ open, onClose, variant }: SidebarProps) {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const navItems = [
    { 
      title: "Dashboard", 
      path: "/dashboard", 
      icon: <DashboardIcon />,
      info: "New" 
    },
    { 
      title: "Data Grid", 
      path: "/data-grid", 
      icon: <TableIcon /> 
    },
    { 
      title: "Notifications", 
      path: "/notifications", 
      icon: <NotificationsIcon />,
      info: "5"
    },
    { 
      title: "Settings", 
      path: "/settings", 
      icon: <SettingsIcon /> 
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    if (isMobile) onClose();
  };

  const content = (
    <StyledRoot>
     
      <Box sx={{ 
        px: 2.5, 
        py: 2,
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.2rem' },
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          AdminFlow
        </Typography>

        {isMobile && (
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>

    
      <Box sx={{ px: 2.5, pb: 3 }}>
        <StyledAccount>
          <Avatar
            src="/path-to-avatar.jpg"
            alt="Admin"
            sx={{
              width: 40,
              height: 40,
              bgcolor: 'primary.main'
            }}
          >
            <PersonIcon />
          </Avatar>

          <Box sx={{ ml: 2, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap>
              Admin User
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              admin@example.com
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />

    
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          pb: 3,
          pt: 2,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <List disablePadding>
          {navItems.map((item) => (
            <Tooltip 
              key={item.path}
              title={isMobile ? item.title : ""}
              placement="right"
            >
              <StyledNavItem
                selected={location.pathname === item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onClose();
                }}
              >
                <ListItemIcon sx={{ 
                  minWidth: 36,
                  color: 'inherit'
                }}>
                  {item.info ? (
                    <Badge badgeContent={item.info} color="primary">
                      {item.icon}
                    </Badge>
                  ) : item.icon}
                </ListItemIcon>

                <ListItemText 
                  primary={item.title}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                  }}
                />
              </StyledNavItem>
            </Tooltip>
          ))}
        </List>
      </Box>

     
      <Box sx={{ px: 2.5, pb: 3 }}>
        <StyledNavItem
          onClick={handleLogout}
          sx={{
            color: theme.palette.error.main,
            '&:hover': {
              bgcolor: alpha(theme.palette.error.main, 0.08),
            },
          }}
        >
          <ListItemIcon sx={{ 
            minWidth: 36,
            color: 'inherit'
          }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText 
            primary="Çıkış Yap"
            primaryTypographyProps={{
              fontSize: '0.875rem',
              fontWeight: 500
            }}
          />
        </StyledNavItem>
      </Box>
    </StyledRoot>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: MENU_WIDTH.lg }
      }}
    >
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: isMobile ? MENU_WIDTH.xs : (isTablet ? MENU_WIDTH.sm : MENU_WIDTH.lg),
            border: 'none',
            backgroundImage: 'none',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        {content}
      </Drawer>
    </Box>
  );
} 