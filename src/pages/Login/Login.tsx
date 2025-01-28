import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  Grow,
  CircularProgress,
} from "@mui/material";
import {
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { LoginCredentials } from "../../types";
import {
  StyledContainer,
  StyledPaper,
  StyledTextField,
  StyledButton,
  StyledForm,
} from "./styles";

export default function Login() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.username.trim() || !credentials.password.trim()) {
      setError("Please enter both username and password");
      return;
    }
    setError(null);
    setIsLoading(true);

    try {
      const user = {
        username: credentials.username,
        token: 'demo-token-' + Date.now()
      };
      login(user);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setError(null);
  };

  return (
    <StyledContainer maxWidth={false}>
      <Grow in timeout={800}>
        <StyledPaper elevation={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                color: "primary.main",
                mb: 1,
              }}
            >
              AdminFlow
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
              Welcome back! Please login to your account
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <StyledForm onSubmit={handleSubmit}>
            <StyledTextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
              error={!!error}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <StyledTextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
              error={!!error}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mt: 2 }}
              disabled={isLoading || !credentials.username || !credentials.password}
            >
              {isLoading ? <CircularProgress size={24} /> : "Login"}
            </StyledButton>
          </StyledForm>

          <Typography
            variant="body2"
            align="center"
            sx={{ mt: 3, color: "text.secondary" }}
          >
            This is a demo app. Use admin/admin to login.
          </Typography>
        </StyledPaper>
      </Grow>
    </StyledContainer>
  );
}