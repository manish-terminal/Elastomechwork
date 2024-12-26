import React, { useState, useEffect } from "react";

const Production = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();

        // Map API data to orders structure
        const formattedOrders = data.map((order) => ({
          id: order._id,
          orderId: order.orderId,
          customerName: order.customerName,
          itemName: order.itemName,
          weightPerProduct: order.weightPerProduct,
          quantity: order.quantity,
          rubberIngredients: order.rubberIngredients.map((ingredient) => ({
            name: ingredient.name,
            ratio: ingredient.ratio,
            weight: ingredient.weight,
          })),
          chemicalIngredients: order.chemicalIngredients.map((ingredient) => ({
            name: ingredient.name,
            ratio: ingredient.ratio,
            weight: ingredient.weight,
          })),
          deliveryDate: new Date(order.deliveryDate).toLocaleDateString(),
          remarks: order.remarks,
          manufactured: order.manufactured || 0,
          rejected: order.rejected || 0,
          dispatchReady: false,
          status: order.status || "pending",
        }));

        setOrders(formattedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle input changes for manufactured or rejected quantities
  const handleInputChange = (id, field, value) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id
          ? {
              ...order,
              [field]: Math.min(Number(value), order.quantity), // Prevent exceeding ordered quantity
            }
          : order
      )
    );
  };

  // Save the updated quantities and send API request
  const handleSave = async (id) => {
    const order = orders.find((order) => order.id === id);
    if (!order) return;

    const manufacturedAndRejected = order.manufactured + order.rejected;
    const orderQuantity = order.quantity;

    // Calculate proportional weight for each ingredient based on manufactured + rejected quantity
    const updatedRubberIngredients = order.rubberIngredients.map(
      (ingredient) => {
        const perUnitWeight = ingredient.weight / orderQuantity; // Weight per unit
        const totalWeightToDeduct = perUnitWeight * manufacturedAndRejected;
        return {
          ...ingredient,
          weight: totalWeightToDeduct,
        };
      }
    );

    const updatedChemicalIngredients = order.chemicalIngredients.map(
      (ingredient) => {
        const perUnitWeight = ingredient.weight / orderQuantity; // Weight per unit
        const totalWeightToDeduct = perUnitWeight * manufacturedAndRejected;
        return {
          ...ingredient,
          weight: totalWeightToDeduct,
        };
      }
    );

    // Update the manufactured and rejected quantities before saving
    try {
      // Send save request to backend
      const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          manufactured: order.manufactured,
          rejected: order.rejected,
          rubberIngredients: updatedRubberIngredients,
          chemicalIngredients: updatedChemicalIngredients,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order quantities");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id
            ? {
                ...order,
                rubberIngredients: updatedRubberIngredients,
                chemicalIngredients: updatedChemicalIngredients,
              }
            : order
        )
      );

      alert("Order quantities saved successfully!");
    } catch (error) {
      console.error("Error saving order quantities:", error);
    }
  };

  // Handle status change from dropdown
  const handleStatusChange = async (id, newStatus) => {
    const order = orders.find((order) => order.id === id);
    if (!order) return;

    try {
      const response = await fetch(`http://localhost:5001/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const updatedOrder = await response.json();
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );

      alert("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Production Page</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
            border: "1px solid #ddd",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{
                backgroundColor: "#f4f4f9",
                borderBottom: "2px solid #ddd",
              }}
            >
              <th style={{ padding: "10px", fontWeight: "bold" }}>Order ID</th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Order Name
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Ordered Quantity
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Manufactured Quantity
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Rejected Quantity
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Rubber Ingredients
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Chemical Ingredients
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>
                Delivery Date
              </th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>Action</th>
              <th style={{ padding: "10px", fontWeight: "bold" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                style={{
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #ddd",
                }}
              >
                <td style={{ padding: "10px" }}>{order.orderId}</td>
                <td style={{ padding: "10px" }}>{order.itemName}</td>
                <td style={{ padding: "10px" }}>{order.quantity}</td>
                <td style={{ padding: "10px" }}>
                  <input
                    type="number"
                    value={order.manufactured}
                    onChange={(e) =>
                      handleInputChange(
                        order.id,
                        "manufactured",
                        e.target.value
                      )
                    }
                    disabled={order.manufactured >= order.quantity} // Disable when manufactured quantity reaches ordered quantity
                    style={{
                      width: "100px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <input
                    type="number"
                    value={order.rejected}
                    onChange={(e) =>
                      handleInputChange(order.id, "rejected", e.target.value)
                    }
                    disabled={order.manufactured >= order.quantity} // Disable when manufactured quantity reaches ordered quantity
                    style={{
                      width: "100px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </td>
                <td style={{ padding: "10px" }}>
                  <ul style={{ margin: 0, padding: 0 }}>
                    {order.rubberIngredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} (Ratio: {ingredient.ratio}, Weight:{" "}
                        {ingredient.weight.toFixed(2)} kg)
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: "10px" }}>
                  <ul style={{ margin: 0, padding: 0 }}>
                    {order.chemicalIngredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.name} (Ratio: {ingredient.ratio}, Weight:{" "}
                        {ingredient.weight.toFixed(2)} kg)
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ padding: "10px" }}>{order.deliveryDate}</td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => handleSave(order.id)}>Save</button>
                </td>
                <td style={{ padding: "10px" }}>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    style={{
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Production;
