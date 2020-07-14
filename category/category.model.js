const mongoose = require("mongoose");
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, minlength: 3, required: [true, 'name is required'] },
    parentCategories: { type: Array, index: true },
    childCategories: { type: Array },
    parent: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categories", CategorySchema);
