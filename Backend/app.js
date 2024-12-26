import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import Inventory from "./models/inventoryModal.js";
import connectDB from "./database/connect.js";
import Formula from "./models/formulaModal.js";
import orderRoutes from "./router/orderRouter.js";
import itemRoutes from "./router/inventory.js";

const app = express();
const __dirname = path.resolve();

connectDB();

app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// API Routes
app.use("/api/orders", orderRoutes);
app.use("/api/items", itemRoutes);

// Get all formulas
app.get("/api/formulas", async (req, res) => {
  try {
    const formulas = await Formula.find();
    res.json(formulas);
    console.log(formulas);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving formulas", error: err });
  }
});

// Get a single formula by ID
app.get("/api/formulas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const formula = await Formula.findById(id);
    if (formula) {
      res.json(formula);
    } else {
      res.status(404).json({ message: "Formula not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving formula", error: err });
  }
});

// Add a new formula
app.post("/api/formulas", async (req, res) => {
  const { name, ingredients } = req.body;

  if (!name || !ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: "Invalid formula data" });
  }

  try {
    const newFormula = new Formula({ name, ingredients });
    await newFormula.save();
    res
      .status(201)
      .json({ message: "Formula added successfully", formula: newFormula });
  } catch (err) {
    res.status(500).json({ message: "Error adding formula", error: err });
  }
});

// Update an existing formula by ID
app.put("/api/formulas/:id", async (req, res) => {
  const { id } = req.params;
  const { name, ingredients } = req.body;

  if (!name || !ingredients || ingredients.length === 0) {
    return res.status(400).json({ message: "Invalid formula data" });
  }

  try {
    const updatedFormula = await Formula.findByIdAndUpdate(
      id,
      { name, ingredients },
      { new: true }
    );

    if (updatedFormula) {
      res.json({
        message: "Formula updated successfully",
        formula: updatedFormula,
      });
    } else {
      res.status(404).json({ message: "Formula not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating formula", error: err });
  }
});

// Delete a formula by ID
app.delete("/api/formulas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFormula = await Formula.findByIdAndDelete(id);
    if (deletedFormula) {
      res.json({
        message: "Formula deleted successfully",
        formula: deletedFormula,
      });
    } else {
      res.status(404).json({ message: "Formula not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error deleting formula", error: err });
  }
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
