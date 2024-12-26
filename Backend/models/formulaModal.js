import mongoose from "mongoose";

const formulaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [
    {
      type: { type: String, required: true },
      name: { type: String, required: true },
      ratio: { type: Number, required: true },
    },
  ],
});

const Formula = mongoose.model("Formula", formulaSchema);

export default Formula;
