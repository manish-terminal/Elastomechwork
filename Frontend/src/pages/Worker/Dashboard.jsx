import React from "react";
import Layout from "../../components/Layout";
import "./WorkerDashboard.css"; // Import the CSS file for styles
import Sidebar from "../../components/Sidebar";

const WorkerDashboard = () => {
  return (
    <Layout role="admin">
      <div className="dashboard-container">
        <Sidebar />
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome to the Worker Dashboard</h1>
          <p className="dashboard-subtitle">
            Monitor inventory, track orders, and manage costs efficiently.
          </p>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Inventory Overview</h2>
            <p className="card-description">
              Keep track of raw materials and product stock levels.
            </p>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Order Management</h2>
            <p className="card-description">
              Review, prioritize, and update orders seamlessly.
            </p>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Cost Analysis</h2>
            <p className="card-description">
              Analyze costs, including raw material and manufacturing expenses.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default WorkerDashboard;
