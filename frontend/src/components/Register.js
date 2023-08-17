"use client";
import React, { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";

const useYupValidationResolver = (validationSchema) =>
  useCallback(
    async (data) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (allErrors, currentError) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  phone: yup.string().required("Phone is required"),
  occupation: yup.string().required("Occupation is required"),
  city: yup.string().required("City is required"),
  country: yup.string().required("Country is required"),
  address: yup.string().required("Address is required"),
});

const Register = () => {
  const resolver = useYupValidationResolver(validationSchema);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("data", data);
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        data
      );

      if (response.status === 201) {
        setLoading(false);
        alert("Registration successful!"); // Inform the user about successful registration
      } else {
        setLoading(false);
        alert("Registration failed. Please try again."); // Handle registration failure
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <section className="w-full min-h-screen hero-gradient loginWrapper">
        <img
          src="/corner-shape.svg"
          alt=""
          className="absolute left-0 top-0 w-[150px] z-[1]"
        />
        <div className="w-full flex flex-col lg:flex-row z-[2]">
          <div className="w-full px-4 lg:px-10 xl:px-20 py-10 lg:py-20 relative">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4 md:pr-0 md:pl-0 lg:pr-20 lg:pl-20 "
            >
              <h3 className="text-[20px] text-[#393939] font-[600] text-center mb-[20px]">
                Personal Information
              </h3>
              <div className="w-full grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Name
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`placeholder:text-[#ACB1C6] text-[14px]  ${
                            errors.name ? "border-red-500" : "border-[#ACB1C6]"
                          } bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Name"
                        />
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="email"
                          className={`placeholder:text-[#ACB1C6] text-[14px] ${
                            errors.email ? "border-red-500" : "border-[#ACB1C6]"
                          }  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Email"
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="password"
                          className={`placeholder:text-[#ACB1C6] text-[14px] ${
                            errors.password
                              ? "border-red-500"
                              : "border-[#ACB1C6]"
                          }  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Password"
                        />
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Confirm Password
                  </label>
                  <Controller
                    name="confirm_password"
                    control={control}
                    render={({ field }) => (
                      <>
                        {" "}
                        <input
                          {...field}
                          type="password"
                          className={`placeholder:text-[#ACB1C6] text-[14px] ${
                            errors.confirm_password
                              ? "border-red-500"
                              : "border-[#ACB1C6]"
                          }  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Confirm Password"
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Phone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="phone"
                          className={`placeholder:text-[#ACB1C6] text-[14px] ${
                            errors.phone ? "border-red-500" : "border-[#ACB1C6]"
                          } bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Phone no"
                        />
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Occupation
                  </label>
                  <Controller
                    name="occupation"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`placeholder:text-[#ACB1C6] ${
                            errors.occupation
                              ? "border-red-500"
                              : "border-[#ACB1C6]"
                          } text-[14px]  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Occupation"
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    City
                  </label>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <>
                        {" "}
                        <input
                          {...field}
                          type="text"
                          className={`placeholder:text-[#ACB1C6] ${
                            errors.city ? "border-red-500" : "border-[#ACB1C6]"
                          } text-[14px]  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="City"
                        />
                      </>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Country
                  </label>
                  <Controller
                    name="country"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`placeholder:text-[#ACB1C6] ${
                            errors.country
                              ? "border-red-500"
                              : "border-[#ACB1C6]"
                          } text-[14px]  bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                          placeholder="Country"
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="w-full grid grid-cols-1 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                  <label className="text-[14px] text-[#393939] " htmlFor="">
                    Address
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          {...field}
                          type="text"
                          className={`placeholder:text-[#ACB1C6] text-[14px] bg-gray-100 w-full border-2 h-[44px] px-[15px] rounded-[5px] ${
                            errors.address
                              ? "border-red-500"
                              : "border-[#ACB1C6]"
                          }`}
                          placeholder="Address"
                        />
                      </>
                    )}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  className={`relative z-[3] w-[50%] mx-auto h-[44px] bg-gradient-to-b from-[#2980B9] to-[#27AE60] rounded-[5px] text-white text-[18px] font-[600]`}
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            </form>
          </div>
          <img
            src="/small-shape-corner.svg"
            alt=""
            className="absolute right-0 bottom-0 w-[80px] lg:w-auto z-[0]"
          />
        </div>
      </section>
    </>
  );
};

export default Register;
