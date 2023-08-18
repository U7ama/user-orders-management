import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./Modal";
import AddEditForm from "./AddEditForm";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
      const userId = tokenPayload.userId;
      try {
        let url;
        if (tokenPayload.role === "ADMIN") {
          url = `http://localhost:5000/orders/all`;
        } else {
          url = `http://localhost:5000/orders/${userId}`;
        }
        const response = await axios.get(url).then((response) => {
          console.log("response", response);
          setOrders(response.data.orders);
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }
  };

  const openEditModal = (order) => {
    setSelectedOrder(order);
    setShowModalEdit(true);
  };
  const handleUpdateOrder = () => {
    fetchOrders();
    setShowModalEdit(false);
  };
  const openAddModal = (userId) => {
    setSelectedUserId(userId);
    setShowModalAdd(true);
  };

  const handleAddOrder = () => {
    fetchOrders();
    setShowModalAdd(false);
  };

  const handleDelete = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/orders/${orderId}`
      );
      if (response.status === 200) {
        console.log("Order deleted successfully.");
        fetchOrders();
      } else {
        console.error("Failed to delete order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="relative sm:rounded-lg p-20">
      {orders.length > 0 ? (
        <table className="w-full rounded-[30px] text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-[#289d80]">
            <tr>
              <th scope="col" className="px-6 py-3">
                Order Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Order Date
              </th>
              <th scope="col" className="px-6 py-3">
                Expected Delivery Time
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-[#cccccc] border-b hover:bg-gray-50"
              >
                <td scope="row" className="px-6 py-4">
                  {order.orderID}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="px-6 py-4">{order.customerEmail}</td>
                <td className="px-6 py-4">{order.customerAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap ">
                  {order.orderDate.substr(0, 10)}
                </td>
                <td className="px-6 py-4">{order.expectedDeliveryTime}</td>
                <td className="flex items-center justify-center px-6 py-4 space-x-3">
                  <button
                    onClick={() => openAddModal(order.user)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => openEditModal(order)}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className="text-center">No Order Found</h1>
      )}
      <Modal
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        title="Edit Order"
      >
        {selectedOrder && (
          <AddEditForm
            order={selectedOrder}
            onChange={handleUpdateOrder}
            form="edit"
          />
        )}
      </Modal>
      <Modal
        order={selectedOrder}
        isOpen={showModalAdd}
        onClose={() => setShowModalAdd(false)}
        title="Add Order"
      >
        {selectedUserId && (
          <AddEditForm
            userId={selectedUserId}
            onChange={handleAddOrder}
            form="add"
          />
        )}
      </Modal>
    </div>
  );
};

export default Orders;
