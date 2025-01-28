import { Box, Container, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export const PageTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontWeight: 600,
  color: theme.palette.text.primary,
  [theme.breakpoints.down("sm")]: {
    marginBottom: theme.spacing(2),
    fontSize: "1.5rem",
  },
}));

export const StatsCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
  },
}));

export const StatIcon = styled(Box)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: theme.spacing(2),
  "& svg": {
    fontSize: 24,
    color: theme.palette.common.white,
  },
}));

export const StyledDataContainer = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

export const LoadingContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});


