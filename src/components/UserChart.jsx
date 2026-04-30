import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

function UserChart({ users }) {
  // Example: Users per city
  const cityData = Object.values(
    users.reduce((acc, user) => {
      const city = user.address?.city || "Unknown";
      acc[city] = acc[city] || { name: city, users: 0 };
      acc[city].users += 1;
      return acc;
    }, {})
  );

  return (
    <>
      {/* 📊 Bar Chart */}
      <h3>Users by City</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={cityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="users" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* 🥧 Pie Chart */}
      <h3 style={{ marginTop: 40 }}>Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={cityData}
            dataKey="users"
            nameKey="name"
            outerRadius={100}
            label
          >
            {cityData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
}

export default UserChart;