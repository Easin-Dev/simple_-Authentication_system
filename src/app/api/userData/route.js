import { connectToDatabase } from "@/lib/mongodb";
import UserData from "@/models/users";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { name, email, password, role, provider, image } = body;

    // ✅ Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // ✅ Check if email already exists
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // ✅ Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Save user with hashed password
    const user = await UserData.create({
      name,
      email,
      password: hashedPassword,
      role,
      provider,
      image,
    });

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
