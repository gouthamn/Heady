const mongoose = require("mongoose");
const { Schema } = mongoose;

const currencies = ["INR", "USD", "EUR"];

const ProductSchema = new Schema(
  {
    name: { type: String, minlength: 3, required: [true, 'name is required'] },
    categories: { type: [String], validate: {
        validator: function(arr) {
          return arr.length > 0;
        },
        message: "You must provide atleast 1 category."
      }, required: true, index: true},
    price: { type: Number, min: 1,required: [true, 'price is required'] },
    currency: { type: String, enum: currencies, required: [true, 'currency is required'] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", ProductSchema);
