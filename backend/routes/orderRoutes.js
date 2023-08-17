const express = require("express");
const orderController = require("../controllers/orderController");
const authenticateAndAuthorize = require("../middleware/authenticateAndAuthorize");
const router = express.Router();

// Apply the authenticateAndAuthorize middleware to CRUD routes
router.post("/", authenticateAndAuthorize, orderController.createOrder);
router.put("/:orderId", authenticateAndAuthorize, orderController.updateOrder);
router.delete(
  "/:orderId",
  authenticateAndAuthorize,
  orderController.deleteOrder
);

// Other routes without role-based restriction
router.get("/:userId", orderController.getUserOrders);
router.get("/order/:orderId", orderController.getOrderById);

module.exports = router;
