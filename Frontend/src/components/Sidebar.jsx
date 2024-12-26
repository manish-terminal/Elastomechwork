import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role }) => {
  if (!role) {
    console.warn("Sidebar: role is undefined or null");
    return <div>Role not defined</div>;
  }

  const links =
    role === "admin"
      ? [
          { name: "Dashboard", path: "/admin" },
          { name: "Inventory", path: "/admin/inventory" },
          { name: "Orders", path: "/admin/orders" },
          { name: "Add Order", path: "/admin/add-order" },
          { name: "Formula Bin", path: "/admin/formula-bin" },
          { name: "Production", path: "/admin/production" },
          { name: "Dispatch", path: "/admin/dispatch" },
        ]
      : [
          { name: "Dashboard", path: "/worker" },
          { name: "Inventory", path: "/worker/inventory" },
          { name: "Orders", path: "/worker/orders" },
          { name: "Add Order", path: "/worker/add-order" },
          { name: "Formula Bin", path: "/worker/formula-bin" },
        ];

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">ElastoMech</h2>
      <ul className="sidebar-links">
        {links.map((link) => (
          <li key={link.name} className="sidebar-item">
            <Link to={link.path} className="sidebar-link">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
