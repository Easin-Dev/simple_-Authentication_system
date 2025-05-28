import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const connection = await connectToDatabase();
    console.log("✅ MongoDB Connected Successfully!");
    return NextResponse.json({ success: true, message: "Database Connected!" });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error.message);
    return NextResponse.json({ success: false, error: error.message });
  }
}
