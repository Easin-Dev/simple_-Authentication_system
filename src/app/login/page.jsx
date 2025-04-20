'use client';
import { Facebook } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';  

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 grid-cols-1">
      {/* Left Side - Login Form */}
      <div className="flex items-center justify-center py-16 px-8">
        <div className="max-w-md w-full">
          <h1 className="text-5xl font-bold text-center">Welcome Back!</h1>
          <p className="text-xl text-center text-gray-600 mt-4 font-medium">
            Login to your account
          </p>
          <p className="text-lg text-center text-gray-500 font-normal">
            and enjoy the best shopping experience
          </p>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
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
              <label className="block text-lg font-semibold mb-1">Password</label>
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
                {showPassword ? (
                    <Eye size={24} className="text-gray-500" />
                ) : (
                    <EyeOff size={24} className="text-gray-500" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-black text-white rounded-md mt-6 hover:bg-gray-800 transition text-lg font-semibold"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-4 text-gray-500">OR</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="space-y-4">
            <button className="w-full h-12 bg-white border text-gray-700 font-medium rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
              <Image
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={20}
                height={20}
                alt="Google"
              />
              Continue with Google
            </button>
            <button className="w-full h-12 bg-[#3b5998] text-white font-medium rounded-md hover:bg-[#314e85] flex items-center justify-center gap-2">
              <Facebook size={20} color="#ffffff" />
              {/* Lucide Facebook Icon */}
              Continue with Facebook
            </button>
          </div>

          {/* Signup Redirect */}
          <p className="mt-6 text-center text-gray-600">
            Don’t have an account?
            <Link
              href="/get-in"
              className="text-blue-600 hover:underline font-medium"
            >
              Get in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative">
        <Image
          src="https://images.unsplash.com/photo-1675537057604-cafeef78a3d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Visual"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;
