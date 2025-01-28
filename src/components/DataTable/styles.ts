import {
    Box,
    Paper,
    TableHead,
    TableRow,
    Button,
    TextField,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
  } from "@mui/material";
  import { styled } from "@mui/material/styles";

  export const StyledTableContainer = styled(Box)(({ theme }) => ({
    margin: theme.spacing(2),
    maxHeight: "calc(100vh - 200px)",
    overflow: "auto",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(1),
      maxHeight: "calc(100vh - 180px)",
    },
  }));
  
  export const StyledPaper = styled(Paper)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    [theme.breakpoints.down("sm")]: {
      borderRadius: theme.shape.borderRadius / 2,
    },
  }));
  
  export const StyledTableHead = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    "& .MuiTableCell-head": {
      color: theme.palette.text.primary,
      fontWeight: 600,
      fontSize: "0.875rem",
      borderBottom: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
    },
  }));
  

  export const StyledTableRow = styled(TableRow)<{
    isedited?: number;
    isdeleting?: number;
  }>(({ theme, isedited, isdeleting }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.selected,
    },
    "& .MuiTableCell-root": {
      padding: theme.spacing(2),
      fontSize: "0.875rem",
    },
    // Düzenleme durumunda "highlight" animasyonu
    ...(isedited && {
      animation: "highlight 2s",
      "@keyframes highlight": {
        "0%": {
          backgroundColor: theme.palette.primary.light,
        },
        "100%": {
          backgroundColor: "transparent",
        },
      },
    }),
    // Silinme durumunda "fadeOut" animasyonu
    ...(isdeleting && {
      animation: "fadeOut 0.5s",
      "@keyframes fadeOut": {
        "0%": {
          opacity: 1,
          backgroundColor: theme.palette.error.light,
        },
        "100%": {
          opacity: 0,
          backgroundColor: theme.palette.error.light,
        },
      },
    }),
  }));
  
  
  export const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius * 1.5,
    padding: theme.spacing(1, 3),
    textTransform: "none",
    fontWeight: 500,
    boxShadow: "none",
    "&:hover": {
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    },
  }));
  
  export const SearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "stretch",
      gap: theme.spacing(1.5),
      marginBottom: theme.spacing(2),
    },
  }));
  
  export const SearchField = styled(TextField)(({ theme }) => ({
    flex: 1,
    "& .MuiOutlinedInput-root": {
      borderRadius: theme.shape.borderRadius * 1.5,
      backgroundColor: theme.palette.background.paper,
      transition: theme.transitions.create(["box-shadow"]),
      "&:hover": {
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      },
      "&.Mui-focused": {
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      },
    },
    [theme.breakpoints.down("sm")]: {
      "& .MuiOutlinedInput-root": {
        borderRadius: theme.shape.borderRadius,
      },
    },
  }));
  
  export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    "& .MuiTypography-root": {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  }));
  
  export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
  }));
  
  export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    backgroundColor: theme.palette.background.default,
  }));
  

  export const MobileCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1.5),
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    backgroundColor: theme.palette.background.paper,
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
    },
  }));
  
  export const CardContent = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
  }));
  
  export const CardHeader = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing(1),
  }));
  
  export const CardTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(0.5),
  }));
  
  export const CardBody = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: "0.875rem",
  }));
  