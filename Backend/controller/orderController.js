// controllers/orderController.js
import Order from "../models/orderSchema.js";
// controllers/orderController.js
 // Assuming your Order model is in models/Order.js
import Item from '../models/inventoryModal.js'; 
// Fetch all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      itemName,
      weightPerProduct,
      quantity,
      rubberIngredients,
      chemicalIngredients,
      deliveryDate,
      remarks,
    } = req.body;

    // Generate Order ID logic
    const date = new Date();
    const dateString = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
    const orderNumber = await Order.countDocuments();
    const orderId = `ELAST${dateString}${String(orderNumber + 1).padStart(2, "0")}`;

    const newOrder = new Order({
      orderId,
      customerName,
      itemName,
      weightPerProduct,
      quantity,
      rubberIngredients,
      chemicalIngredients,
      deliveryDate,
      remarks,
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

  

// API controller to update order status and quantities
// API controller to update order quantities (without updating status)
// API controller to update order quantities (only increase, no decrease)
// API controller to update order quantities (only increase, no decrease)
export const updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { manufactured, rejected } = req.body;

  try {
    // Fetch the order by ID
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Directly update the manufactured and rejected quantities
    order.manufactured = manufactured;
    order.rejected = rejected;

    // Save the updated order
    await order.save();

    // Adjust the inventory based on the order's ingredients (if needed)
    await updateInventory(order, manufactured, rejected);

    return res.status(200).json({ message: 'Order quantities updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Helper function to update inventory based on the order's ingredients
async function updateInventory(order, manufactured, rejected) {
  // Process rubber ingredients and update the inventory
  for (let ingredient of order.rubberIngredients) {
    const totalUsage = ingredient.weight * (manufactured + rejected);
    await adjustInventory(ingredient.name, totalUsage);
  }

  // Process chemical ingredients and update the inventory
  for (let ingredient of order.chemicalIngredients) {
    const totalUsage = ingredient.weight * (manufactured + rejected);
    await adjustInventory(ingredient.name, totalUsage);
  }
}

// Helper function to adjust inventory based on the ingredient's usage
async function adjustInventory(ingredientName, usage) {
  try {
    // Find the item in the inventory
    const item = await Item.findOne({ name: ingredientName });
    if (!item) {
      throw new Error(`Ingredient ${ingredientName} not found in inventory`);
    }

    // Check if there's enough inventory
    if (item.quantity < usage) {
      throw new Error(`Not enough inventory for ${ingredientName}`);
    }

    // Reduce the inventory by the usage amount
    item.quantity -= usage;

    // Save the updated item in inventory
    await item.save();
  } catch (error) {
    console.error(`Error adjusting inventory for ${ingredientName}:`, error);
    throw new Error(`Error adjusting inventory for ${ingredientName}`);
  }
}

