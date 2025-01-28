import { Container, Paper, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(3),
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  borderRadius: theme.spacing(2),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    borderRadius: theme.spacing(1),
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  fontSize: "1rem",
  textTransform: "none",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  "&:hover": {
    boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
  },
}));

export const StyledForm = styled('form')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));