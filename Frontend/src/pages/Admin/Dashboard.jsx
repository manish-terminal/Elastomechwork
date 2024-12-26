import React from "react";
import Layout from "../../components/Layout";
import "./AdminDashboard.css"; // Import the CSS file for styles

const AdminDashboard = () => {
  return (
    <Layout role="admin">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">Welcome to the Admin Dashboard</h1>
          <p className="dashboard-subtitle">
            Manage and monitor production workflows effectively.
          </p>
        </header>

        <section className="dashboard-grid">
          <div className="dashboard-card">
            <h2 className="card-title">Production Schedule</h2>
            <p className="card-description">
              Stay updated with real-time production schedules and deadlines to
              ensure timely delivery.
            </p>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Quality Control</h2>
            <p className="card-description">
              Oversee product quality checks to maintain high standards for
              customer satisfaction.
            </p>
          </div>
          <div className="dashboard-card">
            <h2 className="card-title">Material Consumption</h2>
            <p className="card-description">
              Track material usage and report shortages for restocking to
              maintain continuous production flow.
            </p>
          </div>
        </section>

        <section className="dashboard-info">
          <h2 className="info-title">Our Commitment</h2>
          <p className="info-description">
            At Elastomech, we are committed to producing top-quality rubber
            components tailored to meet the diverse needs of our clients. Our
            advanced manufacturing process ensures consistent results while
            maintaining the highest standards of safety and efficiency.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
