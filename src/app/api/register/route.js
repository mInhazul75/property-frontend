import { NextResponse } from "next/server";
import User from "../../../../models/User";
import { parseRequestBody } from "@/helper/parseRequestBody";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  await dbConnect();

  try {

    const body = await parseRequestBody(req);
    const { name, email, phone_number, password } = body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone_number,
      password: hashedPassword,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "gghktuyiiu", {
      expiresIn: "1d",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        User: newUser,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}