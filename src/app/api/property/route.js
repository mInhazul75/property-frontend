import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import { parseRequestBody } from "@/helper/parseRequestBody";
import { verifyTokenAndFindTenant } from "../../../utils/verifyToken";
import Property from "../../../../models/Property";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await parseRequestBody(req);
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = await verifyTokenAndFindTenant(token);

    const { name, location, rating, price } = body;
    const newProperty = new Property({
      name,
      location,
      rating,
      ownerId: user._id,
      price,
    });

    await newProperty.save();

    return NextResponse.json(
      { success: true, message: "Property created successfully", hotel: newProperty },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const user = await verifyTokenAndFindTenant(token);
    const page = parseInt(req.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(req.nextUrl.searchParams.get("limit")) || 10;
    const skip = (page - 1) * limit;

    const properties = await Property.find({ ownerId: user._id })
      .skip(skip)
      .limit(limit);
    const total = await Property.countDocuments({ ownerId: user._id });

    return NextResponse.json(
      { success: true, properties, total, page, limit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving properties:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const body = await parseRequestBody(req);
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const { _id, name, location, rating, price } = body;
    const updatedProperty = await Property.findByIdAndUpdate(
      _id,
      { name, location, rating, price },
      { new: true }
    );

    if (!updatedProperty) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Property updated successfully",
        hotel: updatedProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hotel:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await dbConnect();

  try {
    const { deleteProperty } = await parseRequestBody(req);
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const deletedProperty = await Property.findByIdAndDelete(deleteProperty);

    if (!deletedProperty) {
      return NextResponse.json(
        { success: false, message: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting hotel:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
