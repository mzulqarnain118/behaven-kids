import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ApiCall } from "../utils/ApiCall";
import { Toast } from "../Components/common/Toast/Toast";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";
import { Person as PersonIcon, Lock as LockIcon } from "@mui/icons-material";
import BehavenLogo from "../assets/BehavenLogo.jpg";

interface DecodedToken {
  role: string;
}

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (role: string) => {
    switch (role) {
      case "parent":
        navigate("/PhoneNumber");
        break;
      case "admin":
      case "secretary":
        navigate("/");
        break;
      case "floor":
        navigate("/CbsAddOrTransferClientsToRooms");
        break;
      case "rbt":
      case "thr":
        navigate("/rbtaddortransferclientstorooms");
        break;
      default:
        if (role.includes("tor")) navigate("/timeoutselectaclient");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await ApiCall(
        "UserAuthentication/SignIn",
        "POST",
        null,
        { username, password }
      );
      if (response?.token) {
        Toast("User Logged-In Successfully.");
        localStorage.setItem("token", response.token);
        window.dispatchEvent(new Event("storage"));
        const { role } = jwtDecode(response.token) as DecodedToken;
        handleNavigation(role);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        component="img"
        src={BehavenLogo}
        alt="Behaven Logo"
        sx={{
          height: 125,
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Card sx={{ width: 500, mt: 8 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            fontWeight={700}
            mb={3}
            textAlign="center"
          >
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              margin="normal"
              label="Username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              type="password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              disabled={isLoggingIn}
              sx={{ mt: 3 }}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
