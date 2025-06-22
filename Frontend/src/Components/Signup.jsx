import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmPassword,
    };

    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        alert("Signup successful! You can now log in.");
        localStorage.setItem("messenger", JSON.stringify(response.data));
        setAuthUser(response.data);
      }
    } catch (error) {
      if (error.response) {
        alert("Error: " + error.response.data.message);
      }
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-black px-6 py-3 rounded-md space-y-3 w-96"
      >
        <h1 className="text-2xl text-center text-blue-600 font-bold">
          Messenger
        </h1>
        <h2 className="text-xl text-center">
          Create a new <span className="text-blue-600 font-semibold">Account</span>
        </h2>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Username"
            {...register("name", { required: true })}
          />
        </label>
        {errors.name && (
          <span className="text-red-600 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Email"
            {...register("email", { required: true })}
          />
        </label>
        {errors.email && (
          <span className="text-red-600 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            {...register("password", { required: true })}
          />
        </label>
        {errors.password && (
          <span className="text-red-600 text-sm font-semibold">
            **This field is required**
          </span>
        )}

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
              validate: validatePasswordMatch,
            })}
          />
        </label>
        {errors.confirmPassword && (
          <span className="text-red-600 text-sm font-semibold">
            {errors.confirmPassword.message}
          </span>
        )}

        <div className="flex justify-center">
          <input
            type="submit"
            value="Signup"
            className="text-white bg-blue-600 cursor-pointer w-full rounded-lg py-2"
          />
        </div>

        <p className="text-center">
          Have an Account?{" "}
          <Link to="/login" className="text-blue-500 underline cursor-pointer ml-1">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
