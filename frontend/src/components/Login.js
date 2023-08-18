import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import useYupValidationResolver from "../utils/validationResolver";

const validationSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

const Login = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedInn] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: useYupValidationResolver(validationSchema) });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );
      console.log("response", response);
      if (response.status === 200) {
        setIsLoggedIn(true);
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        setLoading(false);
        setIsLoggedInn(true);
      } else {
        setLoading(false);
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Invalid credentials", error);
      setLoading(false);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="w-full px-4 lg:px-10 xl:px-20 py-10 lg:py-20 relative">
      <div className="w-full flex flex-col gap-4 md:pr-0 md:pl-0 lg:pr-28 lg:pl-28">
        {isLoggedIn ? (
          <></>
        ) : (
          <>
            <h3 className="text-[20px] text-[#393939] font-[600] text-center mb-[20px]">
              Login
            </h3>
            <form
              className="w-full flex flex-col gap-4 md:pr-0 md:pl-0 lg:pr-28 lg:pl-28"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <label
                    className="text-[14px] text-[#393939] "
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`placeholder:text-[#ACB1C6] text-[14px] ${
                          errors.email ? "border-red-500" : "border-[#ACB1C6]"
                        } bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                        placeholder="Email"
                      />
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label
                    className="text-[14px] text-[#393939] "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        className={`placeholder:text-[#ACB1C6] text-[14px] ${
                          errors.password
                            ? "border-red-500"
                            : "border-[#ACB1C6]"
                        } bg-gray-100 w-full border-2 h-[44px] px-[15px] border-[#ACB1C6] rounded-[5px]`}
                        placeholder="Password"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-8">
                <button
                  type="submit"
                  className={`relative z-[3] w-[50%] mx-auto h-[44px] bg-gradient-to-b from-[#2980B9] to-[#27AE60] rounded-[5px] text-white text-[18px] font-[600]`}
                >
                  {loading ? "Logging in..." : "Log in"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
