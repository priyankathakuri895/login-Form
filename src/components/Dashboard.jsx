import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
    };
  // Fetch API data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Filter data
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>

      {/* Search Box */}
      <TextField
        label="Search User"
        variant="outlined"
        fullWidth
        sx={{ mb: 3 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Loading */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} sm={6} md={4} key={user.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6">
                    {user.name}
                  </Typography>
                  <Typography color="text.secondary">
                    📧 {user.email}
                  </Typography>
                  <Typography>
                    🏙️ {user.address.city}
                  </Typography>
                  <Typography>
                    📞 {user.phone}
                  </Typography>
                  <Typography>
                    🌐 {user.website}
                  </Typography>
                  <Button onClick={handleLogout} variant="contained" color="error">
                    Logout
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default Dashboard;