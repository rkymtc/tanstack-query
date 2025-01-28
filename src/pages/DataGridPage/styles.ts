import { Box, Typography, TextField, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: "1200px",
  margin: "0 auto",
}));

export const PageHeader = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

export const HeaderActions = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(1.5),
  },
}));

export const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(["box-shadow"]),
    "&:hover": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    "&.Mui-focused": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  },
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: "none",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontSize: "0.875rem",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    fontSize: "0.875rem",
    "&:focus": {
      outline: "none",
    },
  },
  "& .MuiDataGrid-row": {
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
  },
  "& .MuiDataGrid-toolbarContainer": {
    padding: theme.spacing(2),
    gap: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  "& .MuiDataGrid-footer": {
    borderTop: `1px solid ${theme.palette.divider}`,
  },
}));

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "400px",
});

export const StatusChip = styled(Chip)({
  fontWeight: 500,
  fontSize: "0.75rem",
});

export const RoleChip = styled(Chip)({
  fontWeight: 500,
  fontSize: "0.75rem",
});