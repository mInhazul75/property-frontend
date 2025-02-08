import { NextResponse } from "next/server";
import dbConnect from "../../../utils/dbConnect";
import { parseRequestBody } from "@/helper/parseRequestBody";
import { verifyTokenAndFindTenant } from "../../../utils/verifyToken";
import Hotel from "../../../../models/Hotel";

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

    const {
      name,
      location,
      costPerNight,
      availableRooms,
      propertyImage,
      ratting,
    } = body;
    const newHotel = new Hotel({
      name,
      location,
      costPerNight,
      availableRooms,
      propertyImage,
      averageRating: 0, // default rating
      ownerId: user._id,
      ratting,
    });

    await newHotel.save();

    return NextResponse.json(
      { success: true, message: "Hotel created successfully", hotel: newHotel },
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

    const hotels = await Hotel.find({ ownerId: user._id })
      .skip(skip)
      .limit(limit);

    const total = await Hotel.countDocuments({ ownerId: user._id });

    return NextResponse.json(
      { success: true, hotels, total, page, limit },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving hotels:", error);
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

    const {
      _id,
      name,
      location,
      costPerNight,
      availableRooms,
      propertyImage,
      ratting,
    } = body;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      _id,
      { name, location, costPerNight, availableRooms, propertyImage, ratting },
      { new: true }
    );

    if (!updatedHotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Hotel updated successfully",
        hotel: updatedHotel,
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
    const { hotelId } = await parseRequestBody(req);
    const token = req.headers.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const deletedHotel = await Hotel.findByIdAndDelete(hotelId);

    if (!deletedHotel) {
      return NextResponse.json(
        { success: false, message: "Hotel not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Hotel deleted successfully" },
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
