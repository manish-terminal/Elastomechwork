import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import "./OrderDetails.css";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: 1, itemName: "Product A", status: "pending", priority: "normal" },
    { id: 2, itemName: "Product B", status: "completed", priority: "high" },
    { id: 3, itemName: "Product C", status: "pending", priority: "low" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePriorityChange = (id, newPriority) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, priority: newPriority } : order
      )
    );
  };

  return (
    <div className="orders-container">
      <Sidebar />
      <div className="orders-content">
        <h2>Previous Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item Name</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.itemName}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </td>
                <td>
                  <select
                    value={order.priority}
                    onChange={(e) =>
                      handlePriorityChange(order.id, e.target.value)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn-complete"
                    onClick={() => handleStatusChange(order.id, "completed")}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="btn-pending"
                    onClick={() => handleStatusChange(order.id, "pending")}
                  >
                    Mark as Pending
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
