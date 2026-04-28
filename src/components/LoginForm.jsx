import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("auth", "true"); // store login state
      // optional safety delay
        setTimeout(() => {
        navigate("/dashboard");
        }, 100);

        }else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 4, width: 350 }}>
        <Typography variant="h5" textAlign="center">
          Login
        </Typography>

        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default LoginForm;