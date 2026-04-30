import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  TextField,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
} from "@mui/material";

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People,
  Logout,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import UserChart from "./UserChart";

const drawerWidth = 220;

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(true);
  const [active, setActive] = useState("dashboard");

  const [form, setForm] = useState({
    name: "",
    email: "",
    city: "",
  });

  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  const toggleDrawer = () => setOpen(!open);

  // ✅ ONLY ONE LOGOUT FUNCTION (FIXED)
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ Add
  const handleAddUser = () => {
    if (!form.name || !form.email) return;

    const newUser = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      address: { city: form.city },
    };

    setUsers([...users, newUser]);
    setForm({ name: "", email: "", city: "" });
  };

  // ✏️ Edit
  const handleEditUser = (user) => {
    setForm({
      name: user.name,
      email: user.email,
      city: user.address?.city || "",
    });
    setEditId(user.id);
  };

  // 💾 Update
  const handleUpdateUser = () => {
    setUsers(
      users.map((u) =>
        u.id === editId
          ? {
              ...u,
              name: form.name,
              email: form.email,
              address: { city: form.city },
            }
          : u
      )
    );

    setEditId(null);
    setForm({ name: "", email: "", city: "" });
  };

  // ❌ Delete
  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : 70,
          "& .MuiDrawer-paper": {
            width: open ? drawerWidth : 70,
            background: "#0f172a",
            color: "#fff",
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography>{open ? "Admin Panel" : "AP"}</Typography>
        </Box>

        <List>
          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Dashboard" />}
          </ListItemButton>

          <ListItemButton>
            <ListItemIcon sx={{ color: "#fff" }}>
              <People />
            </ListItemIcon>
            {open && <ListItemText primary="Users" />}
          </ListItemButton>

          <ListItemButton onClick={handleLogout}>
            <ListItemIcon sx={{ color: "#fff" }}>
              <Logout />
            </ListItemIcon>
            {open && <ListItemText primary="Logout" />}
          </ListItemButton>
        </List>
      </Drawer>

      {/* Main */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer} color="inherit">
              <MenuIcon />
            </IconButton>
            <Typography sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <Avatar>U</Avatar>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <UserChart users={users} />

          <Typography variant="h4" sx={{ mt: 3 }}>
            Users
          </Typography>

          {/* FORM */}
          <Box sx={{ mb: 3 }}>
            <TextField
              label="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              sx={{ mr: 2 }}
            />
            <TextField
              label="Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              sx={{ mr: 2 }}
            />
            <TextField
              label="City"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
              sx={{ mr: 2 }}
            />

            {editId ? (
              <Button onClick={handleUpdateUser} variant="contained">
                Update
              </Button>
            ) : (
              <Button onClick={handleAddUser} variant="contained">
                Add
              </Button>
            )}
          </Box>

          {/* SEARCH */}
          <TextField
            label="Search users..."
            fullWidth
            sx={{ mb: 3 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* CARDS */}
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography>{user.email}</Typography>
                      <Typography>{user.address?.city}</Typography>

                      <Box sx={{ mt: 2 }}>
                        <Button
                          onClick={() => handleEditUser(user)}
                          variant="contained"
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </Button>

                        <Button
                          onClick={() => handleDeleteUser(user.id)}
                          color="error"
                          variant="contained"
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;