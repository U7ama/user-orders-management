const express = require("express");
const orderController = require("../controllers/orderController");
const authenticateAndAuthorize = require("../middleware/authenticateAndAuthorize");
const router = express.Router();

router.post("/", authenticateAndAuthorize, orderController.createOrder);
router.put("/:orderId", authenticateAndAuthorize, orderController.updateOrder);
router.delete("/:orderId", orderController.deleteOrder);

router.get("/all", orderController.geAllOrders);
router.get("/:userId", orderController.getUserOrders);
router.get("/order/:orderId", orderController.getOrderById);

module.exports = router;
