const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerAddress: { type: String, required: true },
  orderDate: { type: Date, required: true },
  expectedDeliveryTime: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
