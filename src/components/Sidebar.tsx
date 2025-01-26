import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  TableChart as TableIcon,
} from "@mui/icons-material";

const StyledAccount = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  width: number;
  variant: "permanent" | "persistent" | "temporary";
}

export function Sidebar({ open, onClose, width, variant }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { title: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
    { title: "Data Grid", path: "/data-grid", icon: <TableIcon /> },
  ];

  const content = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Admin Panel
        </Typography>

        <StyledAccount>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle2">Admin User</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              admin@example.com
            </Typography>
          </Box>
        </StyledAccount>
      </Box>

      <List sx={{ px: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 1,
                "&.Mui-selected": {
                  backgroundColor: "primary.main",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}>
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "white" : "inherit",
                }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { lg: width },
        flexShrink: { lg: 0 },
      }}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width,
            bgcolor: "background.default",
            borderRightStyle: "dashed",
          },
        }}>
        {content}
      </Drawer>
    </Box>
  );
} 