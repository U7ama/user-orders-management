const Order = require("../models/order");

exports.createOrder = async (req, res) => {
  const {
    orderID,
    customerName,
    customerEmail,
    customerAddress,
    orderDate,
    expectedDeliveryTime,
    userId,
  } = req.body;

  try {
    const newOrder = new Order({
      orderID,
      customerName,
      customerEmail,
      customerAddress,
      orderDate,
      expectedDeliveryTime,
      user: userId,
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.geAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Error getting user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getOrderById = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    console.error("Error getting order by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const {
    orderID,
    customerName,
    customerEmail,
    customerAddress,
    orderDate,
    expectedDeliveryTime,
  } = req.body;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderID,
        customerName,
        customerEmail,
        customerAddress,
        orderDate,
        expectedDeliveryTime,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndDelete(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Server error" });
  }
};
