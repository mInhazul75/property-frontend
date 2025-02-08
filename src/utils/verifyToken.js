import jwt from "jsonwebtoken";
import { NEXT_JWT_SECRET_KEY } from "@/config/config";
import { User } from "../../models";

export const verifyTokenAndFindTenant = async (token) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  let decoded;
  try {
    decoded = jwt.verify(token, NEXT_JWT_SECRET_KEY); // Verify the token
  } catch (err) {
    throw new Error("Unauthorized: Invalid token");
  }

  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("Unauthorized: Tenant not found");
  }

  return user;
};
