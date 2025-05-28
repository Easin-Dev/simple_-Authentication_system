import { connectToDatabase } from "@/lib/mongodb";
import UserData from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, password } = body;

    // 🔎 Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // 🔍 Find user by email
    const user = await UserData.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // 🔐 Compare hashed passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 402 });
    }

    // 🎉 Success: return user info (omit password)
    const { password: _, ...userData } = user._doc;

    return NextResponse.json({ message: "Login successful", user: userData }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
