import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import WorkerDashboard from "./pages/Worker/Dashboard";
import AdminDashboard from "./pages/Admin/Dashboard";
import Inventory from "./pages/Admin/Inventory";
import AddOrder from "./pages/Worker/AddOrder";
import OrderDetails from "./pages/Worker/OrderDetails";
import FormulaBin from "./pages/Admin/FormulaBin";
import LoginPage from "./pages/LoginPage";
import OrderInputPageAdmin from "./pages/Admin/AddOrderAdmin";
import Orders from "./pages/Admin/Orders";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"; // Import Navbar
import Production from "./pages/Admin/Production";
import Dispatch from "./pages/Admin/Dispatch";
import "./App.css";
// Protected Route Component
const ProtectedRoute = ({ children, requiredRole, user }) => {
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== requiredRole) return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);

  // Check for stored user in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Function to handle login
  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Persist user
  };

  // Function to handle logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear user from storage
  };

  return (
    <Router>
      <div className="app-container">
        {/* Include Navbar */}
        <Navbar user={user} onLogout={handleLogout} />

        {/* Show Sidebar only when the user is logged in */}
        {user && <Sidebar role={user.role} />}

        <div className="main-content">
          <Routes>
            {/* Public Login Route */}
            <Route path="/" element={<LoginPage onLogin={handleLogin} />} />

            {/* Worker Routes */}
            <Route
              path="/worker"
              element={
                // <ProtectedRoute requiredRole="worker" user={user}>
                  <WorkerDashboard onLogout={handleLogout} />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/worker/inventory"
              element={
                // <ProtectedRoute requiredRole="worker" user={user}>
                  <Inventory />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/worker/orders"
              element={
                // <ProtectedRoute requiredRole="worker" user={user}>
                  <Orders />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/worker/formula-bin"
              element={
                // <ProtectedRoute requiredRole="worker" user={user}>
                  <FormulaBin />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/worker/add-order"
              element={
                // <ProtectedRoute requiredRole="worker" user={user}>
                  <AddOrder />
                // </ProtectedRoute>
              }
            />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <AdminDashboard onLogout={handleLogout} />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/inventory"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <Inventory />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <Orders />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/formula-bin"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <FormulaBin />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/production"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <Production />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dispatch"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <Dispatch />
                // </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-order"
              element={
                // <ProtectedRoute requiredRole="admin" user={user}>
                  <OrderInputPageAdmin />
                // </ProtectedRoute>
              }
            />

            {/* Catch-all Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
