import { connectToDatabase } from "@/lib/mongodb";
import UserData from "@/models/users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    const { name, email, password, role, provider, image } = body;

    console.log("Received data:", body);

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if the email already exists
    const existingUser = await UserData.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Create a new user
    const user = await UserData.create({
      name,
      email,
      password,
      role,
      provider,
      image,
    });
    console.log("User created:", user);

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
