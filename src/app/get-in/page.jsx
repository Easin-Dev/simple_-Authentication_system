"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const GetInPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // ✅ Only run when session is available
  useEffect(() => {
    const postUserData = async () => {
      if (!session?.user) return;

      const providerData = {
        name: session.user.name,
        email: session.user.email,
        password: session.user.email || session.user.name,
        provider: session.provider || "google",
        role: "user", // default role
        image: session.user.image,
      };

      try {
        const response = await axios.post(
          "http://localhost:3000/api/userData",
          providerData
        );
        console.log("Post User Data Response:", response.data);

        if (response.status == 409) {
          setUserResponse_t_f(true);
          setUserResponse("Email already exists - Please Login");
        }

        if (response.data?.role === "admin") {
          router.push("/admin-dashboard/users");
        } else {
          router.push("/user-dashboard/personal-information");
        }
      } catch (error) {
        console.error("Error posting user data:", error);
        if (error.status == 409) {
          toast.error(
            "❌ This email is already registered. Please login instead."
          );
          await signOut({ redirect: false });
        }
      }
    };

    postUserData();
  }, [session, router]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const data = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: "user",
    };

    try {
      const res = await axios.post("http://localhost:3000/api/userData", data);
      console.log("Signup Success:", res.data);

      // After signup, optionally redirect or login
      router.push("/user-dashboard/personal-information");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error(
          "❌ This email is already registered. Please login instead."
        );
        await signOut({ redirect: false });
      } else {
        setError("An error occurred. Please try again.");
      }
      console.error("Signup Error:", error);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1555529771-835f59fc5efe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Shop"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center justify-center py-16 px-8">
        <div className="max-w-md w-full">
          <h1 className="text-5xl font-bold text-center">Welcome To SHOP.CO</h1>
          <p className="text-xl text-center text-gray-600 mt-4 font-medium">
            Create an account and get started
          </p>
          <p className="text-lg text-center text-gray-500 font-normal">
            Enjoy the best shopping experience!
          </p>

          <ToastContainer position="top-center" autoClose={10000} />

          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-lg font-semibold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full h-12 px-4 bg-gray-100 rounded-md outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full h-12 px-4 bg-gray-100 rounded-md outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-semibold mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 px-4 bg-gray-100 rounded-md outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-14 transform -translate-y-1/2"
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full h-12 bg-black text-white rounded-md mt-6 hover:bg-gray-800 transition text-lg font-semibold cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn("google")}
              className="w-full btn flex items-center justify-center gap-2"
            >
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={20}
                height={20}
                alt="Google"
              />
              Continue with Google
            </button>
            <button
              onClick={() => signIn("facebook")}
              className="w-full h-12 bg-[#3b5998] text-white font-medium rounded-md hover:bg-[#314e85]"
            >
              Continue with Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GetInPage;
