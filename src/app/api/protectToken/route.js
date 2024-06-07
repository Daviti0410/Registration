import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return NextResponse.json(
      { message: "Protected data accessed!", user: decoded },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
