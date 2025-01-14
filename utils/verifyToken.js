import jwt from "jsonwebtoken";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // Returns the decoded payload if the
  } catch (error) {
    throw new Error("Invalid token");
  }
}
