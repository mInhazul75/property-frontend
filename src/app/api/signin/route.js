// app/api/auth/signin/route.js

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse, NextApiResponse } from "next/server";

import User from "../../../../models/User";
import { parseRequestBody } from "@/helper/parseRequestBody";
import { NEXT_JWT_SECRET_KEY } from "@/config/config";
import dbConnect from "@/utils/dbConnect";

export async function POST(req) {
  await dbConnect();

  try {

     const body = await parseRequestBody(req);

    const { email, password } = body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = jwt.sign({ id: user._id }, NEXT_JWT_SECRET_KEY, {
      expiresIn: "1d",
    });


    return NextResponse.json({ user, token });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
