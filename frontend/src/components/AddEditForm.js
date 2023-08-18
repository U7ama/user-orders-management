import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";
import useYupValidationResolver from "../utils/validationResolver";

const validationSchema = yup.object({
  orderID: yup.string().required(),
  customerName: yup.string().required(),
  customerEmail: yup.string().email().required(),
  customerAddress: yup.string().required(),
  orderDate: yup.date().required(),
  expectedDeliveryTime: yup.string().required(),
});

const AddEditForm = ({ order, onChange, form, userId }) => {
  const formattedOrderDate = order?.orderDate
    ? new Date(order?.orderDate).toISOString().split("T")[0]
    : "";
  const formattedExpectedDeliveryTime = order?.expectedDeliveryTime
    ? new Date(order?.expectedDeliveryTime).toISOString().split("T")[0]
    : "";
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: useYupValidationResolver(validationSchema),
    defaultValues: {
      ...order,
      orderDate: formattedOrderDate,
      expectedDeliveryTime: formattedExpectedDeliveryTime,
    },
  });

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        let url;
        if (form === "add") {
          const reqData = {
            expectedDeliveryTime: data.expectedDeliveryTime,
            orderDate: `${data.orderDate}`,
            customerAddress: data.customerAddress,
            customerEmail: data.customerEmail,
            customerName: data.customerName,
            orderID: data.orderID,
            token: token,
            userId: userId,
          };

          console.log("Callaing Add", form);
          const response = await axios.post(
            `http://localhost:5000/orders`,
            reqData
          );
          if (response.status === 200 || response.status === 201) {
            onChange();
          } else {
            alert("Add Failed");
          }
        } else if (form === "edit") {
          const reqData = {
            expectedDeliveryTime: data.expectedDeliveryTime,
            orderDate: `${data.orderDate}`,
            customerAddress: data.customerAddress,
            customerEmail: data.customerEmail,
            customerName: data.customerName,
            orderID: data.orderID,
            token: token,
          };
          console.log("Calling Edit", form);
          const response = await axios.put(
            `http://localhost:5000/orders/${order._id}`,
            reqData
          );
          console.log("response", response);
          if (response.status === 200 || response.status === 201) {
            onChange();
          } else {
            alert("Updating Failed");
          }
        }
      } catch (error) {
        console.error("Error updating order:", error);
      }
    }
  };

  return (
    <div className=" rounded-lg p-6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Order ID</label>
          <Controller
            name="orderID"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                  errors.orderID ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Order ID"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Customer Name</label>
          <Controller
            name="customerName"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                  errors.customerName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Customer Name"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Customer Email</label>
          <Controller
            name="customerEmail"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                  errors.customerEmail ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Customer Email"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Customer Address</label>
          <Controller
            name="customerAddress"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                  errors.customerAddress ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Customer Address"
              />
            )}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">Order Date</label>
          <Controller
            name="orderDate"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="date"
                  {...field}
                  className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                    errors.orderDate ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Order Date"
                />
              </>
            )}
          />
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-600">
            Expected Delivery Time
          </label>
          <Controller
            name="expectedDeliveryTime"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                className={`w-full placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 px-4 py-2 rounded-md border ${
                  errors.expectedDeliveryTime
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Expected Delivery Time"
              />
            )}
          />
        </div>

        <div className="flex items-center justify-center mt-6">
          <button
            type="submit"
            className="w-1/2 py-2 text-white bg-gradient-to-b from-blue-500 to-green-500 rounded-md text-lg font-semibold"
          >
            {form === "edit" ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditForm;
