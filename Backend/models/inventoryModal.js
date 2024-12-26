import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true }, // "rubber" or "chemical"
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
